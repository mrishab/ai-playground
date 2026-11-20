import React from "react";
import { ArrowDownRight, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DeductionToolbarProps {
  algo: string;
  onSelectAlgo: (algo: string) => void;
  onNextAnswer?: () => void;
  answersCount: number;
}

export function DeductionToolbar({ algo, onSelectAlgo, onNextAnswer, answersCount }: DeductionToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-secondary/30 border-b border-border text-xs" aria-label="Deduction Canvas Toolbar">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-1.5 py-0.5 rounded bg-secondary border border-border/50">
          Algorithm:
        </span>
        <Button
          variant={algo === "sld" ? "accent" : "outline"}
          size="sm"
          onClick={() => onSelectAlgo("sld")}
          className="h-7 px-2 text-[11px] gap-1"
        >
          <Layers className="h-3 w-3" />
          SLD (Top-Down)
        </Button>
        <Button
          variant={algo === "bottom_up" ? "accent" : "outline"}
          size="sm"
          onClick={() => onSelectAlgo("bottom_up")}
          className="h-7 px-2 text-[11px] gap-1"
        >
          <ArrowDownRight className="h-3 w-3" />
          Bottom-Up (Forward)
        </Button>
      </div>

      <div className="flex items-center gap-1.5">
        {onNextAnswer && (
          <Button variant="outline" size="sm" onClick={onNextAnswer} title="Jump to Next Answer" className="h-7 px-2 text-[11px] gap-1">
            <Sparkles className="h-3 w-3 text-amber-500" />
            Next Answer
          </Button>
        )}
        <span className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-background/50 border border-border/40">
          Answers: <strong className="text-foreground">{answersCount}</strong>
        </span>
      </div>
    </div>
  );
}
