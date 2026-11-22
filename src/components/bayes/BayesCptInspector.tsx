import React, { useState } from "react";
import { Card } from "../ui/Card";
import { BayesNetwork } from "@/data/bayesProblems";
import { getParentConfigs } from "./bayesCptUtils";
import { BayesCptInspectorHeader } from "./BayesCptInspectorHeader";
import { BayesCptTable } from "./BayesCptTable";

export function BayesCptInspector({ network }: { network: BayesNetwork }) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(network.nodes[0]?.id || "");
  const selectedNode = network.nodes.find((n) => n.id === selectedNodeId) || network.nodes[0];
  const cpt = network.cpts.find((c) => c.target === selectedNode?.id);

  if (!selectedNode) {
    return <Card className="p-4 text-center text-sm text-muted-foreground">No nodes available in this network.</Card>;
  }

  const outcomes = selectedNode.outcomes.length > 0 ? selectedNode.outcomes : ["true", "false"];
  const parents = cpt?.parents || [];
  const [isDecision, isUtility] = [selectedNode.type === "decision", selectedNode.type === "utility"];
  const parentConfigs = cpt ? getParentConfigs(parents, network) : [];

  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <BayesCptInspectorHeader
        selectedNode={selectedNode} network={network} parents={parents}
        isDecision={isDecision} isUtility={isUtility} onSelectNodeId={setSelectedNodeId}
      />
      <div className="p-4 bg-canvas space-y-4">
        {isDecision ? (
          <div className="p-4 rounded-lg bg-secondary/40 border border-border text-center space-y-2">
            <p className="text-sm font-medium">Decision Variable: <span className="font-mono text-primary font-bold">{selectedNode.id}</span></p>
            <p className="text-xs text-muted-foreground">
              Controlled by the agent's policy. Candidate decisions:{" "}
              <span className="font-mono text-foreground font-semibold">[{outcomes.join(", ")}]</span>.
            </p>
          </div>
        ) : !cpt || cpt.table.length === 0 ? (
          <div className="p-4 rounded-lg bg-secondary/40 border border-border text-center text-xs text-muted-foreground">
            No probability table specified for this node.
          </div>
        ) : (
          <BayesCptTable
            selectedNode={selectedNode}
            cpt={cpt}
            parents={parents}
            outcomes={outcomes}
            parentConfigs={parentConfigs}
            isUtility={isUtility}
            network={network}
          />
        )}
      </div>
    </Card>
  );
}
