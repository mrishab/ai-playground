import { VeFactor } from "./bayesVeTypes";
import { multiplyFactors } from "./bayesVeFactorOps";

export function multiplyFactorList(factors: VeFactor[], name: string): VeFactor {
  if (factors.length === 0) return { id: "f-empty", name, variables: [], table: [] };
  let current = factors[0];
  for (let i = 1; i < factors.length; i++) {
    current = multiplyFactors(current, factors[i], name);
  }
  return current;
}

export function normalizeQueryFactor(
  factor: VeFactor,
  queryVar: string,
  outcomes?: string[],
): Record<string, number> {
  const result: Record<string, number> = {};
  if (outcomes) {
    outcomes.forEach((o) => {
      result[o] = 0;
    });
  }
  let total = 0;
  for (const r of factor.table) {
    const val = r.assignment[queryVar] || "default";
    result[val] = (result[val] || 0) + r.value;
    total += r.value;
  }
  if (total > 0) {
    for (const k of Object.keys(result)) {
      result[k] = Number((result[k] / total).toFixed(4));
    }
  } else if (outcomes && outcomes.length > 0) {
    for (const k of outcomes) {
      result[k] = Number((1 / outcomes.length).toFixed(4));
    }
  }
  return result;
}
