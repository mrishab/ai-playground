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
    color: "text-primary bg-primary/10 border-primary/20",
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
    color: "text-secondary-foreground bg-secondary border-border",
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
