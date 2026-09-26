import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export function StripsFrameAxiomsCard() {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">
          Explanatory Frame Axioms
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1 text-xs text-muted-foreground space-y-2 leading-relaxed">
        <p>
          In STRIPS-to-CSP, a proposition P can only change value from t to t+1
          if an action that explicitly causes P was executed:
        </p>
        <div className="p-2 rounded bg-secondary/40 font-mono text-[11px] text-cyan-300">
          P_(t+1) = val ↔ (Action_t ∈ Causes(val)) ∨ (P_t = val ∧ Action_t ∉
          Changes(val))
        </div>
      </CardContent>
    </Card>
  );
}
