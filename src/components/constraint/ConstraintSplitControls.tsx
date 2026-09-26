import React from "react";
import { GitBranch } from "lucide-react";
import { Button } from "../ui/Button";
import { CSPVariable } from "@/data/cspProblems";
import { VariableDomains } from "./constraintTypes";

interface ConstraintSplitControlsProps {
  variables: CSPVariable[];
  domains: VariableDomains;
  selectedVarToSplit: string;
  setSelectedVarToSplit: (v: string) => void;
  onPerformSplit: (v: string) => void;
}

export function ConstraintSplitControls({
  variables,
  domains,
  selectedVarToSplit,
  setSelectedVarToSplit,
  onPerformSplit,
}: ConstraintSplitControlsProps) {
  const canSplit = Boolean(
    domains[selectedVarToSplit] && domains[selectedVarToSplit].length > 1,
  );

  return (
    <div className="flex items-center gap-1.5">
      <select
        aria-label="Select variable to split"
        value={selectedVarToSplit}
        onChange={(e) => setSelectedVarToSplit(e.target.value)}
        className="h-8 px-2 text-[11px] rounded border border-input bg-card text-foreground"
      >
        {variables.map((v) => (
          <option key={v.name} value={v.name}>
            Split {v.name} ({domains[v.name]?.length || 0})
          </option>
        ))}
      </select>
      <Button
        variant="accent"
        size="sm"
        onClick={() => onPerformSplit(selectedVarToSplit)}
        disabled={!canSplit}
        className="h-8 text-xs gap-1"
      >
        <GitBranch className="h-3.5 w-3.5" /> Domain Split
      </Button>
    </div>
  );
}
