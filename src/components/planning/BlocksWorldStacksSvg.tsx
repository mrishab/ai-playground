import React from "react";
import { PlanningProblem } from "@/data/planningProblems";
import { BlocksWorldBlockSvg } from "./BlocksWorldBlockSvg";

interface BlocksWorldStacksSvgProps {
  columns: string[][];
  problem: PlanningProblem;
}

export function BlocksWorldStacksSvg({
  columns,
  problem,
}: BlocksWorldStacksSvgProps) {
  return (
    <>
      {columns.map((col, cIdx) => {
        const colX = 100 + cIdx * 95;
        return (
          <g key={cIdx}>
            {col.map((blockId, stackIdx) => (
              <BlocksWorldBlockSvg
                key={blockId}
                blockId={blockId}
                blk={problem.blocks.find((b) => b.id === blockId)}
                colX={colX}
                stackIdx={stackIdx}
              />
            ))}
          </g>
        );
      })}
    </>
  );
}
