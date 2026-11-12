import React from "react";
import { BayesNetwork } from "@/data/bayesProblems";

export function BayesGraphEdges({ network }: { network: BayesNetwork }) {
  return (
    <>
      <defs>
        <marker
          id="bayes-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="52"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 8 3.5, 0 7"
            className="fill-muted-foreground"
          />
        </marker>
      </defs>

      {network.cpts.map((cpt) => {
        const targetNode = network.nodes.find((n) => n.id === cpt.target);
        if (!targetNode) return null;
        return cpt.parents.map((pName, pIdx) => {
          const parentNode = network.nodes.find((n) => n.id === pName);
          if (!parentNode) return null;
          return (
            <line
              key={`${pName}->${cpt.target}-${pIdx}`}
              x1={parentNode.x}
              y1={parentNode.y}
              x2={targetNode.x}
              y2={targetNode.y}
              strokeWidth="2"
              markerEnd="url(#bayes-arrow)"
              className="stroke-border transition-colors duration-200"
            />
          );
        });
      })}
    </>
  );
}
