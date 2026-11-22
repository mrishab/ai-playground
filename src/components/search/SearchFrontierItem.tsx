import React from "react";
import { Badge } from "../ui/Badge";
import { AlgorithmType, SearchPath } from "./searchTypes";

interface SearchFrontierItemProps {
  path: SearchPath;
  isNext: boolean;
  algorithm?: AlgorithmType;
}

export function SearchFrontierItem({ path, isNext, algorithm }: SearchFrontierItemProps) {
  const [isBestFirst, isBlind, isDijkstra] = [
    algorithm === "best_first", algorithm === "bfs" || algorithm === "dfs", algorithm === "lcfs",
  ];

  return (
    <div
      className={`p-2.5 rounded-lg border text-xs transition-colors duration-200 ease-out ${
        isNext
          ? "bg-primary/10 border-primary/40 text-primary font-bold"
          : "bg-secondary/40 border-border/50 text-foreground/90"
      }`}
    >
      <div className="flex items-center justify-between font-mono font-medium mb-1">
        <span className="truncate max-w-[170px]" title={path.nodes.join(" -> ")}>
          {path.nodes.join(" → ")}
        </span>
        {isNext && <Badge variant="cyan" className="text-[9px] py-0 px-1.5">Next</Badge>}
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
        {isBlind ? (
          <>
            <span>depth = {path.nodes.length - 1}</span>
            <span>cost g = {(path.cost ?? 0).toFixed(1)}</span>
          </>
        ) : isDijkstra ? (
          <>
            <span>cost g = {(path.cost ?? 0).toFixed(1)}</span>
            <span className="font-bold text-foreground">prio = g</span>
          </>
        ) : (
          <>
            <span>g = {(path.cost ?? 0).toFixed(1)}</span>
            <span>h = {(path.h ?? 0).toFixed(1)}</span>
            <span className="font-bold text-foreground">
              {isBestFirst ? `f = h = ${(path.h ?? 0).toFixed(1)}` : `f = ${(path.f ?? 0).toFixed(1)}`}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
