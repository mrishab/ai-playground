import React from "react";

interface BayesNodeProbBarProps {
  isObserved: boolean;
  obsVal: string | null | undefined;
  type?: "chance" | "decision" | "utility";
  pVal1: number;
  outcome0?: string;
}

export function BayesNodeProbBar({
  isObserved,
  obsVal,
  type,
  pVal1,
  outcome0,
}: BayesNodeProbBarProps) {
  if (isObserved) {
    return (
      <text
        x="0"
        y="12"
        textAnchor="middle"
        className="fill-primary font-bold font-mono text-[10px]"
      >
        = {obsVal}
      </text>
    );
  }
  if (type === "utility") return null;

  return (
    <g transform="translate(-32, 6)">
      <rect x="0" y="0" width="64" height="8" rx="3" className="fill-muted" />
      <rect
        x="0"
        y="0"
        width={Math.max(2, 64 * pVal1)}
        height="8"
        rx="3"
        className="fill-primary transition-opacity duration-200"
      />
      <text
        x="32"
        y="16"
        textAnchor="middle"
        className="fill-muted-foreground font-mono text-[8px]"
      >
        {(pVal1 * 100).toFixed(0)}% {outcome0}
      </text>
    </g>
  );
}
