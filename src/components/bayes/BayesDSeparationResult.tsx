import React from "react";

export function BayesDSeparationResult({ result }: { result: string | null }) {
  if (!result) return null;
  return (
    <div className="p-2.5 rounded bg-secondary/50 border border-border/60 text-xs text-foreground/90">
      {result}
    </div>
  );
}
