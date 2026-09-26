import React from "react";
import { BayesNetwork, EvidenceMap, NetworkBeliefs } from "@/data/bayesProblems";
import { BayesNodeSvg } from "./BayesNodeSvg";
import { BayesGraphEdges } from "./BayesGraphEdges";
import { BayesGraphLegend } from "./BayesGraphLegend";

interface BayesGraphSvgProps {
  network: BayesNetwork;
  evidence: EvidenceMap;
  beliefs: NetworkBeliefs;
  onToggleEvidence: (id: string) => void;
}

export function BayesGraphSvg({
  network,
  evidence,
  beliefs,
  onToggleEvidence,
}: BayesGraphSvgProps) {
  return (
    <div className="relative w-full h-[420px] bg-slate-50 dark:bg-[#070a13] border-b border-border select-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 640 420">
        <BayesGraphEdges network={network} />
        {network.nodes.map((node) => (
          <BayesNodeSvg
            key={node.id}
            node={node}
            isObserved={Boolean(evidence[node.id])}
            obsVal={evidence[node.id]}
            nodeBelief={beliefs[node.id] || {}}
            onToggle={() => onToggleEvidence(node.id)}
          />
        ))}
      </svg>
      <BayesGraphLegend />
    </div>
  );
}
