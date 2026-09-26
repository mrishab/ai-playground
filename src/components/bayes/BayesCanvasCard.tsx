import React from "react";
import { Card } from "../ui/Card";
import { BayesToolbar } from "./BayesToolbar";
import { BayesGraphSvg } from "./BayesGraphSvg";
import { BayesNetwork, EvidenceMap, NetworkBeliefs } from "@/data/bayesProblems";

interface BayesCanvasCardProps {
  network: BayesNetwork;
  evidence: EvidenceMap;
  beliefs: NetworkBeliefs;
  observedCount: number;
  onClearEvidence: () => void;
  onToggleEvidence: (id: string) => void;
}

export function BayesCanvasCard({
  network,
  evidence,
  beliefs,
  observedCount,
  onClearEvidence,
  onToggleEvidence,
}: BayesCanvasCardProps) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <BayesToolbar
        onClearEvidence={onClearEvidence}
        observedCount={observedCount}
      />
      <BayesGraphSvg
        network={network}
        evidence={evidence}
        beliefs={beliefs}
        onToggleEvidence={onToggleEvidence}
      />
    </Card>
  );
}
