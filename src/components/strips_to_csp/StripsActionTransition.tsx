import React from "react";
import { ArrowRight } from "lucide-react";

interface StripsActionTransitionProps {
  t: number;
  isSolved: boolean;
  actionText?: string;
}

export function StripsActionTransition({
  t,
  isSolved,
  actionText,
}: StripsActionTransitionProps) {
  return (
    <div className="w-full flex flex-col items-center py-2 space-y-1">
      <ArrowRight className="h-4 w-4 text-primary rotate-90 sm:rotate-0" />
      <div className="px-2.5 py-1 rounded-lg bg-secondary/40 border border-border text-[10px] font-mono text-foreground text-center w-full truncate transition-colors duration-300 ease-out">
        {isSolved && actionText ? actionText : `Action_${t} ∈ {Actions}`}
      </div>
      <span className="text-[9px] text-muted-foreground font-mono">
        Frame Axioms
      </span>
    </div>
  );
}
