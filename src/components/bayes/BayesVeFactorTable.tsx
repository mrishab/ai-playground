import React from "react";
import { VeFactor } from "./bayesVeTypes";

export function BayesVeFactorTable({ factor }: { factor?: VeFactor | null }) {
  if (!factor || factor.table.length === 0) return null;
  const rows = factor.table.slice(0, 6);
  return (
    <div className="text-[10px] font-mono bg-background/50 p-2 rounded border border-border/50">
      <div className="font-semibold text-muted-foreground mb-1">{factor.name}:</div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
        {rows.map((r, i) => (
          <div key={i} className="flex justify-between text-muted-foreground">
            <span className="truncate mr-1">{Object.entries(r.assignment).map(([k, v]) => `${k}=${v}`).join(", ") || "∅"}</span>
            <span className="font-semibold text-foreground">{r.value.toFixed(4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
