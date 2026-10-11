import { CSP_PROBLEMS } from "@/data/cspProblems";
import { PrebuiltItem, AlgorithmItem } from "../workspace/workspaceTypes";

export const HILL_PREBUILT_ITEMS: PrebuiltItem[] = Object.values(CSP_PROBLEMS).map((p) => ({
  id: p.id,
  label: p.name,
  description: p.description,
}));

export const HILL_ALGORITHM_ITEMS: AlgorithmItem[] = [
  { id: "greedy_descent", label: "Greedy Descent (Min-Conflicts)" },
  { id: "random_walk", label: "Random Walk" },
  { id: "simulated_annealing", label: "Simulated Annealing" },
  { id: "tabu", label: "Tabu Search" },
];
