import { useState } from "react";
import { PLANNING_PROBLEMS, PlanningProblem } from "@/data/planningProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { usePlanningWorld } from "./usePlanningWorld";
import { usePlanningExecution } from "./usePlanningExecution";
import { BLANK_PLANNING_PROBLEM, normalizePlanningProblem } from "./planningToolUtils";

export function usePlanningTool() {
  const [selectedProblemId, setSelectedProblemId] = useState<string>("sussman");
  const [customProblem, setCustomProblem] = useState<PlanningProblem | null>(null);

  const problem: PlanningProblem =
    selectedProblemId === "custom" && customProblem
      ? customProblem
      : PLANNING_PROBLEMS[selectedProblemId] || PLANNING_PROBLEMS.sussman;
  const tutorial = TOOL_TUTORIALS.planning;
  const [plannerType, setPlannerType] = useState<"forward" | "regression">("forward");

  const handleImportProblem = (imported: PlanningProblem) => {
    setCustomProblem(normalizePlanningProblem(imported));
    setSelectedProblemId("custom");
  };

  const handleResetProblem = () => {
    setCustomProblem(BLANK_PLANNING_PROBLEM);
    setSelectedProblemId("custom");
  };

  const handleSelectProblemId = (id: string) => {
    setSelectedProblemId(id);
    if (id !== "custom" && PLANNING_PROBLEMS[id]) {
      setCustomProblem(PLANNING_PROBLEMS[id]);
    }
  };

  const world = usePlanningWorld(problem);
  const exec = usePlanningExecution(problem, world, plannerType);

  return {
    selectedProblemId,
    setSelectedProblemId: handleSelectProblemId,
    handleImportProblem,
    handleResetProblem,
    problem,
    tutorial,
    plannerType,
    setPlannerType,
    ...exec,
    ...world,
  };
}
