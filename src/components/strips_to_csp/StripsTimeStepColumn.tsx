import React from "react";
import { StripsProblem } from "@/data/stripsProblems";
import { StripsActionTransition } from "./StripsActionTransition";

interface StripsTimeStepColumnProps {
  t: number;
  horizonK: number;
  isSolved: boolean;
  extractedPlan: string[];
  problem: StripsProblem;
  stepFluents?: Record<string, string>[];
}

export function StripsTimeStepColumn(p: StripsTimeStepColumnProps) {
  return (
    <div className="flex-1 min-w-[240px] max-w-[280px] flex flex-col items-center space-y-3 transition-opacity duration-300 ease-out">
      <div className="text-center">
        <span className="px-2.5 py-0.5 rounded-full bg-secondary font-mono text-[10px] text-muted-foreground border border-border">
          Time Step t = {p.t}
        </span>
      </div>

      <div className="w-full space-y-2 p-3 rounded-xl bg-card/80 border border-border/80 shadow-sm">
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
          State Fluents
        </div>
        {p.problem.variables.map((v) => {
          const solvedFluent = p.isSolved && p.stepFluents?.[p.t]?.[v.name];
          const valText = solvedFluent || (p.t === 0 ? v.initial : p.t === p.horizonK && p.isSolved ? v.goal : `D={${v.domain.join(", ")}}`);
          return (
            <div
              key={v.name}
              className="p-1.5 rounded bg-secondary/30 text-[11px] font-mono flex items-center justify-between gap-1.5"
              title={`${v.name}: ${valText}`}
            >
              <span className="text-muted-foreground shrink-0">{v.name}:</span>
              <span className="font-bold text-primary break-words text-right">{valText}</span>
            </div>
          );
        })}
      </div>

      {p.t < p.horizonK && (
        <StripsActionTransition
          t={p.t}
          isSolved={p.isSolved}
          actionText={p.extractedPlan[p.t]}
        />
      )}
    </div>
  );
}
