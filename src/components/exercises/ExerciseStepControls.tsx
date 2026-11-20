import React from "react";
import { Play, Pause, StepForward, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TimerSpeedBar } from "../ui/TimerSpeedBar";

interface ExerciseStepControlsProps {
  stepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  onStepForward: () => void;
  onStepBack: () => void;
  onTogglePlay: () => void;
  speed: number;
  setSpeed: (v: number) => void;
}

export function ExerciseStepControls(p: ExerciseStepControlsProps) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <TimerSpeedBar speed={p.speed} setSpeed={p.setSpeed} className="w-24 mr-1" />
      <Button variant="outline" size="sm" onClick={p.onStepBack} disabled={p.stepIndex <= 0} className="h-7 px-2">
        <RotateCcw className="h-3 w-3" />
      </Button>
      <Button variant="outline" size="sm" onClick={p.onTogglePlay} className="h-7 px-2">
        {p.isPlaying ? <Pause className="h-3 w-3 text-amber-500 fill-amber-500" /> : <Play className="h-3 w-3" />}
      </Button>
      <Button variant="outline" size="sm" onClick={p.onStepForward} disabled={p.stepIndex >= p.totalSteps - 1} className="gap-1 h-7 px-2 text-[11px] font-medium">
        <StepForward className="h-3 w-3" />
        Step
      </Button>
      <span className="text-[11px] font-mono text-muted-foreground ml-1">
        {p.stepIndex + 1}/{p.totalSteps}
      </span>
    </div>
  );
}
