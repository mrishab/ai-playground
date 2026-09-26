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
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            Computed Bindings:
          </span>
          {answers.map((ans, idx) => (
            <div
              key={idx}
              className="px-2 py-1 bg-emerald-50 dark:bg-emerald-950/30 rounded border border-emerald-200 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-200"
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
