import { useState } from "react";
import { PLANNING_PROBLEMS, PlanningProblem } from "@/data/planningProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { usePlanningWorld } from "./usePlanningWorld";
import { usePlanningExecution } from "./usePlanningExecution";

export function usePlanningTool() {
  const [selectedProblemId, setSelectedProblemId] = useState<string>("sussman");
  const problem: PlanningProblem =
    PLANNING_PROBLEMS[selectedProblemId] || PLANNING_PROBLEMS.sussman;
  const tutorial = TOOL_TUTORIALS.planning;
  const [plannerType, setPlannerType] = useState<"forward" | "regression">(
    "forward",
  );

  const world = usePlanningWorld(problem);
  const exec = usePlanningExecution(problem, world, plannerType);

  return {
    selectedProblemId,
    setSelectedProblemId,
    problem,
    tutorial,
    plannerType,
    setPlannerType,
    ...exec,
    ...world,
  };
}
