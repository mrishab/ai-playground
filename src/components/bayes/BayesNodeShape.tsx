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
        className={`shadow-lg transition-colors duration-200 ease-out ${
          isObserved
            ? "fill-primary/20 stroke-primary"
            : "fill-card stroke-border"
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
        className={`transition-colors duration-200 ease-out ${
          isObserved
            ? "fill-accent stroke-accent-foreground"
            : "fill-card stroke-accent-foreground"
        }`}
      />
    );
  }
  if (type === "utility") {
    return (
      <polygon
        points="0,-32 54,0 0,32 -54,0"
        className="fill-primary/20 stroke-primary transition-colors duration-200 ease-out"
        strokeWidth="2"
      />
    );
  }
  return null;
}
