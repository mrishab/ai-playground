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
  const midX = (fromNode.x + toNode.x) / 2;
  const midY = (fromNode.y + toNode.y) / 2;

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
        x={midX - 12}
        y={midY - 9}
        width="24"
        height="18"
        rx="4"
        className="fill-card stroke-border"
        strokeWidth="1"
      />
      <text
        x={midX}
        y={midY + 3.5}
        textAnchor="middle"
        className="fill-muted-foreground font-semibold font-mono text-[10px]"
      >
        {cost}
      </text>
    </g>
  );
}
