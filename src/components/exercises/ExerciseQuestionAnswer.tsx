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
        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs animate-in fade-in">
          <strong className="text-amber-600 dark:text-amber-400">Hint:</strong> {hint}
        </div>
      )}
      {isSolutionOpen && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs leading-relaxed animate-in fade-in space-y-1">
          <div className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            Official Textbook Solution:
          </div>
          <p className="text-foreground/90">{solution}</p>
        </div>
      )}
    </>
  );
}
