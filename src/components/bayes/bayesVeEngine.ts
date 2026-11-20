import { BayesNetwork, EvidenceMap } from "@/data/bayesProblems";
import { VeStepSnapshot, VeFactor } from "./bayesVeTypes";
import { restrictFactor, sumOutVariable } from "./bayesVeFactorOps";
import { createInitialVeFactors } from "./bayesVeInit";
import { multiplyFactorList, normalizeQueryFactor } from "./bayesVeEngineHelper";

export function generateVeSteps(network: BayesNetwork, queryVar: string, evidence: EvidenceMap): VeStepSnapshot[] {
  const steps: VeStepSnapshot[] = [];
  const queryNode = network.nodes.find((n) => n.id === queryVar);
  const outcomes = queryNode?.outcomes.length ? queryNode.outcomes : ["true", "false"];

  let factors = createInitialVeFactors(network);
  steps.push({
    stepIndex: 0,
    action: "Init Factors",
    factors: [...factors],
    description: `Loaded ${factors.length} initial CPT factors.`,
  });

  Object.entries(evidence).forEach(([v, val]) => {
    if (!val) return;
    factors = factors.map((f) => restrictFactor(f, v, val));
    steps.push({
      stepIndex: steps.length,
      action: "Condition Evidence",
      targetVar: v,
      factors: [...factors],
      description: `Restricted factor entries to observed evidence ${v} = ${val}.`,
    });
  });

  if (evidence[queryVar]) {
    const obsVal = evidence[queryVar]!;
    const norm = Object.fromEntries(outcomes.map((o) => [o, o === obsVal ? 1.0 : 0.0]));
    steps.push({
      stepIndex: steps.length,
      action: "Observed Evidence",
      targetVar: queryVar,
      factors: [...factors],
      normalizedResult: norm,
      description: `Variable ${queryVar} is observed as ${obsVal} with certainty.`,
    });
    return steps;
  }

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
    steps.push({
      stepIndex: steps.length,
      action: "Pointwise Product",
      targetVar: elim,
      factors: [...rest, prod],
      intermediateFactor: prod,
      description: `Multiplied ${relevant.length} factors containing variable ${elim}.`,
    });

    const summed = sumOutVariable(prod, elim, `f_sum_${elim}`);
    factors = [...rest, summed];
    steps.push({
      stepIndex: steps.length,
      action: "Sum Out (Marginalize)",
      targetVar: elim,
      factors: [...factors],
      intermediateFactor: summed,
      description: `Summed out hidden variable ${elim} from product factor.`,
    });
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

  const norm = normalizeQueryFactor(finalProd, queryVar, outcomes);
  steps.push({
    stepIndex: steps.length,
    action: "Normalize",
    targetVar: queryVar,
    factors: [finalProd],
    normalizedResult: norm,
    description: `Normalized remaining factors to compute exact posterior P(${queryVar} | evidence).`,
  });

  return steps;
}
