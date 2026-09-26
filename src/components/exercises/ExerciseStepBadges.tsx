import React from "react";
import { ExerciseStepItem } from "./exerciseStepTypes";

export function ExerciseStepBadges({ step }: { step: ExerciseStepItem }) {
  if (!step.queueOrFrontier && !step.metric) return null;
  return (
    <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
      {step.queueOrFrontier && (
        <span className="px-2 py-0.5 rounded bg-secondary text-foreground">
          {step.queueOrFrontier}
        </span>
      )}
      {step.metric && (
        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">
          {step.metric}
        </span>
      )}
    </div>
  );
}
