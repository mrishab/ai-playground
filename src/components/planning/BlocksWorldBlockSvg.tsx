import React from "react";
import { BlockItem } from "@/data/planningProblems";

interface BlocksWorldBlockSvgProps {
  blockId: string;
  blk?: BlockItem;
  colX: number;
  stackIdx: number;
}

export function BlocksWorldBlockSvg({
  blockId,
  blk,
  colX,
  stackIdx,
}: BlocksWorldBlockSvgProps) {
  const blockY = 300 - (stackIdx + 1) * 44;

  return (
    <g
      transform={`translate(${colX - 25}, ${blockY})`}
      className="transition-transform duration-300 ease-out"
    >
      <rect
        x="0"
        y="0"
        width="50"
        height="44"
        rx="6"
        fill={blk?.color || "#3b82f6"}
        stroke="#ffffff"
        strokeWidth="1.5"
        className="shadow-md transition-transform duration-300"
      />
      <text
        x="25"
        y="28"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="16"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        {blk?.label || blockId}
      </text>
    </g>
  );
}
