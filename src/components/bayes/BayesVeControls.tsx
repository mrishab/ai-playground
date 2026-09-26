import React from "react";
import { Play, Pause, StepForward, RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";
import { TimerSpeedBar } from "../ui/TimerSpeedBar";

interface BayesVeControlsProps {
  queryVar: string;
  setQueryVar: (v: string) => void;
  availableNodes: Array<{ id: string; name: string }>;
  stepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  onStepForward: () => void;
  onStepBack: () => void;
  onTogglePlay: () => void;
  speed: number;
  setSpeed: (v: number) => void;
}

export function BayesVeControls(p: BayesVeControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground font-medium">Query:</span>
        <select
          aria-label="Query Variable"
          value={p.queryVar}
          onChange={(e) => p.setQueryVar(e.target.value)}
          className="h-8 px-2 rounded border border-input bg-background text-xs font-mono"
        >
          {p.availableNodes.map((n) => (
            <option key={n.id} value={n.id}>{n.name}</option>
          ))}
        </select>
      </div>

      <TimerSpeedBar speed={p.speed} setSpeed={p.setSpeed} />

      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="sm" onClick={p.onStepBack} disabled={p.stepIndex <= 0} className="h-8 px-2">
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <Button variant="outline" size="sm" onClick={p.onTogglePlay} className="h-8 px-2">
          {p.isPlaying ? <Pause className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> : <Play className="h-3.5 w-3.5" />}
        </Button>
        <Button variant="outline" size="sm" onClick={p.onStepForward} disabled={p.stepIndex >= p.totalSteps - 1} className="gap-1 h-8 text-xs font-medium">
          <StepForward className="h-3.5 w-3.5" />
          Step VE
        </Button>
        <span className="text-[11px] font-mono text-muted-foreground ml-1">
          {p.stepIndex + 1}/{p.totalSteps}
        </span>
      </div>
    </div>
  );
}
