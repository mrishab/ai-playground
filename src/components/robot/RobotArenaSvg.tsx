import React from "react";
import { RobotWorld, RobotPose } from "@/data/robotProblems";
import { RobotAgentSvg } from "./RobotAgentSvg";
import { RobotLocationsSvg } from "./RobotLocationsSvg";
import { RobotWallsSvg } from "./RobotWallsSvg";

export function RobotArenaSvg({
  world,
  robotPose,
  breadcrumbs,
  currentPlanIndex,
}: {
  world: RobotWorld;
  robotPose: RobotPose;
  breadcrumbs: { x: number; y: number }[];
  currentPlanIndex: number;
}) {
  return (
    <div className="relative w-full h-[380px] bg-canvas select-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 600 380">
        <pattern
          id="dot-grid"
          width="25"
          height="25"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="0.8" className="fill-muted" />
        </pattern>
        <rect width="600" height="380" fill="url(#dot-grid)" />

        {breadcrumbs.map((b, i) => (
          <circle
            key={i}
            cx={b.x}
            cy={b.y}
            r="1.5"
            fill="hsl(var(--primary))"
            opacity={0.4}
          />
        ))}

        <RobotWallsSvg walls={world.walls} />

        <RobotLocationsSvg
          locations={world.locations}
          currentTarget={world.plan[currentPlanIndex]}
        />
        <RobotAgentSvg pose={robotPose} />
      </svg>
    </div>
  );
}
