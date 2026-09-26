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
        className={`transition-[stroke,stroke-width] duration-300 ease-out ${
          inPath
            ? "stroke-emerald-500"
            : "stroke-slate-300 dark:stroke-slate-600"
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
        className="fill-white dark:fill-[#0f172a] stroke-slate-300 dark:stroke-slate-700"
        strokeWidth="1"
      />
      <text
        x={midX}
        y={midY + 3.5}
        textAnchor="middle"
        className="fill-slate-600 dark:fill-slate-300 font-semibold font-mono text-[10px]"
      >
        {cost}
      </text>
    </g>
  );
}
