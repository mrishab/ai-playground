import React from "react";
import { Badge } from "../ui/Badge";
import { BayesNode, OutcomeDistribution } from "@/data/bayesProblems";

interface BayesMarginalRowProps {
  node: BayesNode;
  belief: OutcomeDistribution;
  observedVal: string | null;
}

export function BayesMarginalRow({
  node,
  belief,
  observedVal,
}: BayesMarginalRowProps) {
  const isObserved = Boolean(observedVal);

  return (
    <div className="p-2.5 rounded-lg bg-secondary/30 border border-border/50 text-xs space-y-1">
      <div className="flex items-center justify-between">
        <span className="font-bold text-foreground">{node.id}</span>
        {isObserved ? (
          <Badge variant="cyan" className="text-[10px] py-0">
            Observed: {observedVal}
          </Badge>
        ) : (
          <span className="text-[10px] text-muted-foreground">Marginal</span>
        )}
      </div>

      <div className="space-y-1 pt-1 font-mono text-[11px]">
        {Object.entries(belief).map(([outcome, prob]) => (
          <div key={outcome} className="flex items-center justify-between">
            <span className="text-muted-foreground">{outcome}:</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full w-full bg-primary rounded-full origin-left transition-transform duration-300 ease-out"
                  style={{ transform: `scaleX(${prob})` }}
                />
              </div>
              <span className="w-10 text-right font-semibold text-foreground">
                {(prob * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
