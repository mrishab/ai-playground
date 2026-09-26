import { CSPProblem } from "@/data/cspProblems";
import { VariableAssignment } from "./hillTypes";
import { evaluateConflicts } from "./hillEvaluation";

export function stepAnnealing(
  problem: CSPProblem,
  assignment: VariableAssignment,
  conflicts: number,
  temp: number,
) {
  const targetVar =
    problem.variables[Math.floor(Math.random() * problem.variables.length)];
  const otherVals = targetVar.domain.filter(
    (v) => v !== assignment[targetVar.name],
  );
  const candidateVal =
    otherVals.length > 0
      ? otherVals[Math.floor(Math.random() * otherVals.length)]
      : targetVar.domain[0];
  const testAssign = { ...assignment, [targetVar.name]: candidateVal };
  const testConf = evaluateConflicts(problem, testAssign);
  const delta = testConf - conflicts;
  const accepted =
    delta < 0 || Math.random() < Math.exp(-delta / Math.max(0.01, temp));

  return {
    nextAssign: accepted ? testAssign : assignment,
    newConflicts: accepted ? testConf : conflicts,
    newTemperature: Math.max(0.05, temp * 0.995),
    log: accepted
      ? `Annealing accepted: ${targetVar.name} = ${candidateVal} (delta=${delta}, T=${temp.toFixed(2)}).`
      : `Annealing rejected: ${targetVar.name} = ${candidateVal} (delta=${delta}).`,
  };
}
