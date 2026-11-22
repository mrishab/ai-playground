import React from "react";
import { SubstitutionMap } from "./deductionTypes";

export function ProofAnswerBox({
  log,
  answers,
}: {
  log: string;
  answers: SubstitutionMap[];
}) {
  return (
    <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs space-y-2">
      <div className="text-foreground/90">{log}</div>
      {answers.length > 0 && (
        <div className="mt-2 space-y-1">
          <span className="font-semibold text-primary">
            Computed Bindings:
          </span>
          {answers.map((ans, idx) => (
            <div
              key={idx}
              className="px-2 py-1 bg-primary/10 rounded border border-primary/20 text-primary"
            >
              {Object.keys(ans).length > 0
                ? Object.entries(ans)
                    .map(([k, v]) => `${k} = ${v}`)
                    .join(", ")
                : "true (No variables bound)"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
