import React from "react";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";

interface HillToolbarButtonsProps {
  isPlaying: boolean;
  conflicts: number;
  onTogglePlay: () => void;
  onStep: () => void;
  onReset: () => void;
}

export function HillToolbarButtons({
  isPlaying,
  conflicts,
  onTogglePlay,
  onStep,
  onReset,
}: HillToolbarButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isPlaying ? "destructive" : "default"}
        size="sm"
        onClick={onTogglePlay}
        disabled={conflicts === 0}
        className="gap-1.5 h-8 font-semibold"
      >
        {isPlaying ? (
          <Pause className="h-3.5 w-3.5 fill-current" />
        ) : (
          <Play className="h-3.5 w-3.5 fill-current" />
        )}
        {isPlaying ? "Pause" : "Auto Search"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onStep}
        disabled={isPlaying || conflicts === 0}
        className="gap-1.5 h-8"
      >
        <SkipForward className="h-3.5 w-3.5" /> Step
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground"
      >
        <RotateCcw className="h-3.5 w-3.5" /> Random Restart
      </Button>
    </div>
  );
}
