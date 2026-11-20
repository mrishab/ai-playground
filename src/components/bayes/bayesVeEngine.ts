import { BayesNetwork, EvidenceMap } from "@/data/bayesProblems";
import { VeStepSnapshot } from "./bayesVeTypes";
import { restrictFactor, sumOutVariable } from "./bayesVeFactorOps";
import { createInitialVeFactors } from "./bayesVeInit";
import { multiplyFactorList, normalizeQueryFactor } from "./bayesVeEngineHelper";

export function generateVeSteps(network: BayesNetwork, queryVar: string, evidence: EvidenceMap): VeStepSnapshot[] {
  const steps: VeStepSnapshot[] = [];
  let factors = createInitialVeFactors(network);
  steps.push({ stepIndex: 0, action: "Init Factors", factors: [...factors], description: `Loaded ${factors.length} initial CPT factors.` });

  Object.entries(evidence).forEach(([v, val]) => {
    if (!val) return;
    factors = factors.map((f) => restrictFactor(f, v, val));
    steps.push({ stepIndex: steps.length, action: "Condition Evidence", targetVar: v, factors: [...factors], description: `Restricted factor entries to observed evidence ${v} = ${val}.` });
  });

  const elimVars = network.nodes
    .filter((n) => n.id !== queryVar && n.type === "chance" && !evidence[n.id])
    .map((n) => n.id)
    .sort((a, b) => factors.filter((f) => f.variables.includes(a)).length - factors.filter((f) => f.variables.includes(b)).length);

  for (const elim of elimVars) {
    const relevant = factors.filter((f) => f.variables.includes(elim));
    const rest = factors.filter((f) => !f.variables.includes(elim));
    if (relevant.length === 0) continue;
    const prod = multiplyFactorList(relevant, `f_prod_${elim}`);
    steps.push({ stepIndex: steps.length, action: "Pointwise Product", targetVar: elim, factors: [...rest, prod], intermediateFactor: prod, description: `Multiplied ${relevant.length} factors containing variable ${elim}.` });
    const summed = sumOutVariable(prod, elim, `f_sum_${elim}`);
    factors = [...rest, summed];
    steps.push({ stepIndex: steps.length, action: "Sum Out (Marginalize)", targetVar: elim, factors: [...factors], intermediateFactor: summed, description: `Summed out hidden variable ${elim} from product factor.` });
  }

  const queryFactors = factors.filter((f) => f.variables.includes(queryVar));
  const finalProd = multiplyFactorList(queryFactors, `f_final_${queryVar}`);
  const norm = normalizeQueryFactor(finalProd, queryVar);
  steps.push({ stepIndex: steps.length, action: "Normalize", targetVar: queryVar, factors: [finalProd], normalizedResult: norm, description: `Normalized remaining factors to compute exact posterior P(${queryVar} | evidence).` });

  return steps;
}
