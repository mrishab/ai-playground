import React from "react";
import { GitFork } from "lucide-react";
import { Button } from "../ui/Button";
import { CandidateGain } from "./dtreeTypes";

interface DTreeSplitControlProps {
  candidateGains: CandidateGain[];
  selectedSplitAttr: string;
  setSelectedSplitAttr: (attr: string) => void;
  onSplit: (attr: string) => void;
}

export function DTreeSplitControl({
  candidateGains,
  selectedSplitAttr,
  setSelectedSplitAttr,
  onSplit,
}: DTreeSplitControlProps) {
  if (candidateGains.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[11px] text-muted-foreground">Split on:</span>
      <select
        aria-label="Select Attribute to Split"
        value={selectedSplitAttr}
        onChange={(e) => setSelectedSplitAttr(e.target.value)}
        className="h-8 px-2 text-xs rounded border border-input bg-card text-foreground"
      >
        {candidateGains.map((cg) => (
          <option key={cg.attr} value={cg.attr}>
            {cg.attr} (Gain: {cg.gain.toFixed(3)})
          </option>
        ))}
      </select>
      <Button
        variant="accent"
        size="sm"
        onClick={() => onSplit(selectedSplitAttr)}
        className="gap-1 h-8 text-xs"
      >
        <GitFork className="h-3.5 w-3.5" />
        Split
      </Button>
    </div>
  );
}
