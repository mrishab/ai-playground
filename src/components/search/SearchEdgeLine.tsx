import React from "react";

interface SearchEdgeLineProps {
  fromNode: { x: number; y: number };
  toNode: { x: number; y: number };
  cost: number;
  inPath: boolean;
}

export function SearchEdgeLine({
  fromNode,
  toNode,
  cost,
  inPath,
}: SearchEdgeLineProps) {
  const dx = toNode.x - fromNode.x;
  const dy = toNode.y - fromNode.y;
  const len = Math.hypot(dx, dy) || 1;
  const badgeX = (fromNode.x + toNode.x) / 2 + (-dy / len) * 12;
  const badgeY = (fromNode.y + toNode.y) / 2 + (dx / len) * 12;

  return (
    <g>
      <line
        x1={fromNode.x}
        y1={fromNode.y}
        x2={toNode.x}
        y2={toNode.y}
        className={`transition-colors duration-200 ease-out ${
          inPath ? "stroke-primary" : "stroke-border"
        }`}
        strokeWidth={inPath ? 3.5 : 1.5}
        markerEnd={inPath ? "url(#arrowhead-path)" : "url(#arrowhead)"}
      />
      <rect
        x={badgeX - 12}
        y={badgeY - 9}
        width="24"
        height="18"
        rx="4"
        className="fill-card stroke-border"
        strokeWidth="1"
      />
      <text
        x={badgeX}
        y={badgeY + 3.5}
        textAnchor="middle"
        className="fill-muted-foreground font-semibold font-mono text-[10px]"
      >
        {cost}
      </text>
    </g>
  );
}
