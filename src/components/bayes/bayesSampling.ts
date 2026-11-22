import { BayesNetwork, EvidenceMap, NetworkBeliefs, ParentConfig } from "@/data/bayesProblems";
import { getCptIndex } from "./bayesCptUtils";
import { computeBayesBeliefs } from "./bayesEngine";

export function computeRejectionSamplingBeliefs(
  network: BayesNetwork,
  evidence: EvidenceMap,
  sampleCount: number = 600,
): NetworkBeliefs {
  const chanceNodes = network.nodes.filter((n) => n.type !== "utility");
  if (chanceNodes.length === 0) return {};

  const cptMap = new Map(network.cpts.map((c) => [c.target, c]));

  const parentMap = new Map<string, string[]>();
  chanceNodes.forEach((n) => {
    parentMap.set(n.id, cptMap.get(n.id)?.parents || []);
  });

  const inDegree = new Map<string, number>();
  chanceNodes.forEach((n) => {
    inDegree.set(n.id, (parentMap.get(n.id) || []).length);
  });

  const queue = chanceNodes.filter((n) => (inDegree.get(n.id) || 0) === 0).map((n) => n.id);
  const topoOrder: string[] = [];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    topoOrder.push(curr);
    chanceNodes.forEach((other) => {
      const parents = parentMap.get(other.id) || [];
      if (parents.includes(curr)) {
        const curDeg = inDegree.get(other.id) ?? 0;
        inDegree.set(other.id, curDeg - 1);
        if (curDeg - 1 === 0) queue.push(other.id);
      }
    });
  }

  chanceNodes.forEach((n) => {
    if (!topoOrder.includes(n.id)) topoOrder.push(n.id);
  });

  const sampleCounts = new Map<string, number>();
  const sampleKey = (nodeId: string, outcome: string) => `${nodeId}:${outcome}`;
  chanceNodes.forEach((n) => {
    const outs = n.outcomes.length > 0 ? n.outcomes : ["true", "false"];
    outs.forEach((o) => {
      sampleCounts.set(sampleKey(n.id, o), 0);
    });
  });

  let accepted = 0;

  for (let s = 0; s < sampleCount; s++) {
    const sample: Record<string, string> = {};
    for (const nodeId of topoOrder) {
      const node = network.nodes.find((n) => n.id === nodeId)!;
      const outs = node.outcomes.length > 0 ? node.outcomes : ["true", "false"];
      if (node.type === "decision") {
        sample[nodeId] = evidence[nodeId] || outs[Math.floor(Math.random() * outs.length)];
        continue;
      }
      const cpt = cptMap.get(nodeId);
      if (!cpt || !cpt.table || cpt.table.length === 0) {
        sample[nodeId] = outs[Math.floor(Math.random() * outs.length)];
        continue;
      }
      const parentConfig: ParentConfig = {};
      cpt.parents.forEach((p) => {
        parentConfig[p] = sample[p] || (network.nodes.find((n) => n.id === p)?.outcomes[0] ?? "true");
      });

      const probs = outs.map((_, oIdx) => cpt.table[getCptIndex(node, cpt, parentConfig, oIdx, network)] ?? 0);
      const totalProb = probs.reduce((a, b) => a + b, 0) || 1;
      let r = Math.random() * totalProb;
      let chosen = outs[0];
      for (let oIdx = 0; oIdx < outs.length; oIdx++) {
        if (r <= probs[oIdx]) {
          chosen = outs[oIdx];
          break;
        }
        r -= probs[oIdx];
      }
      sample[nodeId] = chosen;
    }

    const matchesEvidence = Object.entries(evidence).every(
      ([k, v]) => !v || sample[k] === v,
    );
    if (matchesEvidence) {
      accepted++;
      topoOrder.forEach((nodeId) => {
        const val = sample[nodeId];
        if (val) {
          const k = sampleKey(nodeId, val);
          sampleCounts.set(k, (sampleCounts.get(k) || 0) + 1);
        }
      });
    }
  }

  if (accepted === 0) {
    return computeBayesBeliefs(network, evidence);
  }

  const beliefs: NetworkBeliefs = {};
  chanceNodes.forEach((n) => {
    beliefs[n.id] = {};
    const outs = n.outcomes.length > 0 ? n.outcomes : ["true", "false"];
    outs.forEach((o) => {
      const count = sampleCounts.get(sampleKey(n.id, o)) || 0;
      beliefs[n.id][o] = Number((count / accepted).toFixed(3));
    });
  });

  return beliefs;
}
