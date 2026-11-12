import React from "react";
import { cn } from "@/lib/utils";

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className,
  ...props
}: {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className={cn(
        "w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none transition-colors duration-150",
        className,
      )}
      {...props}
    />
  );
}
