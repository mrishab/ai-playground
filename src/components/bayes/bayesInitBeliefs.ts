import { BayesNetwork, NetworkBeliefs, EvidenceMap } from "@/data/bayesProblems";

export function initBayesBeliefs(
  network: BayesNetwork,
  evidence: EvidenceMap,
): NetworkBeliefs {
  const beliefs: NetworkBeliefs = {};
  network.nodes.forEach((node) => {
    if (node.type === "utility") return;
    beliefs[node.id] = {};
    const outcomes =
      node.outcomes.length > 0 ? node.outcomes : ["true", "false"];
    const obs = evidence[node.id];
    outcomes.forEach((o) => {
      beliefs[node.id][o] = obs
        ? o === obs
          ? 1.0
          : 0.0
        : 1.0 / outcomes.length;
    });
  });
  return beliefs;
}
