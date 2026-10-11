import React from "react";
import { SearchNode } from "@/data/searchProblems";

interface GraphBuilderRubberbandProps {
  sourceNode: SearchNode | null;
  pointerPos: { x: number; y: number } | null;
}

export function GraphBuilderRubberband({
  sourceNode,
  pointerPos,
}: GraphBuilderRubberbandProps) {
  if (!sourceNode || !pointerPos) return null;

  return (
    <line
      x1={sourceNode.x}
      y1={sourceNode.y}
      x2={pointerPos.x}
      y2={pointerPos.y}
      strokeWidth={2}
      strokeDasharray="5 5"
      markerEnd="url(#gb-arrow)"
      className="stroke-primary pointer-events-none"
    />
  );
}
