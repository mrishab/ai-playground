import { BayesNetwork } from "@/data/bayesProblems";
import { VeFactor, VeFactorRow } from "./bayesVeTypes";
import { getParentConfigs, getCptIndex } from "./bayesCptUtils";

export function createInitialVeFactors(network: BayesNetwork): VeFactor[] {
  const factors: VeFactor[] = [];
  const nodeMap = new Map(network.nodes.map((n) => [n.id, n]));
  for (const cpt of network.cpts) {
    const node = nodeMap.get(cpt.target);
    if (!node || node.type === "utility" || node.type === "decision" || cpt.table.length === 0) continue;
    const outcomes = node.outcomes.length > 0 ? node.outcomes : ["true", "false"];
    const configs = getParentConfigs(cpt.parents, network);
    const table: VeFactorRow[] = [];
    for (const cfg of configs) {
      outcomes.forEach((out, idx) => {
        const val = cpt.table[getCptIndex(node, cpt, cfg, idx, network)] ?? 0;
        table.push({ assignment: { ...cfg, [cpt.target]: out }, value: val });
      });
    }
    const name = `f_${cpt.target}(${[cpt.target, ...cpt.parents].join(",")})`;
    factors.push({ id: `factor-${cpt.target}`, name, variables: [cpt.target, ...cpt.parents], table });
  }
  return factors;
}
