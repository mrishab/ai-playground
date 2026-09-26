import React from "react";
import { BarChart3 } from "lucide-react";
import { Button } from "../ui/Button";
import { HillToolbarButtons } from "./HillToolbarButtons";

interface HillToolbarProps {
  isPlaying: boolean;
  conflicts: number;
  onTogglePlay: () => void;
  onStep: () => void;
  onReset: () => void;
  onBatch: () => void;
}

export function HillToolbar(props: HillToolbarProps) {
  const { onBatch } = props;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
      <HillToolbarButtons {...props} />

      <Button
        variant="accent"
        size="sm"
        onClick={onBatch}
        className="gap-1.5 h-8 text-xs"
      >
        <BarChart3 className="h-3.5 w-3.5" />
        Batch 50 Trials
      </Button>
    </div>
  );
}
