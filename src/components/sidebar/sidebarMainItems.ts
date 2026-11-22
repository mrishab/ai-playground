import {
  Search,
  ShieldCheck,
  Zap,
  Network,
  TreePine,
  Cpu,
  GitBranch,
  Laptop,
} from "lucide-react";
import { NavItem } from "./sidebarItemTypes";

export const NAV_MAIN_ITEMS: NavItem[] = [
  {
    id: "search",
    title: "Graph Searching",
    icon: Search,
    category: "Main Tools",
  },
  {
    id: "constraint",
    title: "Consistency for CSP",
    icon: ShieldCheck,
    category: "Main Tools",
  },
  {
    id: "hill",
    title: "SLS for CSP (Stochastic Local Search)",
    icon: Zap,
    category: "Main Tools",
  },
  {
    id: "deduction",
    title: "Definite Clause Deduction",
    icon: GitBranch,
    category: "Main Tools",
  },
  {
    id: "bayes",
    title: "Belief & Decision Networks",
    icon: Network,
    category: "Main Tools",
  },
  {
    id: "dtree",
    title: "Decision Trees",
    icon: TreePine,
    category: "Main Tools",
  },
  { id: "neural", title: "Neural Networks", icon: Cpu, category: "Main Tools" },
  {
    id: "strips_to_csp",
    title: "STRIPS to CSP",
    icon: Laptop,
    category: "Main Tools",
  },
];
