import React from "react";
import { OVERVIEW_TOOLS } from "./overviewToolsData";
import { OverviewHero } from "./OverviewHero";
import { OverviewToolCard } from "./OverviewToolCard";

export function OverviewView({
  onSelectTool,
}: {
  onSelectTool: (toolId: string) => void;
}) {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <OverviewHero onSelectTool={onSelectTool} />
      <div className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Interactive AI Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {OVERVIEW_TOOLS.map((tool) => (
            <OverviewToolCard
              key={tool.id}
              tool={tool}
              onSelect={() => onSelectTool(tool.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
