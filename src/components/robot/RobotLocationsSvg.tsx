import React from "react";
import { RobotLocation } from "@/data/robotProblems";

export function RobotLocationsSvg({
  locations,
  currentTarget,
}: {
  locations: RobotLocation[];
  currentTarget: string;
}) {
  return (
    <>
      {locations.map((loc) => {
        const isTarget = currentTarget === loc.name;
        return (
          <g key={loc.name} transform={`translate(${loc.x}, ${loc.y})`}>
            <circle
              cx="0"
              cy="0"
              r={isTarget ? 16 : 12}
              strokeWidth="2"
              className={
                isTarget
                  ? "fill-purple-100 dark:fill-[#4c1d95] stroke-purple-500 dark:stroke-[#c084fc] animate-pulse"
                  : "fill-white dark:fill-[#0f172a] stroke-slate-400 dark:stroke-[#475569]"
              }
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              className={`font-bold font-mono text-[9px] ${
                isTarget
                  ? "fill-purple-700 dark:fill-[#f8fafc]"
                  : "fill-slate-700 dark:fill-[#f8fafc]"
              }`}
            >
              {loc.name}
            </text>
          </g>
        );
      })}
    </>
  );
}
