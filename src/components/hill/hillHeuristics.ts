import { CSPProblem } from "@/data/cspProblems";
import { VariableAssignment } from "./hillTypes";
import { evaluateConflicts, isConstraintViolated } from "./hillEvaluation";
export { stepRandomWalk } from "./stepRandomWalk";

export function getConflictedVars(
  problem: CSPProblem,
  assignment: VariableAssignment,
): string[] {
  const vars: string[] = [];
  for (const c of problem.constraints) {
    if (isConstraintViolated(c, assignment))
      vars.push(c.variables[0], c.variables[1]);
  }
  return Array.from(new Set(vars));
}

export function stepMinConflicts(
  problem: CSPProblem,
  assignment: VariableAssignment,
) {
  const unique = getConflictedVars(problem, assignment);
  const targetVar =
    unique.length > 0
      ? unique[Math.floor(Math.random() * unique.length)]
      : problem.variables[Math.floor(Math.random() * problem.variables.length)]
          .name;
  const varObj = problem.variables.find((v) => v.name === targetVar)!;
  let bestVals: string[] = [];
  let minConf = 9999;

  for (const val of varObj.domain) {
    const score = evaluateConflicts(problem, {
      ...assignment,
      [targetVar]: val,
    });
    if (score < minConf) {
      minConf = score;
      bestVals = [val];
    } else if (score === minConf) {
      bestVals.push(val);
    }
  }

  const bestVal = bestVals[Math.floor(Math.random() * bestVals.length)];
  return {
    nextAssign: { ...assignment, [targetVar]: bestVal },
    newConflicts: minConf,
    log: `Min-Conflicts: Changed ${targetVar} = ${bestVal} (conflicts: ${minConf}).`,
  };
}
