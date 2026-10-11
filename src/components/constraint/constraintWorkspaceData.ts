import { CSP_PROBLEMS } from "@/data/cspProblems";
import { PrebuiltItem, AlgorithmItem } from "../workspace/workspaceTypes";

export const CSP_PREBUILT_ITEMS: PrebuiltItem[] = Object.values(CSP_PROBLEMS).map((p) => ({
  id: p.id,
  label: p.name,
  description: p.description,
}));

export const CSP_ALGORITHM_ITEMS: AlgorithmItem[] = [
  { id: "ac3", label: "AC-3 Arc Consistency" },
  { id: "mac", label: "MAC (Maintaining Arc Consistency)" },
  { id: "split", label: "Domain Splitting (Backtracking)" },
];
