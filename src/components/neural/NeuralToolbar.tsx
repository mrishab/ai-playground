import React from "react";
import { NeuralToolbarButtons } from "./NeuralToolbarButtons";
import { NeuralToolbarHint } from "./NeuralToolbarHint";
import { TimerSpeedBar } from "../ui/TimerSpeedBar";

interface NeuralToolbarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStep1: () => void;
  onStep10: () => void;
  onReset: () => void;
  speed: number;
  setSpeed: (v: number) => void;
}

export function NeuralToolbar(p: NeuralToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
      <NeuralToolbarButtons
        isPlaying={p.isPlaying}
        onTogglePlay={p.onTogglePlay}
        onStep1={p.onStep1}
        onStep10={p.onStep10}
        onReset={p.onReset}
      />
      <TimerSpeedBar speed={p.speed} setSpeed={p.setSpeed} />
      <NeuralToolbarHint />
    </div>
  );
}
