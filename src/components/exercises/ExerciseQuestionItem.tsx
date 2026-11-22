import React from "react";
import { Lightbulb, CheckCircle2, PlayCircle } from "lucide-react";
import { QuestionItem } from "@/data/exercisesData";
import { ExerciseQuestionAnswer } from "./ExerciseQuestionAnswer";

interface QuestionItemProps {
  question: QuestionItem;
  index: number;
  isHintOpen: boolean;
  isSolutionOpen: boolean;
  onToggleHint: () => void;
  onToggleSolution: () => void;
  isActive?: boolean;
  onExecuteLogic?: () => void;
}

export function ExerciseQuestionItem(p: QuestionItemProps) {
  return (
    <div className={`p-3.5 rounded-xl border bg-card/60 space-y-2 transition-colors ${
      p.isActive ? "border-primary/50 bg-primary/5 shadow-sm" : "border-border"
    }`}>
      <div className="font-medium text-foreground leading-relaxed">{p.index + 1}. {p.question.q}</div>
      <div className="flex items-center flex-wrap gap-2 pt-1">
        <button onClick={p.onToggleHint} className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground font-medium transition-colors duration-150 active:scale-[0.98]">
          <Lightbulb className="h-3.5 w-3.5" />
          {p.isHintOpen ? "Hide Hint" : "View Hint"}
        </button>
        <span className="text-border">•</span>
        <button onClick={p.onToggleSolution} className="inline-flex items-center gap-1 text-[11px] text-primary hover:text-primary/80 font-medium transition-colors duration-150 active:scale-[0.98]">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {p.isSolutionOpen ? "Hide Solution" : "Reveal Solution"}
        </button>
        {p.onExecuteLogic && (
          <>
            <span className="text-border">•</span>
            <button onClick={p.onExecuteLogic} className={`inline-flex items-center gap-1 text-[11px] font-medium transition-colors duration-150 active:scale-[0.98] ${
              p.isActive ? "text-primary font-bold" : "text-primary/80 hover:text-primary"
            }`}>
              <PlayCircle className="h-3.5 w-3.5" />
              {p.isActive ? "Active in Stepper" : "Execute Logic"}
            </button>
          </>
        )}
      </div>
      <ExerciseQuestionAnswer hint={p.question.hint} solution={p.question.solution} isHintOpen={p.isHintOpen} isSolutionOpen={p.isSolutionOpen} />
    </div>
  );
}
