import React from "react";
import { PlanningProblem } from "@/data/planningProblems";
import { GripperHoldingBlock } from "./GripperHoldingBlock";

export function GripperArmSvg({
  gripperColIndex,
  holdingBlock,
  problem,
}: {
  gripperColIndex: number;
  holdingBlock: string | null;
  problem: PlanningProblem;
}) {
  const blk = holdingBlock
    ? problem.blocks.find((b) => b.id === holdingBlock)
    : null;

  return (
    <g
      transform={`translate(${100 + gripperColIndex * 95}, 40)`}
      className="transition-transform duration-300"
    >
      <rect
        x="-8"
        y="0"
        width="16"
        height="60"
        className="fill-muted stroke-border"
        rx="2"
      />
      <rect x="-30" y="60" width="60" height="12" rx="3" className="fill-primary" />
      <rect x="-30" y="72" width="10" height="24" rx="2" className="fill-primary" />
      <rect x="20" y="72" width="10" height="24" rx="2" className="fill-primary" />
      <GripperHoldingBlock holdingBlock={holdingBlock} blk={blk} />
    </g>
  );
}
