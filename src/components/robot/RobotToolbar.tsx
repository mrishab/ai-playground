import React from "react";
import { RobotWorld } from "@/data/robotProblems";
import { RobotControlButtons } from "./RobotControlButtons";
import { RobotWaypointBadge } from "./RobotWaypointBadge";
import { TimerSpeedBar } from "../ui/TimerSpeedBar";

interface RobotToolbarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStep: () => void;
  onReset: () => void;
  currentPlanIndex: number;
  world: RobotWorld;
  speed: number;
  setSpeed: (v: number) => void;
}

export function RobotToolbar(p: RobotToolbarProps) {
  const isComplete = p.currentPlanIndex >= p.world.plan.length;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs" aria-label="Robot Canvas Controls">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 px-1.5 py-0.5 rounded bg-secondary/80 border border-border/50 hidden sm:inline-block">
          Canvas Controls
        </span>
        <RobotControlButtons
          isPlaying={p.isPlaying}
          isComplete={isComplete}
          onTogglePlay={p.onTogglePlay}
          onStep={p.onStep}
          onReset={p.onReset}
        />
      </div>
      <TimerSpeedBar speed={p.speed} setSpeed={p.setSpeed} />
      <RobotWaypointBadge world={p.world} currentPlanIndex={p.currentPlanIndex} />
    </div>
  );
}
