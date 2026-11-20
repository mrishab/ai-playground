import React from "react";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ButtonsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStep1: () => void;
  onStep10: () => void;
  onReset: () => void;
}

export function NeuralToolbarButtons(p: ButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="default" size="sm" onClick={p.onStep1} disabled={p.isPlaying} className="gap-1.5 h-8 font-semibold">
        <SkipForward className="h-3.5 w-3.5" />
        Step (1 Epoch)
      </Button>

      <Button
        variant={p.isPlaying ? "destructive" : "secondary"}
        size="sm"
        onClick={p.onTogglePlay}
        className="gap-1.5 h-8 font-semibold"
      >
        {p.isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
        {p.isPlaying ? "Pause" : "Auto Train"}
      </Button>

      <Button variant="outline" size="sm" onClick={p.onStep10} disabled={p.isPlaying} className="gap-1.5 h-8 text-xs">
        +10 Epochs
      </Button>

      <Button variant="ghost" size="sm" onClick={p.onReset} className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">
        <RotateCcw className="h-3.5 w-3.5" />
        Reset
      </Button>
    </div>
  );
}
