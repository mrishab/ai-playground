import { Bot, Box } from "lucide-react";
import { OverviewToolItem } from "./overviewToolsTypes";

export const PROTO_TOOLS: OverviewToolItem[] = [
  {
    id: "robot",
    title: "Robot Control & Simulation",
    category: "Prototype Tools",
    badge: "Embodied AI",
    icon: Bot,
    color: "text-primary bg-primary/10 border-primary/20",
    description:
      "Autonomous robot navigation with whisker sensors, obstacle avoidance, and subsumption.",
    algorithms: [
      "Sense-Plan-Act",
      "Hierarchical Subsumption",
      "Wall Following",
      "Reactive Steering",
    ],
  },
  {
    id: "planning",
    title: "STRIPS Planning (Blocks World)",
    category: "Prototype Tools",
    badge: "Classical Planning",
    icon: Box,
    color: "text-accent-foreground bg-accent border-border",
    description:
      "Blocks World planning with gripper execution and Sussman Anomaly resolution.",
    algorithms: [
      "Forward Progression",
      "Goal Regression",
      "Sussman Anomaly Resolution",
      "Blocks World Physics",
    ],
  },
];
