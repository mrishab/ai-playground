import { STRIPS_PROBLEMS } from "@/data/stripsProblems";
import { PrebuiltItem, AlgorithmItem } from "../workspace/workspaceTypes";

export const STRIPS_PREBUILT_ITEMS: PrebuiltItem[] = Object.values(STRIPS_PROBLEMS).map((p) => ({
  id: p.id,
  label: p.name,
  description: p.description,
}));

export const STRIPS_ALGORITHM_ITEMS: AlgorithmItem[] = [
  { id: "bounded_csp", label: "Bounded Horizon CSP Solver" },
  { id: "sat_plan", label: "SATPlan Reduction" },
];
