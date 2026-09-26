import React from "react";
import { PlanningProblem } from "@/data/planningProblems";
import { Badge } from "@/components/ui/Badge";
import { PlanningSelects } from "./PlanningSelects";

export function PlanningHeader({
  problem,
  selectedProblemId,
  onSelectProblemId,
  plannerType,
  onSelectPlannerType,
  isGoalAchieved,
  badgeText,
}: {
  problem: PlanningProblem;
  selectedProblemId: string;
  onSelectProblemId: (id: string) => void;
  plannerType: "forward" | "regression";
  onSelectPlannerType: (type: "forward" | "regression") => void;
  isGoalAchieved: boolean;
  badgeText: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
      {/* react-doctor-disable-next-line react-doctor/duplicate-jsx-subtree */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold tracking-tight">
            STRIPS Planning Lab (Blocks World)
          </span>
          <Badge variant="cyan">{badgeText}</Badge>
          {isGoalAchieved && <Badge variant="success">Goal Achieved</Badge>}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          {problem.description}
        </p>
      </div>

      <PlanningSelects
        selectedProblemId={selectedProblemId}
        onSelectProblemId={onSelectProblemId}
        plannerType={plannerType}
        onSelectPlannerType={onSelectPlannerType}
      />
    </div>
  );
}
