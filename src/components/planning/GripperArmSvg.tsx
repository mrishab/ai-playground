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
        className="fill-slate-300 dark:fill-[#475569] stroke-slate-400 dark:stroke-[#64748b]"
        rx="2"
      />
      <rect x="-30" y="60" width="60" height="12" rx="3" fill="#0ea5e9" />
      <rect x="-30" y="72" width="10" height="24" rx="2" fill="#0284c7" />
      <rect x="20" y="72" width="10" height="24" rx="2" fill="#0284c7" />
      <GripperHoldingBlock holdingBlock={holdingBlock} blk={blk} />
    </g>
  );
}
