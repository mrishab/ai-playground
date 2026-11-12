import React from "react";

interface SearchNodeHaloSvgProps {
  x: number;
  y: number;
  isCurrent: boolean;
  isGoal: boolean;
}

export function SearchNodeHaloSvg({
  x,
  y,
  isCurrent,
  isGoal,
}: SearchNodeHaloSvgProps) {
  return (
    <>
      {isCurrent && (
        <circle
          cx={x}
          cy={y}
          r="28"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          opacity="0.6"
          className="transition-opacity duration-200 pointer-events-none"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      )}
      {isGoal && (
        <circle
          cx={x}
          cy={y}
          r="23"
          fill="none"
          stroke="hsl(var(--accent-foreground))"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          className="pointer-events-none"
        />
      )}
    </>
  );
}
