import React from "react";
import { Play, Pause, StepForward, FastForward, RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";

interface DTreeActionButtonsProps {
  onAutoBuild: () => void;
  onReset: () => void;
  onStepId3: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  canStep: boolean;
  algo?: string;
}

export function DTreeActionButtons(p: DTreeActionButtonsProps) {
  const algoLabel = (p.algo || "id3").toUpperCase();
  return (
    <div className="flex items-center gap-1.5">
      <Button variant="outline" size="sm" onClick={p.onStepId3} disabled={!p.canStep} className="gap-1 h-8 text-xs font-medium">
        <StepForward className="h-3.5 w-3.5" />
        Step ({algoLabel})
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={p.onTogglePlay}
        disabled={!p.canStep}
        className="gap-1 h-8 px-2.5 text-xs font-medium transition-colors duration-150"
        title={p.isPlaying ? "Pause auto-build" : "Play (Auto-Build)"}
        aria-label={p.isPlaying ? "Pause auto-build" : "Play (Auto-Build)"}
      >
        {p.isPlaying ? <Pause className="h-3.5 w-3.5 text-primary fill-primary" /> : <Play className="h-3.5 w-3.5 fill-current" />}
        <span>{p.isPlaying ? "Pause" : "Play (Auto-Build)"}</span>
      </Button>
      <Button variant="default" size="sm" onClick={p.onAutoBuild} className="gap-1.5 h-8 font-semibold">
        <FastForward className="h-3.5 w-3.5 fill-current" />
        Auto-Build Full Tree ({algoLabel})
      </Button>
      <Button variant="ghost" size="sm" onClick={p.onReset} className="gap-1 h-8 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">
        <RotateCcw className="h-3.5 w-3.5" />
        Reset
      </Button>
    </div>
  );
}
