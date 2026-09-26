import React from "react";
import { STRIPS_PROBLEMS, StripsProblem } from "@/data/stripsProblems";
import { Badge } from "@/components/ui/Badge";

export function StripsToCspHeader({
  problem,
  selectedProblemId,
  onSelectProblemId,
  isSolved,
  planLength,
  badgeText,
}: {
  problem: StripsProblem;
  selectedProblemId: string;
  onSelectProblemId: (id: string) => void;
  isSolved: boolean;
  planLength: number;
  badgeText: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold tracking-tight">
            STRIPS to CSP Planning
          </span>
          <Badge variant="cyan">{badgeText}</Badge>
          {isSolved && (
            <Badge variant="success">Plan Found (Length {planLength})</Badge>
          )}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          {problem.description}
        </p>
      </div>

      <select
        aria-label="Select STRIPS Problem"
        value={selectedProblemId}
        onChange={(e) => onSelectProblemId(e.target.value)}
        className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {Object.values(STRIPS_PROBLEMS).map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}
