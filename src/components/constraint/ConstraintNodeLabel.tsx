import React from "react";

interface ConstraintNodeLabelProps {
  name: string;
  currentDomain: string[];
  x: number;
  y: number;
  textClassName: string;
  domainClassName: string;
}

export function ConstraintNodeLabel({
  name,
  currentDomain,
  x,
  y,
  textClassName,
  domainClassName,
}: ConstraintNodeLabelProps) {
  const isSingle = currentDomain.length === 1;
  const isEmpty = currentDomain.length === 0;

  return (
    <>
      <text
        x={x}
        y={y - 4}
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        className={textClassName}
      >
        {name}
      </text>
      <g transform={`translate(${x}, ${y + 11})`}>
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="600"
          className={domainClassName}
        >
          {isEmpty
            ? "∅"
            : currentDomain.length <= 4
              ? `{${currentDomain.join(",")}}`
              : `|D|=${currentDomain.length}`}
        </text>
      </g>
    </>
  );
}
