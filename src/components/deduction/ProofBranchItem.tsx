import React from "react";
import { CheckCircle2 } from "lucide-react";
import { ProofNode } from "./deductionTypes";

export function ProofBranchItem({ child }: { child: ProofNode }) {
  return (
    <div className="flex flex-col items-center space-y-2 border-t border-border/50 pt-4">
      <span className="text-[10px] text-muted-foreground font-mono">
        Rule: {child.ruleMatched}
      </span>
      <div className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono text-xs flex items-center gap-1.5">
        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
        {child.goal} [{child.substitution}]
      </div>
      {child.children.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {child.children.map((subg, j) => (
            <span
              key={`${subg.goal}-${j}`}
              className="px-2.5 py-1 rounded bg-secondary/60 text-foreground/80 font-mono text-[11px] border border-border"
            >
              {subg.goal}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
