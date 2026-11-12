import React from "react";
import { Badge } from "@/components/ui/Badge";
import { ActionStep } from "./planningTypes";

interface PlanningPlanStepItemProps {
  step: ActionStep;
  idx: number;
  isDone: boolean;
  isCurrent: boolean;
}

export function PlanningPlanStepItem({
  step,
  idx,
  isDone,
  isCurrent,
}: PlanningPlanStepItemProps) {
  return (
    <div
      className={`p-2.5 rounded-lg border transition-colors duration-150 ease-out ${
        isCurrent
          ? "bg-primary/20 border-primary text-primary font-bold"
          : isDone
            ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300"
            : "bg-secondary/30 border-border/50 text-muted-foreground"
      }`}
    >
      <div className="flex items-center justify-between font-mono text-[11px]">
        <span>
          {idx + 1}. {step.name}({step.args.join(", ")})
        </span>
        {isDone && <span className="text-[10px] text-emerald-400">Done</span>}
        {isCurrent && (
          <Badge variant="default" className="text-[9px] py-0">
            Current
          </Badge>
        )}
      </div>
      <div className="text-[10px] text-slate-400 mt-0.5">
        {step.description}
      </div>
    </div>
  );
}
