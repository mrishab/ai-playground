import { BayesNetwork, BayesNode, BayesCPT, NetworkBeliefs } from "@/data/bayesProblems";
import { getParentConfigs, getCptIndex } from "./bayesCptUtils";

export function computeParentPi(
  node: BayesNode,
  cpt: BayesCPT,
  outcomes: string[],
  network: BayesNetwork,
  currentBeliefs: NetworkBeliefs,
): number[] {
  const parentConfigs = getParentConfigs(cpt.parents, network);
  const pi = new Array(outcomes.length).fill(0);
  parentConfigs.forEach((config) => {
    let configProb = 1.0;
    cpt.parents.forEach((pId) => {
      configProb *= currentBeliefs[pId]?.[config[pId]] ?? 1.0;
    });
    outcomes.forEach((_, oIdx) => {
      const cptIdx = getCptIndex(node, cpt, config, oIdx, network);
      pi[oIdx] += (cpt.table[cptIdx] ?? 1.0 / outcomes.length) * configProb;
    });
  });
  return pi;
}
