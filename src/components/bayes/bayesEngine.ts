import { BayesNetwork, EvidenceMap, NetworkBeliefs, OutcomeDistribution } from "@/data/bayesProblems";
import { createInitialVeFactors } from "./bayesVeInit";
import { restrictFactor, sumOutVariable } from "./bayesVeFactorOps";
import { multiplyFactorList, normalizeQueryFactor } from "./bayesVeEngineHelper";
import { VeFactor } from "./bayesVeTypes";

export function computeExactMarginal(
  network: BayesNetwork,
  queryVar: string,
  evidence: EvidenceMap,
): OutcomeDistribution {
  const node = network.nodes.find((n) => n.id === queryVar);
  if (!node) return {};
  const outcomes = node.outcomes.length > 0 ? node.outcomes : ["true", "false"];

  if (evidence[queryVar]) {
    const obsVal = evidence[queryVar]!;
    return Object.fromEntries(outcomes.map((o) => [o, o === obsVal ? 1.0 : 0.0]));
  }

  let factors = createInitialVeFactors(network);
  Object.entries(evidence).forEach(([v, val]) => {
    if (!val) return;
    factors = factors.map((f) => restrictFactor(f, v, val));
  });

  const allVars = new Set<string>();
  factors.forEach((f) => f.variables.forEach((v) => allVars.add(v)));
  const elimVars = Array.from(allVars).filter(
    (v) => v !== queryVar && !evidence[v] && network.nodes.find((n) => n.id === v)?.type !== "utility",
  );

  while (elimVars.length > 0) {
    let bestIdx = 0;
    let minSize = Infinity;
    for (let i = 0; i < elimVars.length; i++) {
      const v = elimVars[i];
      const rel = factors.filter((f) => f.variables.includes(v));
      const varsInProd = new Set<string>();
      rel.forEach((f) => f.variables.forEach((x) => varsInProd.add(x)));
      if (varsInProd.size < minSize) {
        minSize = varsInProd.size;
        bestIdx = i;
      }
    }
    const elim = elimVars.splice(bestIdx, 1)[0];
    const relevant = factors.filter((f) => f.variables.includes(elim));
    const rest = factors.filter((f) => !f.variables.includes(elim));
    if (relevant.length === 0) continue;
    const prod = multiplyFactorList(relevant, `f_prod_${elim}`);
    const summed = sumOutVariable(prod, elim, `f_sum_${elim}`);
    factors = [...rest, summed];
  }

  const queryFactors = factors.filter((f) => f.variables.includes(queryVar));
  let finalProd: VeFactor =
    queryFactors.length > 0
      ? multiplyFactorList(queryFactors, `f_final_${queryVar}`)
      : { id: "f_empty", name: `f_${queryVar}`, variables: [queryVar], table: [] };

  const extraVars = finalProd.variables.filter((v) => v !== queryVar);
  for (const ev of extraVars) {
    finalProd = sumOutVariable(finalProd, ev, `f_marginal_${queryVar}`);
  }

  return normalizeQueryFactor(finalProd, queryVar, outcomes);
}

export function computeBayesBeliefs(
  network: BayesNetwork,
  evidence: EvidenceMap,
): NetworkBeliefs {
  const result: NetworkBeliefs = {};
  network.nodes.forEach((node) => {
    if (node.type === "utility") return;
    if (node.type === "decision") {
      const outcomes = node.outcomes.length > 0 ? node.outcomes : ["true", "false"];
      if (evidence[node.id]) {
        result[node.id] = Object.fromEntries(outcomes.map((o) => [o, o === evidence[node.id] ? 1.0 : 0.0]));
      } else {
        result[node.id] = Object.fromEntries(outcomes.map((o) => [o, Number((1 / outcomes.length).toFixed(4))]));
      }
      return;
    }
    result[node.id] = computeExactMarginal(network, node.id, evidence);
  });
  return result;
}

export { computeBayesBeliefs as computeExactBayesMarginals };
