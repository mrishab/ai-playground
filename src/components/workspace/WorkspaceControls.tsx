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
    <div className="flex flex-wrap items-center gap-1.5" aria-label="Workspace Controls">
      <span title="Global workspace controls (synced with canvas animation)" className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 px-1.5 py-0.5 rounded bg-muted/60 border border-border/50 hidden md:inline-block">
        Workspace Controls
      </span>
      {onStepBack && (
        <Button variant="outline" size="sm" onClick={onStepBack} disabled={!hasStepBack || isPlaying} title="Step Back (Global workspace control)" className="h-8 px-2">
          <SkipBack className="w-3.5 h-3.5" />
        </Button>
      )}
      {onStep && (
        <Button variant="default" size="sm" onClick={onStep} disabled={isDone || isPlaying || !canStep} title={`${stepLabel} (Global workspace control, synced with canvas)`} className="h-8 px-2.5 gap-1 text-xs font-medium">
          <StepForward className="w-3.5 h-3.5" />
          <span>{stepLabel}</span>
        </Button>
      )}
      {onTogglePlay && (
        <Button variant={isPlaying ? "destructive" : "secondary"} size="sm" onClick={onTogglePlay} disabled={isDone} title={`${isPlaying ? "Pause" : "Auto-Run"} (Global workspace control, synced with canvas)`} className="h-8 px-2.5 gap-1 text-xs font-medium min-w-[76px] justify-center">
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isPlaying ? "Pause" : "Auto"}</span>
        </Button>
      )}
      {onReset && (
        <Button variant="ghost" size="sm" onClick={onReset} title="Reset (Global workspace control)" className="h-8 px-2 gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="sr-only sm:inline">Reset</span>
        </Button>
      )}
      {speed !== undefined && setSpeed && (
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-card rounded-lg border border-border text-[11px] text-muted-foreground h-8">
          <span>Speed</span>
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-14 accent-primary cursor-pointer h-1.5"
            aria-label="Speed"
          />
        </div>
      )}
      {extraActions}
    </div>
  );
}
