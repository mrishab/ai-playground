import React from "react";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function RobotControlButtons({
  isPlaying,
  isComplete,
  onTogglePlay,
  onStep,
  onReset,
}: {
  isPlaying: boolean;
  isComplete: boolean;
  onTogglePlay: () => void;
  onStep: () => void;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isPlaying ? "destructive" : "default"}
        size="sm"
        onClick={onTogglePlay}
        disabled={isComplete}
        className="gap-1.5 h-8 font-semibold"
      >
        {isPlaying ? (
          <Pause className="h-3.5 w-3.5 fill-current" />
        ) : (
          <Play className="h-3.5 w-3.5 fill-current" />
        )}
        {isPlaying ? "Pause" : "Run Robot"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onStep}
        disabled={isPlaying || isComplete}
        className="gap-1.5 h-8"
      >
        <SkipForward className="h-3.5 w-3.5" />
        Step Cycle
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset
      </Button>
    </div>
  );
}
