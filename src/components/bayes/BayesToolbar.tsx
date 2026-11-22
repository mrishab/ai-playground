import React from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";

interface BayesToolbarProps {
  onClearEvidence: () => void;
  observedCount: number;
}

export function BayesToolbar({
  onClearEvidence,
  observedCount,
}: BayesToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onClearEvidence}
          className="gap-1.5 h-8 text-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Clear All Evidence
        </Button>
        <div className="flex items-center gap-1 border-l border-border pl-2">
          <span className="text-muted-foreground text-[11px]">
            Click node to cycle:
          </span>
          <span className="font-mono text-primary text-[11px]">
            Unobserved → Val 1 → Val 2 → None
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-muted-foreground">Observed:</span>
        <span className="font-bold font-mono text-primary text-xs">
          {observedCount} variables
        </span>
      </div>
    </div>
  );
}
