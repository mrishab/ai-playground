import React from "react";
import { CSPVariable } from "@/data/cspProblems";

interface ConstraintEdgeLineProps {
  v1: CSPVariable;
  v2: CSPVariable;
  isCur: boolean;
}

export function ConstraintEdgeLine({ v1, v2, isCur }: ConstraintEdgeLineProps) {
  const midX = (v1.x + v2.x) / 2;
  const midY = (v1.y + v2.y) / 2;

  return (
    <g>
      <line
        x1={v1.x}
        y1={v1.y}
        x2={v2.x}
        y2={v2.y}
        className={
          isCur
            ? "stroke-purple-500"
            : "stroke-slate-300 dark:stroke-slate-700 transition-colors duration-200"
        }
        strokeWidth={isCur ? 2.5 : 1.5}
        strokeDasharray={isCur ? "4 2" : "none"}
      />
      <g transform={`translate(${midX}, ${midY})`}>
        <polygon
          points="0,-12 12,0 0,12 -12,0"
          className={
            isCur
              ? "fill-purple-100 dark:fill-purple-950 stroke-purple-500 dark:stroke-purple-400"
              : "fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-600"
          }
          strokeWidth="1.5"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          className={
            isCur
              ? "fill-purple-700 dark:fill-purple-300 font-bold font-mono text-[8px]"
              : "fill-slate-600 dark:fill-slate-300 font-bold font-mono text-[8px]"
          }
        >
          C
        </text>
      </g>
    </g>
  );
}
