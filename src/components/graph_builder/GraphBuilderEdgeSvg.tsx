import React from "react";
import { SearchNode } from "@/data/searchProblems";
import { GraphBuilderEdge } from "./graphBuilderTypes";
import { computeEdgePoints } from "./graphBuilderMath";

interface GraphBuilderEdgeSvgProps {
  edge: GraphBuilderEdge;
  fromNode: SearchNode;
  toNode: SearchNode;
  isSelected: boolean;
  onEdgeClick: (edge: GraphBuilderEdge) => void;
}

export function GraphBuilderEdgeSvg({
  edge, fromNode, toNode, isSelected, onEdgeClick,
}: GraphBuilderEdgeSvgProps) {
  const { startX, startY, endX, endY, midX, midY } = computeEdgePoints(
    fromNode.x, fromNode.y, toNode.x, toNode.y,
  );

  return (
    <g className="cursor-pointer group" onClick={() => onEdgeClick(edge)}>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={isSelected ? "#3b82f6" : "#94a3b8"}
        strokeWidth={isSelected ? 3 : 2}
        markerEnd="url(#gb-arrow)"
        className="transition-colors group-hover:stroke-primary"
      />
      <rect
        x={midX - 16}
        y={midY - 10}
        width={32}
        height={20}
        rx={6}
        fill="#ffffff"
        stroke={isSelected ? "#3b82f6" : "#cbd5e1"}
        strokeWidth={1.5}
        className="dark:fill-slate-800 shadow-sm"
      />
      <text
        x={midX}
        y={midY + 4}
        textAnchor="middle"
        className="text-[11px] font-semibold fill-foreground pointer-events-none select-none"
      >
        {edge.cost}
      </text>
    </g>
  );
}
