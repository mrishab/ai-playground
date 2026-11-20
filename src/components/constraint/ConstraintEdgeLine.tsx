import React from "react";
import { CSPVariable, CSPConstraint } from "@/data/cspProblems";

interface ConstraintEdgeLineProps {
  v1: CSPVariable;
  v2: CSPVariable;
  constraint?: CSPConstraint;
  isCur: boolean;
}

export function ConstraintEdgeLine({ v1, v2, constraint, isCur }: ConstraintEdgeLineProps) {
  const midX = (v1.x + v2.x) / 2;
  const midY = (v1.y + v2.y) / 2;
  const rawExpr = constraint?.name || `${v1.name} ≠ ${v2.name}`;
  const expr = rawExpr.replace("!=", "≠");
  const symbol = expr.includes("<") ? "<" : expr.includes(">") ? ">" : "≠";

  return (
    <g>
      <title>{expr}</title>
      <line
        x1={v1.x}
        y1={v1.y}
        x2={v2.x}
        y2={v2.y}
        className={isCur ? "stroke-primary" : "stroke-border transition-colors duration-200"}
        strokeWidth={isCur ? 2.5 : 1.5}
        strokeDasharray={isCur ? "4 2" : "none"}
      />
      <g transform={`translate(${midX}, ${midY})`}>
        <polygon
          points="0,-12 12,0 0,12 -12,0"
          className={isCur ? "fill-accent stroke-accent-foreground" : "fill-card stroke-border"}
          strokeWidth="1.5"
        />
        <text
          x="0"
          y="3.5"
          textAnchor="middle"
          className={isCur ? "fill-accent-foreground font-bold font-mono text-[9px]" : "fill-muted-foreground font-bold font-mono text-[9px]"}
        >
          {symbol}
        </text>
        <text
          x="0"
          y="21"
          textAnchor="middle"
          className="fill-foreground/90 font-mono text-[9px] font-semibold select-none"
        >
          {expr}
        </text>
      </g>
    </g>
  );
}
