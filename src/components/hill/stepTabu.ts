import { CSPProblem } from "@/data/cspProblems";
import { TabuItem, VariableAssignment } from "./hillTypes";
import { evaluateConflicts } from "./hillEvaluation";

export function stepTabu(
  problem: CSPProblem,
  assignment: VariableAssignment,
  tabuList: TabuItem[],
  tenure: number,
) {
  const targetVar =
    problem.variables[Math.floor(Math.random() * problem.variables.length)];
  let bestVal = assignment[targetVar.name];
  let minConf = 9999;

  for (const val of targetVar.domain) {
    if (
      tabuList.some(
        (item) => item.varName === targetVar.name && item.val === val,
      )
    )
      continue;
    const c = evaluateConflicts(problem, {
      ...assignment,
      [targetVar.name]: val,
    });
    if (c < minConf) {
      minConf = c;
      bestVal = val;
    }
  }

  if (minConf === 9999) {
    for (const val of targetVar.domain) {
      const c = evaluateConflicts(problem, {
        ...assignment,
        [targetVar.name]: val,
      });
      if (c < minConf) {
        minConf = c;
        bestVal = val;
      }
    }
  }

  return {
    nextAssign: { ...assignment, [targetVar.name]: bestVal },
    newConflicts: minConf,
    newTabuList: [...tabuList, { varName: targetVar.name, val: bestVal }].slice(
      -tenure,
    ),
    log: `Tabu move: ${targetVar.name} = ${bestVal} (conflicts: ${minConf}).`,
  };
}
