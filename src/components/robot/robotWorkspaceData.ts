import { ROBOT_WORLDS } from "@/data/robotProblems";
import { PrebuiltItem, AlgorithmItem } from "../workspace/workspaceTypes";

export const ROBOT_PREBUILT_ITEMS: PrebuiltItem[] = Object.values(ROBOT_WORLDS).map((w) => ({
  id: w.id,
  label: w.name,
  description: w.description,
}));

export const ROBOT_ALGORITHM_ITEMS: AlgorithmItem[] = [
  { id: "sense_plan_act", label: "Sense-Plan-Act Cycle" },
  { id: "wall_following", label: "Reactive Wall Following" },
];
