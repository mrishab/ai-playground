import { Zap, GitBranch } from "lucide-react";
import { OverviewToolItem } from "./overviewToolsTypes";

export const MAIN_TOOLS_A2: OverviewToolItem[] = [
  {
    id: "hill",
    title: "Stochastic Local Search",
    category: "Main Tools",
    badge: "Optimization",
    icon: Zap,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    description:
      "Local search and optimization via Min-Conflicts, Simulated Annealing, and Tabu Search.",
    algorithms: [
      "Min-Conflicts",
      "Simulated Annealing",
      "Tabu Search",
      "Random Walk",
    ],
  },
  {
    id: "deduction",
    title: "Definite Clause Deduction",
    category: "Main Tools",
    badge: "Logic & Proofs",
    icon: GitBranch,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    description:
      "Top-down SLD resolution, unification, and answer extraction for Horn clauses.",
    algorithms: [
      "SLD Resolution",
      "Unification & MGU",
      "Forward Chaining",
      "Answer Extraction",
    ],
  },
];
