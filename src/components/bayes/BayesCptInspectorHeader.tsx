import React from "react";
import { Badge } from "../ui/Badge";
import { BayesNetwork, BayesNode } from "@/data/bayesProblems";

interface BayesCptInspectorHeaderProps {
  selectedNode: BayesNode;
  network: BayesNetwork;
  parents: string[];
  isDecision: boolean;
  isUtility: boolean;
  onSelectNodeId: (id: string) => void;
}

export function BayesCptInspectorHeader({
  selectedNode,
  network,
  parents,
  isDecision,
  isUtility,
  onSelectNodeId,
}: BayesCptInspectorHeaderProps) {
  return (
    <div className="p-3 bg-secondary/30 border-b border-border flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground">Select Node:</span>
        <select
          value={selectedNode.id}
          onChange={(e) => onSelectNodeId(e.target.value)}
          className="text-xs bg-background border border-border rounded px-2 py-1 font-mono font-medium focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-150"
        >
          {network.nodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.id} ({n.type || "chance"})
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <Badge
          variant={isDecision ? "purple" : isUtility ? "default" : "outline"}
          className="text-[10px] font-mono uppercase"
        >
          {selectedNode.type || "chance"} node
        </Badge>
        <span className="text-xs text-muted-foreground font-mono">
          Parents: {parents.length > 0 ? parents.join(", ") : "None (Prior)"}
        </span>
      </div>
    </div>
  );
}
