import React from "react";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OverviewHighlights } from "./OverviewHighlights";

export function OverviewHero({
  onSelectTool,
}: {
  onSelectTool: (toolId: string) => void;
}) {
  return (
    <div className="relative rounded-3xl border border-border bg-gradient-to-b from-card/90 via-card/50 to-background p-6 sm:p-10 shadow-xl overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" />
          Interactive AI Algorithm Studio
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          Interactive Artificial Intelligence <br />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Visual Exploration & Algorithm Suite
          </span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Interactive visualizers, step-by-step execution, and sandboxes
          for core classical and modern AI algorithms.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            size="lg"
            onClick={() => onSelectTool("search")}
            className="gap-2 font-semibold shadow-md"
          >
            Start Exploring: Graph Search
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onSelectTool("exercises")}
            className="gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Practice Exercises
          </Button>
        </div>
      </div>
      <OverviewHighlights />
    </div>
  );
}
