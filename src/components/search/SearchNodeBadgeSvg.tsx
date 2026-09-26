import React from "react";

interface SearchNodeBadgeSvgProps {
  x: number;
  y: number;
  h: number;
}

export function SearchNodeBadgeSvg({ x, y, h }: SearchNodeBadgeSvgProps) {
  return (
    <g transform={`translate(${x}, ${y - 23})`}>
      <rect
        x="-14"
        y="-9"
        width="28"
        height="14"
        rx="3"
        className="fill-card dark:fill-[#0f172a] stroke-sky-500"
        strokeWidth="0.8"
      />
      <text
        x="0"
        y="1.5"
        textAnchor="middle"
        className="fill-sky-600 dark:fill-[#38bdf8]"
        fontSize="9"
        fontFamily="monospace"
        fontWeight="600"
      >
        h={h}
      </text>
    </g>
  );
}
