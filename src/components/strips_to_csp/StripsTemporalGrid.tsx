import React from "react";
import { Card } from "@/components/ui/Card";
import { StripsProblem } from "@/data/stripsProblems";
import { StripsTimeStepColumn } from "./StripsTimeStepColumn";
import { StripsHorizonToolbar } from "./StripsHorizonToolbar";

interface StripsTemporalGridProps {
  horizonK: number;
  setHorizonK: (k: number) => void;
  isSolved: boolean;
  extractedPlan: string[];
  problem: StripsProblem;
  log: string;
  onStepForward: () => void;
  onReset: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: number;
  setSpeed: (v: number) => void;
}

export function StripsTemporalGrid(p: StripsTemporalGridProps) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <StripsHorizonToolbar
        horizonK={p.horizonK}
        setHorizonK={p.setHorizonK}
        onStepForward={p.onStepForward}
        onReset={p.onReset}
        isPlaying={p.isPlaying}
        onTogglePlay={p.onTogglePlay}
        isSolved={p.isSolved}
        speed={p.speed}
        setSpeed={p.setSpeed}
      />
      <div className="p-6 bg-slate-50 dark:bg-[#070a13] overflow-x-auto min-h-[340px]">
        <div className="flex items-start gap-4 min-w-[550px]">
          {Array.from({ length: p.horizonK + 1 }).map((_, t) => (
            <StripsTimeStepColumn
              key={t}
              t={t}
              horizonK={p.horizonK}
              isSolved={p.isSolved}
              extractedPlan={p.extractedPlan}
              problem={p.problem}
            />
          ))}
        </div>
      </div>
      <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs text-foreground/90">
        {p.log}
      </div>
    </Card>
  );
}
