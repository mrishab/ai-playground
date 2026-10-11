import { SEARCH_GRAPHS } from "@/data/searchProblems";
import { PrebuiltItem, AlgorithmItem } from "../workspace/workspaceTypes";

export const SEARCH_PREBUILT_ITEMS: PrebuiltItem[] = [
  ...Object.values(SEARCH_GRAPHS).map((g) => ({
    id: g.id,
    label: g.name,
    description: g.description,
  })),
  { id: "custom", label: "Custom Built Graph", description: "User-designed graph" },
];

export const SEARCH_ALGORITHM_ITEMS: AlgorithmItem[] = [
  { id: "astar", label: "A* Search (g + h)" },
  { id: "best_first", label: "Greedy Best-First (h)" },
  { id: "lcfs", label: "Lowest-Cost-First (Dijkstra)" },
  { id: "bfs", label: "Breadth-First Search (BFS)" },
  { id: "dfs", label: "Depth-First Search (DFS)" },
  { id: "mpp", label: "Multi-Path Pruning (MPP)" },
];
