import React from "react";

interface BayesNodeShapeProps {
  type?: "chance" | "decision" | "utility";
  isObserved: boolean;
}

export function BayesNodeShape({ type, isObserved }: BayesNodeShapeProps) {
  if (type === "chance") {
    return (
      <ellipse
        cx="0"
        cy="0"
        rx="46"
        ry="30"
        strokeWidth={isObserved ? 2.5 : 1.5}
        className={`shadow-lg transition-colors duration-300 ease-out ${
          isObserved
            ? "fill-sky-100 dark:fill-[#0c4a6e] stroke-sky-500 dark:stroke-[#38bdf8]"
            : "fill-white dark:fill-[#0f172a] stroke-slate-300 dark:stroke-slate-700"
        }`}
      />
    );
  }
  if (type === "decision") {
    return (
      <rect
        x="-42"
        y="-26"
        width="84"
        height="52"
        rx="6"
        strokeWidth="2"
        className={`transition-colors duration-300 ease-out ${
          isObserved
            ? "fill-emerald-100 dark:fill-[#064e3b] stroke-emerald-500 dark:stroke-emerald-400"
            : "fill-white dark:fill-[#0f172a] stroke-emerald-500 dark:stroke-emerald-400"
        }`}
      />
    );
  }
  if (type === "utility") {
    return (
      <polygon
        points="0,-28 44,0 0,28 -44,0"
        className="fill-purple-100 dark:fill-[#4c1d95] stroke-purple-500 dark:stroke-[#a855f7] transition-colors duration-300 ease-out"
        strokeWidth="2"
      />
    );
  }
  return null;
}
