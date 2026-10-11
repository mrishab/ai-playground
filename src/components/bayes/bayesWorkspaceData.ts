import { BAYES_NETWORKS } from "@/data/bayesProblems";
import { PrebuiltItem, AlgorithmItem } from "../workspace/workspaceTypes";

export const BAYES_PREBUILT_ITEMS: PrebuiltItem[] = Object.values(BAYES_NETWORKS).map((net) => ({
  id: net.id,
  label: net.name,
  description: net.description,
}));

export const BAYES_ALGORITHM_ITEMS: AlgorithmItem[] = [
  { id: "ve", label: "Variable Elimination (Exact)" },
  { id: "dsep", label: "D-Separation (Independence)" },
  { id: "sampling", label: "Rejection Sampling (Approximate)" },
];
