import React from "react";
import { Slider } from "../ui/Slider";

interface LabeledSliderProps {
  label: string;
  value: string;
  colorClass: string;
  min: number;
  max: number;
  step: number;
  numValue: number;
  onChange: (v: number) => void;
}

export function LabeledSlider({
  label,
  value,
  colorClass,
  min,
  max,
  step,
  numValue,
  onChange,
}: LabeledSliderProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-mono font-bold ${colorClass}`}>{value}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={numValue}
        onChange={onChange}
      />
    </div>
  );
}
