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
        className="fill-slate-200 dark:fill-[#334155] stroke-slate-300 dark:stroke-[#475569]"
      />
      <rect
        x="70"
        y="324"
        width="20"
        height="36"
        className="fill-slate-300 dark:fill-[#1e293b]"
      />
      <rect
        x="510"
        y="324"
        width="20"
        height="36"
        className="fill-slate-300 dark:fill-[#1e293b]"
      />
      <text
        x="300"
        y="316"
        textAnchor="middle"
        className="fill-slate-600 dark:fill-[#94a3b8] font-bold text-[10px]"
      >
        TABLE
      </text>
    </>
  );
}
