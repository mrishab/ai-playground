import { CSPProblem } from "@/data/cspProblems";
import { VariableAssignment } from "./hillTypes";
import { evaluateConflicts } from "./hillEvaluation";
import { getConflictedVars } from "./hillHeuristics";

export function stepRandomWalk(
  problem: CSPProblem,
  assignment: VariableAssignment,
  p: number,
) {
  const unique = getConflictedVars(problem, assignment);
  const isRandom = Math.random() < p;
  const targetVarName =
    unique.length > 0
      ? unique[Math.floor(Math.random() * unique.length)]
      : problem.variables[Math.floor(Math.random() * problem.variables.length)]
          .name;
  const targetVar = problem.variables.find((v) => v.name === targetVarName)!;

  if (isRandom) {
    const candidateVals = targetVar.domain.filter((v) => v !== assignment[targetVar.name]);
    const randomVal =
      candidateVals.length > 0
        ? candidateVals[Math.floor(Math.random() * candidateVals.length)]
        : targetVar.domain[0];
    const nextAssign = { ...assignment, [targetVar.name]: randomVal };
    const newConflicts = evaluateConflicts(problem, nextAssign);
    return {
      nextAssign,
      newConflicts,
      log: `Random Walk: ${targetVar.name} = ${randomVal} (conflicts: ${newConflicts}).`,
    };
  }

  let bestVals: string[] = [];
  let minConf = 9999;
  const candidateVals = targetVar.domain.filter((v) => v !== assignment[targetVar.name]);
  const evalDomain = candidateVals.length > 0 ? candidateVals : targetVar.domain;
  for (const val of evalDomain) {
    const c = evaluateConflicts(problem, {
      ...assignment,
      [targetVar.name]: val,
    });
    if (c < minConf) {
      minConf = c;
      bestVals = [val];
    } else if (c === minConf) {
      bestVals.push(val);
    }
  }

  const bestVal = bestVals[Math.floor(Math.random() * bestVals.length)];
  return {
    nextAssign: { ...assignment, [targetVar.name]: bestVal },
    newConflicts: minConf,
    log: `Greedy step: ${targetVar.name} = ${bestVal} (conflicts: ${minConf}).`,
  };
}
