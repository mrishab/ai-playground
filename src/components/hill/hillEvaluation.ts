import { CSPProblem, CSPConstraint } from "@/data/cspProblems";
import { VariableAssignment } from "./hillTypes";

export function isConstraintViolated(
  c: CSPConstraint,
  currentAssign: VariableAssignment,
): boolean {
  if (c.variables.length < 2) return false;
  const val1 = currentAssign[c.variables[0]];
  const val2 = currentAssign[c.variables[1]];
  if (!val1 || !val2) return false;

  if (c.allowed && c.allowed.length > 0) {
    return !c.allowed.some((t: string[]) => t[0] === val1 && t[1] === val2);
  } else if (c.name.includes("<")) {
    return parseFloat(val1) >= parseFloat(val2);
  }
  return val1 === val2;
}

export function evaluateConflicts(
  problem: CSPProblem,
  currentAssign: VariableAssignment,
): number {
  let count = 0;
  for (const c of problem.constraints) {
    if (isConstraintViolated(c, currentAssign)) count++;
  }
  return count;
}

export function generateRandomAssignment(
  problem: CSPProblem,
): VariableAssignment {
  const initAssign: VariableAssignment = {};
  for (const v of problem.variables) {
    initAssign[v.name] = v.domain[Math.floor(Math.random() * v.domain.length)];
  }
  return initAssign;
}

export function initHillAssignment(problem: CSPProblem) {
  const assignment = generateRandomAssignment(problem);
  return { assignment, conflicts: evaluateConflicts(problem, assignment) };
}
