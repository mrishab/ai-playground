import React from "react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { BayesNetwork, EvidenceMap } from "@/data/bayesProblems";
import { useBayesVe } from "./useBayesVe";
import { BayesVeControls } from "./BayesVeControls";

export function BayesVeCard({ network, evidence }: { network: BayesNetwork; evidence: EvidenceMap }) {
  const ve = useBayesVe(network, evidence);
  const snap = ve.currentStep;
  const nodes = network.nodes.filter((n) => n.type === "chance");

  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <BayesVeControls
        queryVar={ve.queryVar}
        setQueryVar={ve.setQueryVar}
        availableNodes={nodes}
        stepIndex={ve.stepIndex}
        totalSteps={ve.steps.length}
        isPlaying={ve.isPlaying}
        onStepForward={ve.stepForward}
        onStepBack={ve.stepBack}
        onTogglePlay={ve.togglePlay}
        speed={ve.speed}
        setSpeed={ve.setSpeed}
      />
      <div className="p-4 space-y-3 bg-canvas">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-primary font-mono text-[11px]">{snap?.action || "Ready"}</Badge>
          <span className="text-xs text-muted-foreground font-mono">{snap?.description}</span>
        </div>
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-muted-foreground">Active Factor Pool ({snap?.factors.length || 0}):</div>
          <div className="flex flex-wrap gap-1.5">
            {snap?.factors.map((f, i) => (
              <span key={`${f.id}-${i}`} className="px-2 py-0.5 rounded text-[11px] font-mono bg-secondary border border-border text-foreground">
                {f.name} <span className="text-muted-foreground">({f.table.length} rows)</span>
              </span>
            ))}
          </div>
        </div>
        {snap?.normalizedResult && (
          <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 space-y-1">
            <span className="text-xs font-semibold text-primary">Exact Posterior Distribution P({ve.queryVar} | Evidence):</span>
            <div className="flex gap-4 font-mono text-xs">
              {Object.entries(snap.normalizedResult).map(([val, prob]) => (
                <span key={val} className="text-foreground">{val}: <strong className="text-primary">{(prob * 100).toFixed(1)}%</strong></span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
