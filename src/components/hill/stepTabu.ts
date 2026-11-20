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
  const currentVal = assignment[targetVar.name];
  const candidates = targetVar.domain.filter((v) => v !== currentVal);
  const evalDomain = candidates.length > 0 ? candidates : targetVar.domain;
  let bestVal = evalDomain[0];
  let minConf = 9999;

  for (const val of evalDomain) {
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
    for (const val of evalDomain) {
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
