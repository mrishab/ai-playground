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
          stroke="#60a5fa"
          strokeWidth="2"
          opacity="0.6"
          className="animate-pulse"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      )}
      {isGoal && (
        <circle
          cx={x}
          cy={y}
          r="23"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
      )}
    </>
  );
}
