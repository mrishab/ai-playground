import { CSPProblem } from "@/data/cspProblems";
import { VariableAssignment } from "./hillTypes";
import { evaluateConflicts } from "./hillEvaluation";

export function stepGreedyDescent(
  problem: CSPProblem,
  assignment: VariableAssignment,
  conflicts: number,
) {
  let bestMoves: {
    assign: VariableAssignment;
    c: number;
    vName: string;
    val: string;
  }[] = [];
  let minConf = conflicts;

  for (const v of problem.variables) {
    for (const val of v.domain) {
      if (assignment[v.name] === val) continue;
      const test = { ...assignment, [v.name]: val };
      const c = evaluateConflicts(problem, test);
      if (c < minConf) {
        minConf = c;
        bestMoves = [{ assign: test, c, vName: v.name, val }];
      } else if (c === minConf && c < conflicts) {
        bestMoves.push({ assign: test, c, vName: v.name, val });
      }
    }
  }

  if (bestMoves.length > 0) {
    const move = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    return {
      nextAssign: move.assign,
      newConflicts: move.c,
      log: `Greedy descent: ${move.vName} = ${move.val} (conflicts: ${move.c}).`,
      plateau: false,
    };
  }

  return {
    nextAssign: assignment,
    newConflicts: conflicts,
    log: "Local Optimum plateau reached! Greedy descent cannot improve.",
    plateau: true,
  };
}
