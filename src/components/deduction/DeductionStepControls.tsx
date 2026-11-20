import React from "react";
import { Play, Pause, StepForward, RotateCcw, FastForward } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TimerSpeedBar } from "../ui/TimerSpeedBar";

export interface DeductionStepControlsProps {
  stepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  onStepForward: () => void;
  onStepBack: () => void;
  onTogglePlay: () => void;
  speed: number;
  setSpeed: (v: number) => void;
  onNextAnswer?: () => void;
}

export function DeductionStepControls(p: DeductionStepControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-1.5">
      <div className="flex items-center gap-1.5">
        <TimerSpeedBar speed={p.speed} setSpeed={p.setSpeed} className="w-24 mr-1" />
        <Button variant="outline" size="sm" onClick={p.onStepBack} disabled={p.stepIndex <= 0} title="Step Back" className="h-8 px-2">
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <Button variant="outline" size="sm" onClick={p.onTogglePlay} title={p.isPlaying ? "Pause" : "Auto-run"} className="h-8 px-2">
          {p.isPlaying ? <Pause className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> : <Play className="h-3.5 w-3.5" />}
        </Button>
        <Button variant="outline" size="sm" onClick={p.onStepForward} disabled={p.totalSteps > 0 && p.stepIndex >= p.totalSteps - 1} title="Step" className="gap-1 h-8 px-2 text-xs font-medium">
          <StepForward className="h-3.5 w-3.5" />
          Step
        </Button>
        {p.onNextAnswer && (
          <Button variant="outline" size="sm" onClick={p.onNextAnswer} title="Next Answer" className="gap-1 h-8 px-2 text-xs font-medium">
            <FastForward className="h-3.5 w-3.5 text-primary" />
            Next Ans
          </Button>
        )}
      </div>
      {p.totalSteps > 0 && (
        <span className="text-[11px] font-mono text-muted-foreground ml-1 shrink-0">
          {p.stepIndex + 1}/{p.totalSteps}
        </span>
      )}
    </div>
  );
}
