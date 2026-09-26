import React from "react";
import { RobotWall } from "@/data/robotProblems";

export function RobotWallsSvg({ walls }: { walls: RobotWall[] }) {
  return (
    <>
      {walls.map((wall, i) => (
        <line
          key={i}
          x1={wall.x1}
          y1={wall.y1}
          x2={wall.x2}
          y2={wall.y2}
          strokeWidth="6"
          strokeLinecap="round"
          className="stroke-slate-800 dark:stroke-[#e2e8f0] shadow-lg"
        />
      ))}
    </>
  );
}
