import { BayesNetwork, BayesNode, BayesCPT, ParentConfig } from "@/data/bayesProblems";

export function getParentConfigs(
  parents: string[],
  network: BayesNetwork,
): ParentConfig[] {
  if (parents.length === 0) return [{}];
  const p = parents[0];
  const pNode = network.nodes.find((n) => n.id === p);
  if (!pNode) return [];
  const pOutcomes =
    pNode.outcomes.length > 0 ? pNode.outcomes : ["true", "false"];
  const rest = getParentConfigs(parents.slice(1), network);
  const configs: ParentConfig[] = [];
  pOutcomes.forEach((out) =>
    rest.forEach((r) => configs.push({ [p]: out, ...r })),
  );
  return configs;
}

export function getCptIndex(
  node: BayesNode,
  cpt: BayesCPT,
  parentConfig: ParentConfig,
  outcomeIdx: number,
  network: BayesNetwork,
): number {
  let idx = 0;
  let multiplier = node.outcomes.length > 0 ? node.outcomes.length : 2;
  const nodeMap = new Map(network.nodes.map((n) => [n.id, n]));
  for (let i = cpt.parents.length - 1; i >= 0; i--) {
    const pId = cpt.parents[i];
    const pNode = nodeMap.get(pId);
    const pOutcomes =
      pNode!.outcomes.length > 0 ? pNode!.outcomes : ["true", "false"];
    const pVal = parentConfig[pId];
    idx += pOutcomes.indexOf(pVal) * multiplier;
    multiplier *= pOutcomes.length;
  }
  return idx + outcomeIdx;
}
