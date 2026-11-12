import React from "react";

export function TableSurfaceSvg() {
  return (
    <>
      <rect
        x="40"
        y="300"
        width="520"
        height="24"
        rx="4"
        strokeWidth="2"
        className="fill-muted stroke-border"
      />
      <rect
        x="70"
        y="324"
        width="20"
        height="36"
        className="fill-muted"
      />
      <rect
        x="510"
        y="324"
        width="20"
        height="36"
        className="fill-muted"
      />
      <text
        x="300"
        y="316"
        textAnchor="middle"
        className="fill-muted-foreground font-bold text-[10px]"
      >
        TABLE
      </text>
    </>
  );
}
