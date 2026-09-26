import React from "react";

export function BayesGraphLegend() {
  return (
    <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur px-3 py-1.5 rounded-lg border border-border/60 text-[10px] flex items-center gap-3 text-muted-foreground">
      <span className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />{" "}
        Chance Node
      </span>
      <span className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />{" "}
        Decision Node
      </span>
      <span className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rotate-45 bg-purple-500 inline-block" />{" "}
        Utility Node
      </span>
    </div>
  );
}
