import React from "react";
import { SEARCH_GRAPHS } from "@/data/searchProblems";
import { AlgorithmType } from "./searchTypes";

interface SearchProblemSelectProps {
  selectedGraphId: string;
  setSelectedGraphId: (id: string) => void;
  algorithm: AlgorithmType;
  setAlgorithm: (algo: AlgorithmType) => void;
}

export function SearchProblemSelect({
  selectedGraphId,
  setSelectedGraphId,
  algorithm,
  setAlgorithm,
}: SearchProblemSelectProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <select
        aria-label="Select Search Map"
        value={selectedGraphId}
        onChange={(e) => setSelectedGraphId(e.target.value)}
        className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {Object.values(SEARCH_GRAPHS).map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <select
        aria-label="Select Search Algorithm"
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
        className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="astar">A* Search (g + h)</option>
        <option value="best_first">Greedy Best-First (h)</option>
        <option value="lcfs">Lowest-Cost-First (Dijkstra)</option>
        <option value="bfs">Breadth-First Search (BFS)</option>
        <option value="dfs">Depth-First Search (DFS)</option>
        <option value="mpp">Multi-Path Pruning (MPP)</option>
      </select>
    </div>
  );
}
