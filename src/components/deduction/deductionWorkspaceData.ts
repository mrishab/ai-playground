import { DEDUCTION_KBS } from "@/data/deductionProblems";
import { PrebuiltItem, AlgorithmItem } from "../workspace/workspaceTypes";

export const DEDUCTION_PREBUILT_ITEMS: PrebuiltItem[] = Object.values(DEDUCTION_KBS).map((kb) => ({
  id: kb.id,
  label: kb.name,
  description: kb.description,
}));

export const DEDUCTION_ALGORITHM_ITEMS: AlgorithmItem[] = [
  { id: "sld", label: "SLD Resolution (Top-Down)" },
  { id: "bottom_up", label: "Bottom-Up Chaining" },
];
