import { Cpu, Laptop } from "lucide-react";
import { OverviewToolItem } from "./overviewToolsTypes";

export const MAIN_TOOLS_B2: OverviewToolItem[] = [
  {
    id: "neural",
    title: "Neural Networks",
    category: "Main Tools",
    badge: "Connectionism",
    icon: Cpu,
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
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
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
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
