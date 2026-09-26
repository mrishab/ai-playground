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
        className="fill-sky-600 dark:fill-[#38bdf8] font-bold font-mono text-[10px]"
      >
        = {obsVal}
      </text>
    );
  }
  if (type === "utility") return null;

  return (
    <g transform="translate(-32, 6)">
      <rect x="0" y="0" width="64" height="8" rx="3" className="fill-slate-200 dark:fill-[#1e293b]" />
      <rect
        x="0"
        y="0"
        width={Math.max(2, 64 * pVal1)}
        height="8"
        rx="3"
        fill="#0ea5e9"
        className="transition-[width] duration-300"
      />
      <text
        x="32"
        y="16"
        textAnchor="middle"
        className="fill-slate-600 dark:fill-[#94a3b8] font-mono text-[8px]"
      >
        {(pVal1 * 100).toFixed(0)}% {outcome0?.substring(0, 4)}
      </text>
    </g>
  );
}
