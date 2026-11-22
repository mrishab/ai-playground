import React from "react";
import { HillConflictChartSvg } from "./HillConflictChartSvg";

interface HillConflictChartProps {
  conflictHistory: number[];
  log: string;
}

export function HillConflictChart({ conflictHistory, log }: HillConflictChartProps) {
  const n = conflictHistory.length;

  return (
    <>
      <div className="p-4 bg-card">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-foreground">
            Conflict Trajectory (Violations vs Iterations)
          </span>
          <span className="text-[10px] text-muted-foreground font-mono">
            Step: {Math.max(0, n - 1)}
          </span>
        </div>

        <div className="h-32 w-full bg-canvas rounded-lg border border-border/50 relative overflow-hidden flex items-center justify-center p-1">
          <HillConflictChartSvg conflictHistory={conflictHistory} />
        </div>
      </div>

      <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs text-foreground/90">
        {log}
      </div>
    </>
  );
}
