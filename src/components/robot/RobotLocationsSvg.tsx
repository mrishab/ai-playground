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
                  ? "fill-primary/20 stroke-primary animate-pulse"
                  : "fill-card stroke-border"
              }
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              className="font-bold font-mono text-[9px] fill-foreground"
            >
              {loc.name}
            </text>
          </g>
        );
      })}
    </>
  );
}
