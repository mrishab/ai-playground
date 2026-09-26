import { CSPProblem } from "@/data/cspProblems";
import { generateRandomAssignment, evaluateConflicts } from "./hillEvaluation";
import { getConflictedVars } from "./hillHeuristics";

export function simulateTrial(problem: CSPProblem): number | null {
  const current = generateRandomAssignment(problem);
  let step = 0;
  let currConf = evaluateConflicts(problem, current);

  const varMap = new Map(problem.variables.map((v) => [v.name, v]));

  while (currConf > 0 && step < 150) {
    const unique = getConflictedVars(problem, current);
    const targetVarName =
      unique.length > 0
        ? unique[Math.floor(Math.random() * unique.length)]
        : problem.variables[
            Math.floor(Math.random() * problem.variables.length)
          ].name;
    const targetVar = varMap.get(targetVarName)!;

    let bestVals: string[] = [];
    let minC = 9999;
    for (const val of targetVar.domain) {
      const test = { ...current, [targetVar.name]: val };
      const c = evaluateConflicts(problem, test);
      if (c < minC) {
        minC = c;
        bestVals = [val];
      } else if (c === minC) {
        bestVals.push(val);
      }
    }
    current[targetVar.name] =
      bestVals[Math.floor(Math.random() * bestVals.length)];
    currConf = minC;
    step++;
  }

  return currConf === 0 ? step : null;
}
