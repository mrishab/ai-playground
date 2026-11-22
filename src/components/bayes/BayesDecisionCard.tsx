import React, { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { BayesNetwork, EvidenceMap } from "@/data/bayesProblems";
import { computeNetworkDecisionAnalysis } from "./decisionNetworkEngine";

export function BayesDecisionCard({
  network,
  evidence,
}: {
  network: BayesNetwork;
  evidence: EvidenceMap;
}) {
  const analysis = useMemo(
    () => computeNetworkDecisionAnalysis(network, evidence),
    [network, evidence],
  );

  if (!analysis.isDecisionNetwork) return null;

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-semibold">Expected Utility & Decisions</CardTitle>
          <span className="text-xs text-muted-foreground">EU(d) = Σ_s P(s|d, e) · U(s, d)</span>
        </div>
        <Badge variant="cyan" className="font-mono text-xs">
          MEU = {analysis.meu.toFixed(2)}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-2 max-h-60 overflow-y-auto">
        {analysis.alternatives.map((alt) => (
          <div
            key={alt.label}
            className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
              alt.isOptimal ? "bg-primary/10 border-primary/40 font-semibold" : "bg-secondary/30 border-border/50"
            }`}
          >
            <span className="text-foreground">{alt.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-primary">EU: {alt.eu.toFixed(2)}</span>
              {alt.isOptimal && (
                <Badge variant="success" className="text-[10px] py-0">
                  Optimal
                </Badge>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
