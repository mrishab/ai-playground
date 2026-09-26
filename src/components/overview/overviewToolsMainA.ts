import { Search, ShieldCheck } from "lucide-react";
import { OverviewToolItem } from "./overviewToolsTypes";
import { MAIN_TOOLS_A2 } from "./overviewToolsMainA2";

const MAIN_TOOLS_A1: OverviewToolItem[] = [
  {
    id: "search",
    title: "Graph Searching",
    category: "Main Tools",
    badge: "Pathfinding",
    icon: Search,
    color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    description:
      "State-space pathfinding with DFS, BFS, Dijkstra, Best-First, and A* Search.",
    algorithms: ["A* Search", "Dijkstra", "DFS / BFS", "Multi-Path Pruning"],
  },
  {
    id: "constraint",
    title: "Consistency for CSP",
    category: "Main Tools",
    badge: "CSPs",
    icon: ShieldCheck,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    description:
      "Arc Consistency (AC-3), domain pruning, and backtracking search for CSPs.",
    algorithms: [
      "AC-3 Algorithm",
      "Domain Splitting",
      "Backtracking",
      "MRV Heuristic",
    ],
  },
];

export const MAIN_TOOLS_A: OverviewToolItem[] = [
  ...MAIN_TOOLS_A1,
  ...MAIN_TOOLS_A2,
];
