import { useState } from "react";
import { PLANNING_PROBLEMS, PlanningProblem } from "@/data/planningProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { usePlanningWorld } from "./usePlanningWorld";
import { usePlanningExecution } from "./usePlanningExecution";

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
    setCustomProblem({
      ...imported,
      initial: imported.initial || { table: [], stacks: [], holding: null, clear: [] },
      blocks: Array.isArray(imported.blocks) ? imported.blocks : [],
      goal: Array.isArray(imported.goal) ? imported.goal : [],
    });
    setSelectedProblemId("custom");
  };

  const handleResetProblem = () => {
    setCustomProblem({
      id: "blank",
      name: "Empty Planning World",
      description: "Reset empty blocks world",
      initial: { table: [], stacks: [], holding: null, clear: [] },
      goal: [],
      blocks: [],
    });
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
