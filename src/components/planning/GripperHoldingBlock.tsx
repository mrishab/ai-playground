import React from "react";
import { BlockItem } from "@/data/planningProblems";

interface GripperHoldingBlockProps {
  holdingBlock: string | null;
  blk?: BlockItem | null;
}

export function GripperHoldingBlock({
  holdingBlock,
  blk,
}: GripperHoldingBlockProps) {
  if (!holdingBlock) return null;

  return (
    <g transform="translate(-25, 78)">
      <rect
        x="0"
        y="0"
        width="50"
        height="42"
        rx="6"
        fill={blk?.color || "#3b82f6"}
        stroke="#f8fafc"
        strokeWidth="2"
      />
      <text
        x="25"
        y="26"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="16"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        {blk?.label || holdingBlock}
      </text>
    </g>
  );
}
