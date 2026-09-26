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
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
      <PlanningControlButtons
        isExecuting={p.isExecuting}
        isDone={isDone}
        onToggleExecute={p.onToggleExecute}
        onStep={p.onStep}
        onReset={p.onReset}
      />
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
