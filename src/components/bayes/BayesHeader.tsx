import React from "react";
import { BAYES_NETWORKS, BayesNetwork } from "@/data/bayesProblems";
import { ToolTutorialData } from "@/data/toolTutorials";
import { Badge } from "../ui/Badge";

interface BayesHeaderProps {
  selectedNetId: string;
  setSelectedNetId: (id: string) => void;
  network: BayesNetwork;
  tutorial: ToolTutorialData;
}

export function BayesHeader({
  selectedNetId,
  setSelectedNetId,
  network,
  tutorial,
}: BayesHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold tracking-tight">
            Belief & Decision Networks Lab
          </span>
          <Badge variant="cyan">{tutorial.badge}</Badge>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          {network.description}
        </p>
      </div>

      <select
        aria-label="Select Bayesian Network"
        value={selectedNetId}
        onChange={(e) => setSelectedNetId(e.target.value)}
        className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {Object.values(BAYES_NETWORKS).map((net) => (
          <option key={net.id} value={net.id}>
            {net.name}
          </option>
        ))}
      </select>
    </div>
  );
}
