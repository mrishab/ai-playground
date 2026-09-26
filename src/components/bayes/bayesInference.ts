import { BayesNetwork, NetworkBeliefs, EvidenceMap } from "@/data/bayesProblems";
import { initBayesBeliefs } from "./bayesInitBeliefs";
import { updateNodeBelief } from "./bayesBeliefStep";

export function computeBayesBeliefs(
  network: BayesNetwork,
  evidence: EvidenceMap,
): NetworkBeliefs {
  let currentBeliefs = initBayesBeliefs(network, evidence);

  for (let iter = 0; iter < 5; iter++) {
    const nextBeliefs: NetworkBeliefs = {};
    network.nodes.forEach((node) => {
      if (node.type === "utility") return;
      nextBeliefs[node.id] = updateNodeBelief(
        node,
        network,
        evidence,
        currentBeliefs,
      );
    });
    currentBeliefs = nextBeliefs;
  }
  return currentBeliefs;
}
