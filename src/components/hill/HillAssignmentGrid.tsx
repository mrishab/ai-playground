import React from "react";
import { Badge } from "../ui/Badge";
import { CSPProblem } from "@/data/cspProblems";
import { VariableAssignment } from "./hillTypes";

interface HillAssignmentGridProps {
  problem: CSPProblem;
  assignment: VariableAssignment;
  conflicts: number;
  stepCount: number;
}

export function HillAssignmentGrid({
  problem,
  assignment,
  conflicts,
  stepCount,
}: HillAssignmentGridProps) {
  return (
    <div className="p-4 bg-slate-50 dark:bg-[#070a13] border-b border-border">
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="text-muted-foreground font-semibold">
          Total Assignment State
        </span>
        <div className="flex items-center gap-2">
          <Badge
            variant={conflicts === 0 ? "success" : "destructive"}
            className="font-mono"
          >
            {conflicts} Violated Constraints
          </Badge>
          <span className="text-[11px] text-muted-foreground font-mono">
            Step: {stepCount}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
        {problem.variables.map((v) => (
          <div
            key={v.name}
            className="p-3 rounded-xl bg-card border border-border/80 flex flex-col items-center justify-center space-y-1 shadow-sm transition-colors duration-300 ease-out"
          >
            <span className="text-xs font-semibold text-muted-foreground">
              {v.name}
            </span>
            <span className="text-base font-bold font-mono text-primary">
              {assignment[v.name] || "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
