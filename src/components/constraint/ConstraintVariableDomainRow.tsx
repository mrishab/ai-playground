import React from "react";
import { CSPVariable } from "@/data/cspProblems";

interface ConstraintVariableDomainRowProps {
  variable: CSPVariable;
  currentVals: string[];
}

export function ConstraintVariableDomainRow({
  variable: v,
  currentVals,
}: ConstraintVariableDomainRowProps) {
  const currentValsSet = new Set(currentVals);

  return (
    <div className="p-2.5 rounded-lg bg-secondary/30 border border-border/50 space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-foreground">{v.name}</span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {currentVals.length} / {v.domain.length} values
        </span>
      </div>
      <div className="flex flex-wrap gap-1 pt-1">
        {v.domain.map((val) => {
          const isPruned = !currentValsSet.has(val);
            return (
              <span
                key={val}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors duration-200 ease-out ${
                  isPruned
                    ? "bg-destructive/10 text-destructive/50 line-through"
                    : currentVals.length === 1
                    ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30"
                    : "bg-primary/10 text-primary border border-primary/20"
              }`}
            >
              {val}
            </span>
          );
        })}
      </div>
    </div>
  );
}
