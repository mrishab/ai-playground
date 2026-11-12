import React from "react";
import { SearchNode } from "@/data/searchProblems";
import { GraphBuilderEdge } from "./graphBuilderTypes";
import { computeEdgePoints } from "./graphBuilderMath";

import { cn } from "@/lib/utils";

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
    <g
      data-testid={`gb-edge-${edge.from}-${edge.to}`}
      className="cursor-pointer group"
      onClick={() => onEdgeClick(edge)}
    >
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        strokeWidth={isSelected ? 3 : 2}
        markerEnd="url(#gb-arrow)"
        className={cn("transition-colors group-hover:stroke-primary", isSelected ? "stroke-primary" : "stroke-muted-foreground/50")}
      />
      <rect
        x={midX - 16}
        y={midY - 10}
        width={32}
        height={20}
        rx={6}
        strokeWidth={1.5}
        className={cn("shadow-xs fill-card", isSelected ? "stroke-primary" : "stroke-border")}
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
