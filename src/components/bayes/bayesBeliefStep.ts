import { BayesNode, BayesNetwork, OutcomeDistribution, NetworkBeliefs, EvidenceMap } from "@/data/bayesProblems";
import { computeParentPi, computeChildLambda } from "./bayesMessages";

export function updateNodeBelief(
  node: BayesNode,
  network: BayesNetwork,
  evidence: EvidenceMap,
  currentBeliefs: NetworkBeliefs,
): OutcomeDistribution {
  const outcomes = node.outcomes.length > 0 ? node.outcomes : ["true", "false"];
  const res: OutcomeDistribution = {};
  const obs = evidence[node.id];
  if (obs) {
    outcomes.forEach((o) => {
      res[o] = o === obs ? 1.0 : 0.0;
    });
    return res;
  }
  const cpt = network.cpts.find((c) => c.target === node.id);
  if (node.type === "decision" || !cpt || cpt.table.length === 0) {
    outcomes.forEach((o) => {
      res[o] = 1.0 / outcomes.length;
    });
    return res;
  }

  const pi = computeParentPi(node, cpt, outcomes, network, currentBeliefs);
  const lambda = new Array(outcomes.length).fill(1.0);
  network.cpts
    .filter((c) => c.parents.includes(node.id))
    .forEach((childCpt) => {
      const msg = computeChildLambda(
        node.id,
        outcomes,
        childCpt,
        network,
        currentBeliefs,
        evidence,
      );
      outcomes.forEach((_, idx) => {
        lambda[idx] *= msg[idx] || 1.0;
      });
    });

  let sum = 0;
  outcomes.forEach((o, idx) => {
    res[o] = pi[idx] * lambda[idx];
    sum += res[o];
  });
  outcomes.forEach((o) => {
    res[o] = sum > 0 ? res[o] / sum : 1.0 / outcomes.length;
  });
  return res;
}
