import React from "react";
import { SearchGraph, SearchNode } from "@/data/searchProblems";
import { SearchPath } from "./searchTypes";
import { SearchNodeSvg } from "./SearchNodeSvg";
import { SearchGraphEdges } from "./SearchGraphEdges";
import { SearchGraphLegend } from "./SearchGraphLegend";
import { SearchGraphFooter } from "./SearchGraphFooter";

interface SearchGraphSvgProps {
  graph: SearchGraph;
  currentPath: string[];
  currentNode: string | null;
  expanded: string[];
  frontier: SearchPath[];
  isGoalReached: boolean;
  log: string;
  onNodeClick: (node: SearchNode) => void;
}

export function SearchGraphSvg({
  graph, currentPath, currentNode, expanded, frontier, isGoalReached, log, onNodeClick,
}: SearchGraphSvgProps) {
  const expandedSet = new Set(expanded);
  const currentPathSet = new Set(currentPath);

  return (
    <>
      <div className="relative w-full h-[420px] bg-canvas border-b border-border select-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 640 420">
          <SearchGraphEdges graph={graph} currentPath={currentPath} />
          {graph.nodes.map((node) => (
            <SearchNodeSvg
              key={node.id}
              node={node}
              isCurrent={currentNode === node.id}
              isExpandedNode={expandedSet.has(node.id)}
              isFrontierNode={frontier.some((p) => p.nodes[p.nodes.length - 1] === node.id)}
              isInSolution={isGoalReached && currentPathSet.has(node.id)}
              onClick={() => onNodeClick(node)}
            />
          ))}
        </svg>
        <SearchGraphLegend />
      </div>
      <SearchGraphFooter
        log={log}
        frontierCount={frontier.length}
        expandedCount={expanded.length}
      />
    </>
  );
}
