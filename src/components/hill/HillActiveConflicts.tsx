import React from "react";
import { CSPConstraint } from "@/data/cspProblems";
import { VariableAssignment } from "./hillTypes";

interface HillActiveConflictsProps {
  violatedConstraints: CSPConstraint[];
  assignment: VariableAssignment;
}

export function HillActiveConflicts({ violatedConstraints, assignment }: HillActiveConflictsProps) {
  if (violatedConstraints.length === 0) return null;

  return (
    <div className="mt-3 pt-3 border-t border-border/50 text-xs">
      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block mb-1.5">
        Active Conflicts ({violatedConstraints.length})
      </span>
      <div className="flex flex-wrap gap-1.5">
        {violatedConstraints.map((c, i) => (
          <span
            key={`${c.name || c.variables.join("-")}-${i}`}
            className="px-2 py-0.5 rounded-md bg-destructive/10 border border-destructive/25 text-destructive font-mono text-[10px]"
          >
            {c.name || `${c.variables[0]} = ${c.variables[1]} (${assignment[c.variables[0]]})`}
          </span>
        ))}
      </div>
    </div>
  );
}
