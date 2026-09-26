import React from "react";
import { Card } from "@/components/ui/Card";
import { RobotToolbar } from "./RobotToolbar";
import { RobotArenaSvg } from "./RobotArenaSvg";
import { RobotWorld, RobotPose } from "@/data/robotProblems";

interface RobotCanvasCardProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStep: () => void;
  onReset: () => void;
  currentPlanIndex: number;
  world: RobotWorld;
  robotPose: RobotPose;
  breadcrumbs: { x: number; y: number }[];
  log: string;
  speed: number;
  setSpeed: (v: number) => void;
}

export function RobotCanvasCard(p: RobotCanvasCardProps) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <RobotToolbar
        isPlaying={p.isPlaying}
        onTogglePlay={p.onTogglePlay}
        onStep={p.onStep}
        onReset={p.onReset}
        currentPlanIndex={p.currentPlanIndex}
        world={p.world}
        speed={p.speed}
        setSpeed={p.setSpeed}
      />
      <RobotArenaSvg
        world={p.world}
        robotPose={p.robotPose}
        breadcrumbs={p.breadcrumbs}
        currentPlanIndex={p.currentPlanIndex}
      />
      <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs text-foreground/90">
        {p.log}
      </div>
    </Card>
  );
}
