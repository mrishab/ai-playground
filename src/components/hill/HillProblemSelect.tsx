import React from "react";
import { CSP_PROBLEMS } from "@/data/cspProblems";
import { SLSAlgorithm } from "./hillTypes";

interface HillProblemSelectProps {
  selectedProblemId: string;
  setSelectedProblemId: (id: string) => void;
  algorithm: SLSAlgorithm;
  setAlgorithm: (algo: SLSAlgorithm) => void;
}

export function HillProblemSelect({
  selectedProblemId,
  setSelectedProblemId,
  algorithm,
  setAlgorithm,
}: HillProblemSelectProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <select
        aria-label="Select CSP Problem"
        value={selectedProblemId}
        onChange={(e) => setSelectedProblemId(e.target.value)}
        className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {Object.values(CSP_PROBLEMS).map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <select
        aria-label="Select SLS Algorithm"
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value as SLSAlgorithm)}
        className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="min_conflicts">Min-Conflicts Heuristic</option>
        <option value="random_walk">Greedy + Random Walk (p-walk)</option>
        <option value="annealing">Simulated Annealing</option>
        <option value="tabu">Tabu Search</option>
        <option value="greedy">Greedy Descent</option>
      </select>
    </div>
  );
}
