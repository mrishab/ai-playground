import React from "react";

export function SearchGraphLegend() {
  return (
    <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur px-3 py-1.5 rounded-lg border border-border/60 text-[10px] flex items-center gap-3 text-muted-foreground">
      <span className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />{" "}
        Start
      </span>
      <span className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block" />{" "}
        Goal
      </span>
      <span className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-accent inline-block" />{" "}
        Frontier
      </span>
      <span className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-muted inline-block" />{" "}
        Explored
      </span>
      <span className="flex items-center gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-foreground inline-block" />{" "}
        Current
      </span>
    </div>
  );
}
