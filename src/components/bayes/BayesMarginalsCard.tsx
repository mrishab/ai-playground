import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import { BayesNetwork, EvidenceMap, NetworkBeliefs } from "@/data/bayesProblems";
import { BayesMarginalRow } from "./BayesMarginalRow";

interface BayesMarginalsCardProps {
  network: BayesNetwork;
  evidence: EvidenceMap;
  beliefs: NetworkBeliefs;
}

export function BayesMarginalsCard({
  network,
  evidence,
  beliefs,
}: BayesMarginalsCardProps) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">
          Posterior Marginals P(X | e)
        </CardTitle>
        <CardDescription className="text-xs">
          Updated in real time given active evidence
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-2 max-h-64 overflow-y-auto">
        {network.nodes
          .filter((n) => n.type !== "utility")
          .map((node) => (
            <BayesMarginalRow
              key={node.id}
              node={node}
              belief={beliefs[node.id] || {}}
              observedVal={evidence[node.id] || null}
            />
          ))}
      </CardContent>
    </Card>
  );
}
