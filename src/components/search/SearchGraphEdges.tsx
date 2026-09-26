import React from "react";
import { SearchGraph } from "@/data/searchProblems";
import { SearchGraphDefs } from "./SearchGraphDefs";
import { SearchEdgeLine } from "./SearchEdgeLine";

interface SearchGraphEdgesProps {
  graph: SearchGraph;
  currentPath: string[];
}

export function SearchGraphEdges({
  graph,
  currentPath,
}: SearchGraphEdgesProps) {
  return (
    <>
      <SearchGraphDefs />
      {graph.edges.map((edge, idx) => {
        const f = graph.nodes.find((n) => n.id === edge.from);
        const t = graph.nodes.find((n) => n.id === edge.to);
        if (!f || !t) return null;
        const inPath = currentPath.some(
          (id, i) =>
            i < currentPath.length - 1 &&
            currentPath[i] === edge.from &&
            currentPath[i + 1] === edge.to,
        );
        return (
          <SearchEdgeLine
            key={`${edge.from}-${edge.to}`}
            fromNode={f}
            toNode={t}
            cost={edge.cost}
            inPath={inPath}
          />
        );
      })}
    </>
  );
}
