import { DTREE_DATASETS } from "@/data/dtreeProblems";
import { PrebuiltItem, AlgorithmItem } from "../workspace/workspaceTypes";

export const DTREE_PREBUILT_ITEMS: PrebuiltItem[] = Object.values(DTREE_DATASETS).map((ds) => ({
  id: ds.id,
  label: ds.name,
  description: ds.description,
}));

export const DTREE_ALGORITHM_ITEMS: AlgorithmItem[] = [
  { id: "id3", label: "ID3 (Information Gain)" },
  { id: "c45", label: "C4.5 (Gain Ratio)" },
  { id: "cart", label: "CART (Gini Impurity)" },
];
