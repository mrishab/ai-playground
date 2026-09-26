import React from "react";
import { PlanningProblem } from "@/data/planningProblems";
import { TableSurfaceSvg } from "./TableSurfaceSvg";
import { GripperArmSvg } from "./GripperArmSvg";
import { BlocksWorldStacksSvg } from "./BlocksWorldStacksSvg";

export function BlocksWorldArenaSvg({
  columns,
  gripperColIndex,
  holdingBlock,
  problem,
}: {
  columns: string[][];
  gripperColIndex: number;
  holdingBlock: string | null;
  problem: PlanningProblem;
}) {
  return (
    <div className="relative w-full h-[360px] bg-slate-50 dark:bg-[#070a13] select-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 600 360">
        <TableSurfaceSvg />
        <GripperArmSvg
          gripperColIndex={gripperColIndex}
          holdingBlock={holdingBlock}
          problem={problem}
        />
        <BlocksWorldStacksSvg columns={columns} problem={problem} />
      </svg>
    </div>
  );
}
