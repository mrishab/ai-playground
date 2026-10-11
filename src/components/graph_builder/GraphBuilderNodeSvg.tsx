import React from "react";
import { SearchNode } from "@/data/searchProblems";

interface GraphBuilderNodeSvgProps {
  node: SearchNode;
  isSelected: boolean;
  isConnectingSource: boolean;
  onMouseDown: (e: React.MouseEvent, node: SearchNode) => void;
  onClick: (e: React.MouseEvent, node: SearchNode) => void;
  onDoubleClick: (node: SearchNode) => void;
}

export function GraphBuilderNodeSvg({
  node,
  isSelected,
  isConnectingSource,
  onMouseDown,
  onClick,
  onDoubleClick,
}: GraphBuilderNodeSvgProps) {
  const strokeColor = node.isStart ? "#10b981" : node.isGoal ? "#f59e0b" : isSelected ? "#3b82f6" : "#64748b";

  return (
    <g
      data-testid={`gb-node-${node.id}`}
      className="cursor-pointer transition-transform select-none"
      onMouseDown={(e) => onMouseDown(e, node)}
      onClick={(e) => onClick(e, node)}
      onDoubleClick={() => onDoubleClick(node)}
    >
      {isConnectingSource && (
        <circle cx={node.x} cy={node.y} r={28} fill="none" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 4" className="animate-spin" />
      )}
      <circle
        cx={node.x}
        cy={node.y}
        r={22}
        fill={isSelected ? "#eff6ff" : "#ffffff"}
        stroke={strokeColor}
        strokeWidth={node.isStart || node.isGoal || isSelected ? 3 : 2}
        className="dark:fill-slate-900 shadow-sm"
      />
      {node.isGoal && (
        <circle cx={node.x} cy={node.y} r={17} fill="none" stroke="#f59e0b" strokeWidth={1.5} />
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
