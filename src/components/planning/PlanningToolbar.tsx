import React from "react";
import { PlanningControlButtons } from "./PlanningControlButtons";
import { TimerSpeedBar } from "../ui/TimerSpeedBar";

interface PlanningToolbarProps {
  isExecuting: boolean;
  onToggleExecute: () => void;
  onStep: () => void;
  onReset: () => void;
  currentStepIndex: number;
  totalSteps: number;
  speed: number;
  setSpeed: (v: number) => void;
}

export function PlanningToolbar(p: PlanningToolbarProps) {
  const isDone = p.currentStepIndex >= p.totalSteps;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs" aria-label="Planning Canvas Controls">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 px-1.5 py-0.5 rounded bg-secondary/80 border border-border/50 hidden sm:inline-block">
          Canvas Controls
        </span>
        <PlanningControlButtons
          isExecuting={p.isExecuting}
          isDone={isDone}
          onToggleExecute={p.onToggleExecute}
          onStep={p.onStep}
          onReset={p.onReset}
        />
      </div>
      <TimerSpeedBar speed={p.speed} setSpeed={p.setSpeed} />
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-[11px]">Progress:</span>
        <span className="font-mono text-xs font-bold text-primary">
          {p.currentStepIndex} / {p.totalSteps}
        </span>
      </div>
    </div>
  );
}
