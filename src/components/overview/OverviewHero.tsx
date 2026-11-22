import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "../ui/Button";

export function OverviewHero({
  onSelectTool,
}: {
  onSelectTool?: (toolId: string) => void;
}) {
  return (
    <div className="py-4 space-y-3">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
            Poole & Mackworth AI Curriculum Companion
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Interactive Artificial Intelligence
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Visual simulation, interactive graph builders, and step-by-step logic engines accompanying <em>Artificial Intelligence: Foundations of Computational Agents</em>.
        </p>
      </div>
      {onSelectTool && (
        <div className="flex items-center gap-3 pt-1">
          <Button
            onClick={() => onSelectTool("search")}
            size="sm"
            className="gap-2 font-semibold shadow-xs"
          >
            Start Here (Graph Search)
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => onSelectTool("exercises")}
            size="sm"
            className="gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Practice Exercises
          </Button>
        </div>
      )}
    </div>
  );
}
