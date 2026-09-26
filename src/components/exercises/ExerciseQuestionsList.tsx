import React from "react";
import { HelpCircle } from "lucide-react";
import { QuestionItem, ExpandedItemMap } from "@/data/exercisesData";
import { ExerciseQuestionItem } from "./ExerciseQuestionItem";

interface QuestionsListProps {
  exerciseId: string;
  questions: QuestionItem[];
  expandedHints: ExpandedItemMap;
  expandedSolutions: ExpandedItemMap;
  onToggleHint: (key: string) => void;
  onToggleSolution: (key: string) => void;
  activeQuestionIdx?: number | null;
  onSelectQuestion?: (idx: number) => void;
}

export function ExerciseQuestionsList(p: QuestionsListProps) {
  return (
    <div className="space-y-3 pt-2">
      <span className="font-semibold text-foreground flex items-center gap-1.5">
        <HelpCircle className="h-4 w-4 text-cyan-400" />
        Directed Assessment Questions
      </span>
      <div className="space-y-2.5">
        {p.questions.map((q, qIdx) => {
          const key = `${p.exerciseId}-${qIdx}`;
          return (
            <ExerciseQuestionItem
              key={qIdx}
              question={q}
              index={qIdx}
              isHintOpen={Boolean(p.expandedHints[key])}
              isSolutionOpen={Boolean(p.expandedSolutions[key])}
              onToggleHint={() => p.onToggleHint(key)}
              onToggleSolution={() => p.onToggleSolution(key)}
              isActive={p.activeQuestionIdx === qIdx}
              onExecuteLogic={p.onSelectQuestion ? () => p.onSelectQuestion!(qIdx) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
