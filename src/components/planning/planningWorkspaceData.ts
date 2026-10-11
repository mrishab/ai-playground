import { PLANNING_PROBLEMS } from "@/data/planningProblems";
import { PrebuiltItem, AlgorithmItem } from "../workspace/workspaceTypes";

export const PLANNING_PREBUILT_ITEMS: PrebuiltItem[] = Object.values(PLANNING_PROBLEMS).map((p) => ({
  id: p.id,
  label: p.name,
  description: p.description,
}));

export const PLANNING_ALGORITHM_ITEMS: AlgorithmItem[] = [
  { id: "forward", label: "Forward State-Space Search" },
  { id: "regression", label: "Goal Regression Planning" },
];
