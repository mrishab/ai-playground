import React from "react";
import { PLANNING_PROBLEMS } from "@/data/planningProblems";

interface PlanningSelectsProps {
  selectedProblemId: string;
  onSelectProblemId: (id: string) => void;
  plannerType: "forward" | "regression";
  onSelectPlannerType: (type: "forward" | "regression") => void;
}

export function PlanningSelects({
  selectedProblemId,
  onSelectProblemId,
  plannerType,
  onSelectPlannerType,
}: PlanningSelectsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <select
        aria-label="Select Planning Problem"
        value={selectedProblemId}
        onChange={(e) => onSelectProblemId(e.target.value)}
        className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {Object.values(PLANNING_PROBLEMS).map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <select
        aria-label="Select Planner Type"
        value={plannerType}
        onChange={(e) => onSelectPlannerType(e.target.value as any)}
        className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="forward">Forward Search (Progression)</option>
        <option value="regression">Goal Regression (Backward)</option>
      </select>
    </div>
  );
}
