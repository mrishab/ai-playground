import { Cpu, Laptop } from "lucide-react";
import { OverviewToolItem } from "./overviewToolsTypes";

export const MAIN_TOOLS_B2: OverviewToolItem[] = [
  {
    id: "neural",
    title: "Neural Networks",
    category: "Main Tools",
    badge: "Connectionism",
    icon: Cpu,
    color: "text-accent-foreground bg-accent border-border",
    description:
      "Feedforward neural networks and backpropagation with 2D decision boundary visualization.",
    algorithms: [
      "Backpropagation",
      "2D Boundary Mapping",
      "Gradient Descent",
      "Momentum",
    ],
  },
  {
    id: "strips_to_csp",
    title: "STRIPS to CSP",
    category: "Main Tools",
    badge: "Planning as CSP",
    icon: Laptop,
    color: "text-primary bg-primary/10 border-primary/20",
    description:
      "Compile STRIPS planning into temporal constraint satisfaction problems.",
    algorithms: [
      "Temporal Unfolding",
      "Explanatory Frame Axioms",
      "Mutex Detection",
      "CSP Compilation",
    ],
  },
];
