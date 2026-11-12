import { Zap, GitBranch } from "lucide-react";
import { OverviewToolItem } from "./overviewToolsTypes";

export const MAIN_TOOLS_A2: OverviewToolItem[] = [
  {
    id: "hill",
    title: "Stochastic Local Search",
    category: "Main Tools",
    badge: "Optimization",
    icon: Zap,
    color: "text-primary bg-primary/10 border-primary/20",
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
    color: "text-accent-foreground bg-accent border-border",
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
