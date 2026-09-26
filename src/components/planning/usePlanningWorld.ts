import { useState, useCallback } from "react";
import { PlanningProblem } from "@/data/planningProblems";
import { ActionStep } from "./planningTypes";
import { createInitialColumns } from "./planningSynthesizer";
import { executeStepOnWorld } from "./planningExecutor";

export function usePlanningWorld(problem: PlanningProblem) {
  const [columns, setColumns] = useState<string[][]>([[], [], [], [], []]);
  const [holdingBlock, setHoldingBlock] = useState<string | null>(null);
  const [gripperColIndex, setGripperColIndex] = useState<number>(2);
  const [log, setLog] = useState<string>(
    "Blocks World initialized. Click Plan or Execute.",
  );

  const resetWorld = useCallback(() => {
    setColumns(createInitialColumns(problem.id));
    setHoldingBlock(null);
    setGripperColIndex(2);
  }, [problem.id]);

  const applyStep = useCallback(
    (step: ActionStep) => {
      const res = executeStepOnWorld(step, columns, holdingBlock, problem);
      setColumns(res.newCols);
      setHoldingBlock(res.newHolding);
      setGripperColIndex(res.newGripperCol);
      setLog(res.log);
    },
    [columns, holdingBlock, problem],
  );

  return {
    columns,
    holdingBlock,
    gripperColIndex,
    log,
    setLog,
    resetWorld,
    applyStep,
  };
}
