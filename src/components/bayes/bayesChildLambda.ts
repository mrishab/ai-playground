import { BayesNetwork, BayesCPT, NetworkBeliefs, EvidenceMap } from "@/data/bayesProblems";
import { getParentConfigs, getCptIndex } from "./bayesCptUtils";

export function computeChildLambda(
  nodeId: string,
  outcomes: string[],
  childCpt: BayesCPT,
  network: BayesNetwork,
  currentBeliefs: NetworkBeliefs,
  evidence: EvidenceMap,
): number[] {
  const childNode = network.nodes.find((n) => n.id === childCpt.target);
  if (
    !childNode ||
    childNode.type === "utility" ||
    childNode.type === "decision"
  )
    return outcomes.map(() => 1.0);
  const cOutcomes =
    childNode.outcomes.length > 0 ? childNode.outcomes : ["true", "false"];
  const childMsg = new Array(outcomes.length).fill(0);
  const otherParents = childCpt.parents.filter((p) => p !== nodeId);
  const otherConfigs = getParentConfigs(otherParents, network);
  outcomes.forEach((nodeVal, nodeIdx) => {
    otherConfigs.forEach((otherCfg) => {
      let otherProb = 1.0;
      otherParents.forEach((pId) => {
        otherProb *= currentBeliefs[pId]?.[otherCfg[pId]] ?? 1.0;
      });
      const fullConfig = { ...otherCfg, [nodeId]: nodeVal };
      cOutcomes.forEach((cVal, cIdx) => {
        const childCptIdx = getCptIndex(
          childNode,
          childCpt,
          fullConfig,
          cIdx,
          network,
        );
        const pY = childCpt.table[childCptIdx] ?? 1.0 / cOutcomes.length;
        const weight = evidence[childNode.id]
          ? evidence[childNode.id] === cVal
            ? 1.0
            : 0.0
          : (currentBeliefs[childNode.id]?.[cVal] ?? 1.0 / cOutcomes.length);
        childMsg[nodeIdx] += pY * otherProb * weight;
      });
    });
  });
  return childMsg;
}
