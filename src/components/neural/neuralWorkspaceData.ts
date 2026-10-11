import { NEURAL_DATASETS } from "@/data/neuralProblems";
import { PrebuiltItem, AlgorithmItem } from "../workspace/workspaceTypes";

export const NEURAL_PREBUILT_ITEMS: PrebuiltItem[] = Object.values(NEURAL_DATASETS).map((ds) => ({
  id: ds.id,
  label: ds.name,
  description: ds.description,
}));

export const NEURAL_ALGORITHM_ITEMS: AlgorithmItem[] = [
  { id: "mlp_sgd", label: "Multi-Layer Perceptron (SGD + Momentum)" },
  { id: "perceptron", label: "Single-Layer Perceptron" },
];
