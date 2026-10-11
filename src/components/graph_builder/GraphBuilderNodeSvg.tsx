import React from "react";
import { SearchNode } from "@/data/searchProblems";

import { cn } from "@/lib/utils";

interface GraphBuilderNodeSvgProps {
  node: SearchNode;
  isSelected: boolean;
  isConnectingSource: boolean;
  onMouseDown: (e: React.MouseEvent, node: SearchNode) => void;
  onClick: (e: React.MouseEvent, node: SearchNode) => void;
  onDoubleClick: (node: SearchNode) => void;
}

export function GraphBuilderNodeSvg({
  node, isSelected, isConnectingSource, onMouseDown, onClick, onDoubleClick,
}: GraphBuilderNodeSvgProps) {
  const strokeClass = node.isStart
    ? "stroke-emerald-500"
    : node.isGoal
      ? "stroke-amber-500"
      : isSelected
        ? "stroke-primary"
        : "stroke-muted-foreground/60";

  return (
    <g
      data-testid={`gb-node-${node.id}`}
      className="cursor-pointer transition-transform select-none"
      onMouseDown={(e) => onMouseDown(e, node)}
      onClick={(e) => onClick(e, node)}
      onDoubleClick={() => onDoubleClick(node)}
    >
      {isConnectingSource && (
        <circle cx={node.x} cy={node.y} r={28} fill="none" strokeWidth={2} strokeDasharray="4 4" className="stroke-primary animate-spin" />
      )}
      <circle
        cx={node.x}
        cy={node.y}
        r={22}
        strokeWidth={node.isStart || node.isGoal || isSelected ? 3 : 2}
        className={cn("transition-colors shadow-xs", isSelected ? "fill-primary/10" : "fill-card", strokeClass)}
      />
      {node.isGoal && (
        <circle cx={node.x} cy={node.y} r={17} fill="none" strokeWidth={1.5} className="stroke-amber-500" />
      )}
      <text x={node.x} y={node.y + 4} textAnchor="middle" className="text-xs font-bold fill-foreground select-none pointer-events-none">
        {node.name}
      </text>
      <text x={node.x} y={node.y - 26} textAnchor="middle" className="text-[10px] font-semibold fill-primary select-none pointer-events-none">
        h={node.h}
      </text>
    </g>
  );
}
