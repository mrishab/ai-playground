import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { SearchNode, SearchGraph } from "@/data/searchProblems";

interface SearchInspectorCardProps {
  node: SearchNode | null;
  graph: SearchGraph;
}

export function SearchInspectorCard({ node, graph }: SearchInspectorCardProps) {
  if (!node) return null;

  return (
    <Card className="border-cyan-500/30 bg-cyan-950/10 shadow-sm animate-in fade-in">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm flex items-center justify-between">
          <span>Node Inspector: {node.id}</span>
          <Badge variant="cyan">
            {node.isStart ? "Start" : node.isGoal ? "Goal" : "Intermediate"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1 text-xs space-y-1.5">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Heuristic h({node.id}):</span>
          <span className="font-mono font-bold text-sky-400">{node.h}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Coordinates:</span>
          <span className="font-mono text-foreground">
            ({node.x}, {node.y})
          </span>
        </div>
        <div className="text-[11px] text-muted-foreground pt-1 border-t border-border/40">
          Outgoing:{" "}
          {graph.edges
            .filter((e) => e.from === node.id)
            .map((e) => `${e.to} (cost ${e.cost})`)
            .join(", ") || "None"}
        </div>
      </CardContent>
    </Card>
  );
}
