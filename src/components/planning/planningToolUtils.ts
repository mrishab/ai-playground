import { PlanningProblem } from "@/data/planningProblems";

export const BLANK_PLANNING_PROBLEM: PlanningProblem = {
  id: "blank",
  name: "Empty Planning World",
  description: "Reset empty blocks world",
  initial: { table: [], stacks: [], holding: null, clear: [] },
  goal: [],
  blocks: [],
};

export function normalizePlanningProblem(imported: PlanningProblem): PlanningProblem {
  return {
    ...imported,
    initial: imported.initial || { table: [], stacks: [], holding: null, clear: [] },
    blocks: Array.isArray(imported.blocks) ? imported.blocks : [],
    goal: Array.isArray(imported.goal) ? imported.goal : [],
  };
}
