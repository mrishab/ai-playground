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
            ? "stroke-primary"
            : "stroke-border transition-colors duration-200"
        }
        strokeWidth={isCur ? 2.5 : 1.5}
        strokeDasharray={isCur ? "4 2" : "none"}
      />
      <g transform={`translate(${midX}, ${midY})`}>
        <polygon
          points="0,-12 12,0 0,12 -12,0"
          className={
            isCur
              ? "fill-accent stroke-accent-foreground"
              : "fill-card stroke-border"
          }
          strokeWidth="1.5"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          className={
            isCur
              ? "fill-accent-foreground font-bold font-mono text-[8px]"
              : "fill-muted-foreground font-bold font-mono text-[8px]"
          }
        >
          C
        </text>
      </g>
    </g>
  );
}
