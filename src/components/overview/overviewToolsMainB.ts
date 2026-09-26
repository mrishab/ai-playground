import { Network, TreePine } from "lucide-react";
import { OverviewToolItem } from "./overviewToolsTypes";
import { MAIN_TOOLS_B2 } from "./overviewToolsMainB2";

const MAIN_TOOLS_B1: OverviewToolItem[] = [
  {
    id: "bayes",
    title: "Belief & Decision Networks",
    category: "Main Tools",
    badge: "Uncertainty",
    icon: Network,
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    description:
      "Probabilistic reasoning with Variable Elimination and D-Separation in Bayesian networks.",
    algorithms: [
      "Variable Elimination",
      "D-Separation",
      "Expected Utility",
      "Bayesian Conditioning",
    ],
  },
  {
    id: "dtree",
    title: "Decision Trees",
    category: "Main Tools",
    badge: "Supervised Learning",
    icon: TreePine,
    color: "text-lime-400 bg-lime-500/10 border-lime-500/20",
    description:
      "Decision tree induction using Shannon Entropy, Information Gain, and ID3.",
    algorithms: [
      "ID3 Algorithm",
      "Entropy Reduction",
      "Information Gain",
      "Tree Pruning",
    ],
  },
];

export const MAIN_TOOLS_B: OverviewToolItem[] = [
  ...MAIN_TOOLS_B1,
  ...MAIN_TOOLS_B2,
];
