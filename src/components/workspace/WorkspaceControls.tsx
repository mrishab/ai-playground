import React from "react";
import { Play, Pause, RotateCcw, StepForward, SkipBack } from "lucide-react";
import { Button } from "../ui/Button";
import { WorkspaceControlsConfig } from "./workspaceTypes";

export function WorkspaceControls({ controls }: { controls?: WorkspaceControlsConfig }) {
  if (!controls) return null;
  const {
    onStep, stepLabel = "Advance", onStepBack, hasStepBack, isPlaying,
    onTogglePlay, onReset, speed, setSpeed, isDone, canStep = true, extraActions,
  } = controls;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {onStepBack && (
        <Button variant="outline" size="sm" onClick={onStepBack} disabled={!hasStepBack || isPlaying} title="Step Back">
          <SkipBack className="w-3.5 h-3.5" />
        </Button>
      )}
      {onStep && (
        <Button variant="default" size="sm" onClick={onStep} disabled={isDone || isPlaying || !canStep} title="Step Algorithm">
          <StepForward className="w-3.5 h-3.5 mr-1" />
          <span>{stepLabel}</span>
        </Button>
      )}
      {onTogglePlay && (
        <Button variant={isPlaying ? "destructive" : "secondary"} size="sm" onClick={onTogglePlay} disabled={isDone} title={isPlaying ? "Pause" : "Auto-Run"}>
          {isPlaying ? <Pause className="w-3.5 h-3.5 mr-1" /> : <Play className="w-3.5 h-3.5 mr-1 fill-current" />}
          <span>{isPlaying ? "Pause" : "Auto"}</span>
        </Button>
      )}
      {onReset && (
        <Button variant="ghost" size="sm" onClick={onReset} title="Reset">
          <RotateCcw className="w-3.5 h-3.5" />
        </Button>
      )}
      {speed !== undefined && setSpeed && (
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-card rounded-lg border border-border text-[11px] text-muted-foreground">
          <span>Speed</span>
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-16 accent-primary cursor-pointer h-1.5"
            aria-label="Speed"
          />
        </div>
      )}
      {extraActions}
    </div>
  );
}
