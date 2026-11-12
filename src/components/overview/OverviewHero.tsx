import React from "react";

export function OverviewHero({
  onSelectTool: _onSelectTool,
}: {
  onSelectTool?: (toolId: string) => void;
}) {
  return (
    <div className="py-4 space-y-1.5">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
        Interactive Artificial Intelligence
      </h1>
      <p className="text-sm text-muted-foreground">
        Visual simulation and interactive builders for core AI algorithms.
      </p>
    </div>
  );
}
