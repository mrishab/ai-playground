import { BayesNetwork } from "@/data/bayesProblems";

export function getEvidenceDescendants(
  network: BayesNetwork,
  evidenceSet: Set<string>,
): Set<string> {
  const result = new Set(evidenceSet);
  let added = true;
  while (added) {
    added = false;
    network.cpts.forEach((cpt) => {
      if (cpt.parents.some((p) => result.has(p)) && !result.has(cpt.target)) {
        result.add(cpt.target);
        added = true;
      }
    });
  }
  return result;
}

export function isTrailActive(
  network: BayesNetwork,
  src: string,
  dest: string,
  evSet: Set<string>,
  evDesc: Set<string>,
): boolean {
  const queue: { node: string; dir: "up" | "down" }[] = [
    { node: src, dir: "up" },
    { node: src, dir: "down" },
  ];
  const visited = new Set<string>();
  const cptMap = new Map(network.cpts.map((c) => [c.target, c]));

  while (queue.length > 0) {
    const { node, dir } = queue.shift()!;
    const state = `${node}-${dir}`;
    if (visited.has(state)) continue;
    visited.add(state);
    if (node === dest) return true;

    const cpt = cptMap.get(node);
    const parents = cpt ? cpt.parents : [];
    const children = network.cpts
      .filter((c) => c.parents.includes(node))
      .map((c) => c.target);

    if (node === src || (dir === "up" && !evSet.has(node))) {
      parents.forEach((p) => queue.push({ node: p, dir: "up" }));
      children.forEach((c) => queue.push({ node: c, dir: "down" }));
    } else if (dir === "down") {
      if (!evSet.has(node))
        children.forEach((c) => queue.push({ node: c, dir: "down" }));
      if (evDesc.has(node))
        parents.forEach((p) => queue.push({ node: p, dir: "up" }));
    }
  }
  return false;
}
