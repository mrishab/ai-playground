import React from "react";
import { CSP_PROBLEMS, CSPProblem } from "@/data/cspProblems";
import { ToolTutorialData } from "@/data/toolTutorials";
import { Badge } from "../ui/Badge";

interface ConstraintHeaderProps {
  selectedProblemId: string;
  setSelectedProblemId: (id: string) => void;
  problem: CSPProblem;
  tutorial: ToolTutorialData;
  isCSPFullySolved: boolean;
  hasDomainWipeout: boolean;
}

export function ConstraintHeader({
  selectedProblemId,
  setSelectedProblemId,
  problem,
  tutorial,
  isCSPFullySolved,
  hasDomainWipeout,
}: ConstraintHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold tracking-tight">
            Consistency Based CSP Solver
          </span>
          <Badge variant="purple">{tutorial.badge}</Badge>
          {isCSPFullySolved && <Badge variant="success">Solved</Badge>}
          {hasDomainWipeout && (
            <Badge variant="destructive">Domain Wipeout</Badge>
          )}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          {problem.description}
        </p>
      </div>

      <div className="flex items-center gap-2.5">
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
      </div>
    </div>
  );
}
