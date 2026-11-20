import { BayesNetwork, EvidenceMap } from "@/data/bayesProblems";

export function getEvidenceAncestors(
  network: BayesNetwork,
  evidenceSet: Set<string>,
): Set<string> {
  const result = new Set(evidenceSet);
  const cptMap = new Map(network.cpts.map((c) => [c.target, c]));
  let added = true;
  while (added) {
    added = false;
    for (const node of Array.from(result)) {
      const cpt = cptMap.get(node);
      if (cpt) {
        for (const p of cpt.parents) {
          if (!result.has(p)) {
            result.add(p);
            added = true;
          }
        }
      }
    }
  }
  return result;
}

export function isTrailActive(
  network: BayesNetwork,
  src: string,
  dest: string,
  evSet: Set<string>,
): boolean {
  if (src === dest) return false;
  if (evSet.has(src) || evSet.has(dest)) return false;

  const evAncestors = getEvidenceAncestors(network, evSet);
  const cptMap = new Map(network.cpts.map((c) => [c.target, c]));
  const getParents = (id: string) => cptMap.get(id)?.parents || [];
  const getChildren = (id: string) => network.cpts.filter((c) => c.parents.includes(id)).map((c) => c.target);

  const queue: Array<{ node: string; dir: "from_child" | "from_parent" }> = [];
  getParents(src).forEach((p) => queue.push({ node: p, dir: "from_child" }));
  getChildren(src).forEach((c) => queue.push({ node: c, dir: "from_parent" }));

  const visited = new Set<string>();

  while (queue.length > 0) {
    const { node, dir } = queue.shift()!;
    const state = `${node}:${dir}`;
    if (visited.has(state)) continue;
    visited.add(state);

    if (node === dest) return true;

    const parents = getParents(node);
    const children = getChildren(node);

    if (dir === "from_child") {
      if (!evSet.has(node)) {
        parents.forEach((p) => queue.push({ node: p, dir: "from_child" }));
        children.forEach((c) => queue.push({ node: c, dir: "from_parent" }));
      }
    } else {
      if (!evSet.has(node)) {
        children.forEach((c) => queue.push({ node: c, dir: "from_parent" }));
      }
      if (evAncestors.has(node)) {
        parents.forEach((p) => queue.push({ node: p, dir: "from_child" }));
      }
    }
  }

  return false;
}

export function testDSeparationEngine(
  network: BayesNetwork,
  evidence: EvidenceMap,
  dsepNodeA: string,
  dsepNodeB: string,
): string {
  if (!dsepNodeA || !dsepNodeB || dsepNodeA === dsepNodeB) {
    return "Please choose two distinct variables.";
  }
  const evidenceSet = new Set(
    Object.entries(evidence)
      .filter(([_, val]) => val !== null && val !== undefined)
      .map(([id]) => id),
  );

  const connected = isTrailActive(
    network,
    dsepNodeA,
    dsepNodeB,
    evidenceSet,
  );

  return connected
    ? `DEPENDENT: Active trail exists between ${dsepNodeA} and ${dsepNodeB} given evidence.`
    : `D-SEPARATED: ${dsepNodeA} ⊥ ${dsepNodeB} | Evidence. All trails are blocked.`;
}

export function isDSeparated(
  network: BayesNetwork,
  src: string,
  dest: string,
  evSet: Set<string>,
): boolean {
  return !isTrailActive(network, src, dest, evSet);
}
