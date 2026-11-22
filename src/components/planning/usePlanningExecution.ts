import { useState, useEffect, useCallback } from "react";
import { PlanningProblem } from "@/data/planningProblems";
import { ActionStep } from "./planningTypes";
import { usePlanningWorld } from "./usePlanningWorld";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";
import { initPlanState, firePlanningConfetti } from "./planningStepHelper";

export function usePlanningExecution(
  problem: PlanningProblem,
  world: ReturnType<typeof usePlanningWorld>,
  plannerType: "forward" | "regression",
) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [planSteps, setPlanSteps] = useState<ActionStep[]>([]);
  const [isUnsolvable, setIsUnsolvable] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600);

  const initializeBlocks = useCallback(() => {
    setIsExecuting(false);
    setCurrentStepIndex(0);
    world.resetWorld();
    const { steps, log, isUnsolvable: unsolvable } = initPlanState(problem, plannerType);
    setPlanSteps(steps);
    setIsUnsolvable(unsolvable);
    world.setLog(log);
  }, [problem, plannerType, world.resetWorld, world.setLog]);

  useEffect(() => { initializeBlocks(); }, [initializeBlocks]);

  const stepExecution = useCallback(() => {
    if (isUnsolvable || planSteps.length === 0) {
      setIsExecuting(false);
      world.setLog(isUnsolvable ? "Planning problem is contradictory or unsolvable." : "No steps to execute.");
      return;
    }
    if (currentStepIndex >= planSteps.length) {
      setIsExecuting(false);
      return;
    }
    world.applyStep(planSteps[currentStepIndex]);
    const nextIdx = currentStepIndex + 1;
    setCurrentStepIndex(nextIdx);
    if (nextIdx === planSteps.length) {
      setIsExecuting(false);
      world.setLog("Goal configuration reached! Plan execution complete.");
      firePlanningConfetti(70, 80);
    }
  }, [currentStepIndex, isUnsolvable, planSteps, world.applyStep, world.setLog]);

  useSimulationTimer(isExecuting, currentStepIndex < planSteps.length, stepExecution, 1050 - speed);

  return {
    currentStepIndex, isExecuting, setIsExecuting, planSteps, isUnsolvable,
    speed, setSpeed, initializeBlocks, stepExecution,
  };
}
