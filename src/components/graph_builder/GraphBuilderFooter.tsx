import React from "react";
import { SearchGraph } from "@/data/searchProblems";
import { Badge } from "../ui/Badge";

export function GraphBuilderFooter({ graph }: { graph: SearchGraph }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-card/60 text-xs border-t border-border">
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground font-medium">Graph Info:</span>
        <Badge variant="cyan">{graph.nodes.length} Nodes</Badge>
        <Badge variant="outline">{graph.edges.length} Edges</Badge>
        {graph.startNode && (
          <span className="text-emerald-500 font-medium">
            Start: <strong>{graph.startNode}</strong>
          </span>
        )}
        {graph.goalNodes.length > 0 && (
          <span className="text-amber-500 font-medium">
            Goals: <strong>{graph.goalNodes.join(", ")}</strong>
          </span>
        )}
      </div>

      <div className="text-muted-foreground text-[11px]">
        Tip: Drag nodes to move, drag &apos;+ Drag Node&apos; onto canvas to add, double-click to edit h(n) / start / goal.
      </div>
    </div>
  );
}
