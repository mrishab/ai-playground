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
          <Badge variant="success">
            Start: {graph.startNode}
          </Badge>
        )}
        {graph.goalNodes.length > 0 && (
          <Badge variant="warning">
            Goals: {graph.goalNodes.join(", ")}
          </Badge>
        )}
      </div>

      <div className="text-muted-foreground text-[11px]">
        Tip: Drag nodes to move, drag &apos;+ Drag Node&apos; onto canvas to add, double-click to edit h(n) / start / goal.
      </div>
    </div>
  );
}
