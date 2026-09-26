import { CSPConstraint } from "@/data/cspProblems";
import { VariableDomains } from "./constraintTypes";
import { isInequalitySupported } from "./ac3Inequality";

function isValueSupported(
  varX: string,
  valX: string,
  constraint: CSPConstraint,
  currentDomains: VariableDomains,
): boolean {
  if (constraint.allowed && constraint.allowed.length > 0) {
    const varIndex = constraint.variables.indexOf(varX);
    if (varIndex === -1) return true;
    return constraint.allowed.some((tuple) => {
      if (tuple[varIndex] !== valX) return false;
      for (let i = 0; i < constraint.variables.length; i++) {
        if (i === varIndex) continue;
        const otherVar = constraint.variables[i];
        if (!currentDomains[otherVar]?.includes(tuple[i])) return false;
      }
      return true;
    });
  }

  const otherVar = constraint.variables.find((v) => v !== varX);
  if (!otherVar || !currentDomains[otherVar]) return true;

  return isInequalitySupported(
    constraint.name,
    constraint.variables[0],
    constraint.variables[1],
    varX,
    valX,
    otherVar,
    currentDomains,
  );
}

export function filterSupportedValues(
  currentDomain: string[],
  varName: string,
  constraint: CSPConstraint,
  domains: VariableDomains,
) {
  const remaining: string[] = [];
  const pruned: string[] = [];
  for (const val of currentDomain) {
    if (isValueSupported(varName, val, constraint, domains))
      remaining.push(val);
    else pruned.push(val);
  }
  return { remaining, pruned };
}
