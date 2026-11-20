import { BayesNetwork, EvidenceMap, NetworkBeliefs } from "@/data/bayesProblems";
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

  const parentMap: Record<string, string[]> = {};
  chanceNodes.forEach((n) => {
    parentMap[n.id] = cptMap.get(n.id)?.parents || [];
  });

  const inDegree: Record<string, number> = {};
  chanceNodes.forEach((n) => {
    inDegree[n.id] = parentMap[n.id].length;
  });

  const queue = chanceNodes.filter((n) => inDegree[n.id] === 0).map((n) => n.id);
  const topoOrder: string[] = [];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    topoOrder.push(curr);
    chanceNodes.forEach((other) => {
      if (parentMap[other.id].includes(curr) && inDegree[other.id] !== undefined) {
        inDegree[other.id]--;
        if (inDegree[other.id] === 0) queue.push(other.id);
      }
    });
  }

  chanceNodes.forEach((n) => {
    if (!topoOrder.includes(n.id)) topoOrder.push(n.id);
  });

  const counts: Record<string, Record<string, number>> = {};
  chanceNodes.forEach((n) => {
    counts[n.id] = {};
    const outs = n.outcomes.length > 0 ? n.outcomes : ["true", "false"];
    outs.forEach((o) => {
      counts[n.id][o] = 0;
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
      const parentConfig: Record<string, string> = {};
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
        if (counts[nodeId] && val) {
          counts[nodeId][val] = (counts[nodeId][val] || 0) + 1;
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
      beliefs[n.id][o] = Number((counts[n.id][o] / accepted).toFixed(3));
    });
  });

  return beliefs;
}
