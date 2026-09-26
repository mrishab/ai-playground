import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
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
      className="group cursor-pointer border-border/80 bg-card/60 hover:bg-card hover:border-primary/50 transition-colors p-5 shadow-sm space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border ${tool.color}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
              {tool.title}
            </h3>
            <span className="text-[11px] text-muted-foreground">
              {tool.category}
            </span>
          </div>
        </div>
        <Badge variant="outline" className="text-[10px]">
          {tool.badge}
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {tool.algorithms.map((a) => (
          <span
            key={a}
            className="px-2 py-0.5 rounded-md bg-secondary/60 text-[10px] font-mono text-foreground/80 border border-border/40"
          >
            {a}
          </span>
        ))}
      </div>
    </Card>
  );
}
