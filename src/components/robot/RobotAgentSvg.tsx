import React from "react";
import { RobotPose } from "@/data/robotProblems";

export function RobotAgentSvg({ pose }: { pose: RobotPose }) {
  return (
    <g
      transform={`translate(${pose.x}, ${pose.y}) rotate(${pose.angle})`}
      className="transition-transform duration-300 ease-out"
    >
      <line
        x1="0"
        y1="0"
        x2="35"
        y2="-15"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.7"
      />
      <line
        x1="0"
        y1="0"
        x2="40"
        y2="0"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        strokeDasharray="2 2"
        opacity="0.9"
      />
      <line
        x1="0"
        y1="0"
        x2="35"
        y2="15"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.7"
      />
      <circle
        cx="0"
        cy="0"
        r="14"
        fill="hsl(var(--primary))"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="2.5"
      />
      <polygon points="12,0 0,-5 0,5" fill="hsl(var(--primary-foreground))" />
    </g>
  );
}
