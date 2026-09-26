import React from "react";

interface HillConflictChartProps {
  conflictHistory: number[];
  log: string;
}

export function HillConflictChart({
  conflictHistory,
  log,
}: HillConflictChartProps) {
  const points = conflictHistory
    .map((c, i) => `${i * 10},${Math.max(5, 95 - c * 10)}`)
    .join(" ");
  const viewWidth = Math.max(10, conflictHistory.length * 10);

  return (
    <>
      <div className="p-4 bg-card">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-medium text-foreground">
            Conflict Trajectory (Violations vs Iterations)
          </span>
          <span className="text-[10px] text-muted-foreground">
            Last {conflictHistory.length} Steps
          </span>
        </div>

        <div className="h-28 w-full bg-slate-50 dark:bg-[#0b0f19] rounded-lg border border-border/50 relative overflow-hidden flex items-end px-2 pt-2 pb-1">
          {conflictHistory.length > 1 ? (
            <svg
              className="w-full h-full"
              viewBox={`0 0 ${viewWidth} 100`}
              preserveAspectRatio="none"
            >
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                points={points}
              />
            </svg>
          ) : (
            <div className="w-full text-center text-xs text-muted-foreground py-8">
              Run steps to generate conflict convergence plot.
            </div>
          )}
        </div>
      </div>

      <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs text-foreground/90">
        {log}
      </div>
    </>
  );
}
