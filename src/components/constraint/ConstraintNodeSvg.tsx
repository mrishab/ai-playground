import React from "react";
import { CSPVariable } from "@/data/cspProblems";
import { getConstraintNodeStyle } from "./constraintNodeStyles";
import { ConstraintNodeLabel } from "./ConstraintNodeLabel";

interface ConstraintNodeSvgProps {
  variable: CSPVariable;
  currentDomain: string[];
  isBeingEvaluated: boolean;
}

export function ConstraintNodeSvg({
  variable: v,
  currentDomain,
  isBeingEvaluated,
}: ConstraintNodeSvgProps) {
  const isSingle = currentDomain.length === 1;
  const isEmpty = currentDomain.length === 0;
  const { circleClassName, textClassName, domainClassName } =
    getConstraintNodeStyle(isSingle, isEmpty, isBeingEvaluated);

  return (
    <g className="transition-opacity duration-300">
      {isBeingEvaluated && (
        <circle
          cx={v.x}
          cy={v.y}
          r="34"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          opacity="0.6"
          className="transition-opacity duration-200"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      )}
      <circle
        cx={v.x}
        cy={v.y}
        r="25"
        strokeWidth="2.5"
        className={`transition-colors duration-200 ease-out ${circleClassName}`}
      />
      <ConstraintNodeLabel
        name={v.name}
        currentDomain={currentDomain}
        x={v.x}
        y={v.y}
        textClassName={textClassName}
        domainClassName={domainClassName}
      />
    </g>
  );
}
