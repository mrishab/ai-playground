import React from "react";
import { BayesNode, OutcomeDistribution } from "@/data/bayesProblems";
import { BayesNodeShape } from "./BayesNodeShape";
import { BayesNodeProbBar } from "./BayesNodeProbBar";

interface BayesNodeSvgProps {
  node: BayesNode;
  isObserved: boolean;
  obsVal: string | null | undefined;
  nodeBelief: OutcomeDistribution;
  onToggle: () => void;
}

export function BayesNodeSvg({
  node,
  isObserved,
  obsVal,
  nodeBelief,
  onToggle,
}: BayesNodeSvgProps) {
  const outcomes = node.outcomes.length > 0 ? node.outcomes : ["true", "false"];
  const pVal1 =
    nodeBelief[outcomes[0]] !== undefined ? nodeBelief[outcomes[0]] : 0.5;

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onClick={onToggle}
      className="cursor-pointer"
    >
      <BayesNodeShape type={node.type} isObserved={isObserved} />
      <text
        x="0"
        y="-10"
        textAnchor="middle"
        fontSize="11"
        fontWeight="bold"
        className="pointer-events-none fill-slate-800 dark:fill-[#f8fafc]"
      >
        {node.id}
      </text>
      <BayesNodeProbBar
        isObserved={isObserved}
        obsVal={obsVal}
        type={node.type}
        pVal1={pVal1}
        outcome0={outcomes[0]}
      />
    </g>
  );
}
