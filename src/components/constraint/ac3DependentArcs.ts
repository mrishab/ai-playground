import { CSPProblem } from "@/data/cspProblems";
import { ArcItem, FineStepResult, VariableDomains } from "./constraintTypes";

export function getDependentArcs(
  varName: string,
  problem: CSPProblem,
  queueCopy: ArcItem[],
): ArcItem[] {
  const newArcsToAdd: ArcItem[] = [];
  for (const c of problem.constraints) {
    if (c.variables.includes(varName)) {
      for (const otherV of c.variables) {
        if (
          otherV !== varName &&
          !queueCopy.some((a) => a.varName === otherV && a.constraint === c)
        ) {
          newArcsToAdd.push({ varName: otherV, constraint: c });
        }
      }
    }
  }
  return newArcsToAdd;
}

export function makeWipeoutResult(
  updatedDomains: VariableDomains,
  arc: ArcItem,
  varName: string,
): FineStepResult {
  return {
    updatedQueue: [],
    updatedDomains,
    currentArc: arc,
    log: `DOMAIN WIPEOUT! Domain of ${varName} is empty. Inconsistent branch.`,
    isWipeout: true,
    done: true,
  };
}
