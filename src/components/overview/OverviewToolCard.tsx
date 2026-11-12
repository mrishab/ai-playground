import React from "react";
import { Card } from "@/components/ui/Card";
import { OverviewToolItem } from "./overviewToolsData";

export function OverviewToolCard({
  tool,
  onSelect,
}: {
  tool: OverviewToolItem;
  onSelect: () => void;
}) {
  const Icon = tool.icon;
  return (
    <Card
      onClick={onSelect}
      className="group cursor-pointer border-border/70 bg-card/50 hover:bg-card hover:border-primary/40 transition-colors p-4 shadow-xs"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl border ${tool.color} shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
            {tool.title}
          </h3>
          <span className="text-xs text-muted-foreground">
            {tool.category}
          </span>
        </div>
      </div>
    </Card>
  );
}
