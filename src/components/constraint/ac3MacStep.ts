import { CSPProblem } from "@/data/cspProblems";
import { VariableDomains } from "./constraintTypes";

export function findMrvVariable(
  problem: CSPProblem,
  domains: VariableDomains,
): string | null {
  let bestVar: string | null = null;
  let minSize = Infinity;
  for (const v of problem.variables) {
    const d = domains[v.name];
    if (d && d.length > 1 && d.length < minSize) {
      minSize = d.length;
      bestVar = v.name;
    }
  }
  return bestVar;
}

export function isCspFullySolved(domains: VariableDomains): boolean {
  const vals = Object.values(domains);
  return vals.length > 0 && vals.every((d) => d && d.length === 1);
}

export function hasAnyWipeout(domains: VariableDomains): boolean {
  return Object.values(domains).some((d) => !d || d.length === 0);
}
