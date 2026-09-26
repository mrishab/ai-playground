import React from "react";
import { SearchNodeSvgProps } from "./searchTypes";
import { getSearchNodeStyle } from "./searchNodeStyles";
import { SearchNodeBadgeSvg } from "./SearchNodeBadgeSvg";
import { SearchNodeHaloSvg } from "./SearchNodeHaloSvg";

export function SearchNodeSvg(props: SearchNodeSvgProps) {
  const { node, isCurrent, onClick } = props;
  const { circleClassName, textClassName, strokeWidth } =
    getSearchNodeStyle(props);

  return (
    <g
      onClick={onClick}
      className="cursor-pointer transition-transform hover:scale-110"
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      <SearchNodeHaloSvg
        x={node.x}
        y={node.y}
        isCurrent={isCurrent}
        isGoal={!!node.isGoal}
      />
      <circle
        cx={node.x}
        cy={node.y}
        r="18"
        strokeWidth={strokeWidth}
        className={`transition-colors duration-200 ${circleClassName}`}
      />
      <text
        x={node.x}
        y={node.y + 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        className={`pointer-events-none ${textClassName}`}
      >
        {node.id}
      </text>
      <SearchNodeBadgeSvg x={node.x} y={node.y} h={node.h} />
    </g>
  );
}
