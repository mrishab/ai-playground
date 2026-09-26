import React from "react";
import { Gauge } from "lucide-react";
import { Slider } from "./Slider";

interface TimerSpeedBarProps {
  speed: number;
  setSpeed: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
}

export function TimerSpeedBar({
  speed,
  setSpeed,
  min = 100,
  max = 950,
  step = 50,
  label = "Speed",
  className = "w-32",
}: TimerSpeedBarProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="text-[11px] text-muted-foreground whitespace-nowrap flex items-center gap-1 font-medium">
        <Gauge className="h-3 w-3" />
        {label}:
      </span>
      <Slider
        min={min}
        max={max}
        step={step}
        value={speed}
        onChange={setSpeed}
        className="h-1.5"
      />
    </div>
  );
}
