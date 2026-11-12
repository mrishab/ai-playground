import React from "react";
import { CheckCircle2 } from "lucide-react";

export function ExerciseQuestionAnswer({
  hint,
  solution,
  isHintOpen,
  isSolutionOpen,
}: {
  hint: string;
  solution: string;
  isHintOpen: boolean;
  isSolutionOpen: boolean;
}) {
  return (
    <>
      {isHintOpen && (
        <div className="p-2.5 rounded-lg bg-accent/40 border border-border text-foreground text-xs animate-in fade-in">
          <strong className="text-primary">Hint:</strong> {hint}
        </div>
      )}
      {isSolutionOpen && (
        <div className="p-3 rounded-lg bg-card border border-border text-foreground text-xs leading-relaxed animate-in fade-in space-y-1">
          <div className="font-semibold text-primary flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            Official Textbook Solution:
          </div>
          <p className="text-foreground/90">{solution}</p>
        </div>
      )}
    </>
  );
}
