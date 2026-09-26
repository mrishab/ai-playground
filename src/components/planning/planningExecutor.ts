import { PlanningProblem } from "@/data/planningProblems";
import { ActionStep } from "./planningTypes";
import { applyPickup, applyPutdown, applyStack } from "./planningActions";

export function executeStepOnWorld(
  step: ActionStep,
  columns: string[][],
  holdingBlock: string | null,
  problem: PlanningProblem,
): {
  newCols: string[][];
  newHolding: string | null;
  newGripperCol: number;
  log: string;
} {
  const newCols = columns.map((c) => [...c]);
  const getBlockId = (letter: string) => {
    const b = problem.blocks.find((item) => item.label === letter);
    return b ? b.id : letter;
  };

  if (step.name === "unstack" || step.name === "pickup") {
    const res = applyPickup(
      newCols,
      getBlockId(step.args[0]),
      step.args[0],
      step.description,
    );
    return { newCols, ...res };
  }

  if (step.name === "putdown") {
    const bId = holdingBlock || getBlockId(step.args[0]);
    const res = applyPutdown(newCols, bId, step.args[0], step.description);
    return { newCols, ...res };
  }

  if (step.name === "stack") {
    const topId = holdingBlock || getBlockId(step.args[0]);
    const baseId = getBlockId(step.args[1]);
    const res = applyStack(
      newCols,
      topId,
      baseId,
      step.args[0],
      step.args[1],
      step.description,
    );
    return { newCols, ...res };
  }

  return { newCols, newHolding: holdingBlock, newGripperCol: 2, log: "" };
}
