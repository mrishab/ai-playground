import React from "react";
import { Clock, Play, Pause, StepForward, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";
import { TimerSpeedBar } from "../ui/TimerSpeedBar";

interface StripsHorizonToolbarProps {
  horizonK: number;
  setHorizonK: (k: number) => void;
  onStepForward: () => void;
  onReset: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  isSolved: boolean;
  speed: number;
  setSpeed: (v: number) => void;
  problemId?: string;
}

export function StripsHorizonToolbar(p: StripsHorizonToolbarProps) {
  const isStepDisabled = p.horizonK >= 4;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-secondary/30 border-b border-border text-xs">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        <span className="font-semibold text-foreground">Planning Horizon (k):</span>
        <span className="font-mono text-base font-bold text-primary mr-1">{p.horizonK}</span>
        <Button variant="outline" size="sm" onClick={p.onReset} className="h-8 px-2" title="Reset to k=0">
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <Button variant="outline" size="sm" onClick={p.onTogglePlay} className="h-8 px-2">
          {p.isPlaying ? <Pause className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> : <Play className="h-3.5 w-3.5" />}
        </Button>
        <Button variant="outline" size="sm" onClick={p.onStepForward} disabled={isStepDisabled} className="gap-1 h-8 text-xs font-medium">
          <StepForward className="h-3.5 w-3.5" />
          Step Horizon
        </Button>
      </div>
      <TimerSpeedBar speed={p.speed} setSpeed={p.setSpeed} />
      <div className="flex items-center gap-2 w-32">
        <Slider min={0} max={4} step={1} value={p.horizonK} onChange={p.setHorizonK} />
      </div>
    </div>
  );
}
