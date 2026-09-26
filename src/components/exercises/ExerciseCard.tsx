import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { ExerciseItem, ExpandedItemMap } from "@/data/exercisesData";
import { ExerciseCardHeader } from "./ExerciseCardHeader";
import { ExerciseObjectives } from "./ExerciseObjectives";
import { ExerciseQuestionsList } from "./ExerciseQuestionsList";
import { ExerciseStepRunner } from "./ExerciseStepRunner";

interface ExerciseCardProps {
  exercise: ExerciseItem;
  expandedHints: ExpandedItemMap;
  expandedSolutions: ExpandedItemMap;
  onToggleHint: (key: string) => void;
  onToggleSolution: (key: string) => void;
  onOpenTool: (toolId: string, sampleId?: string) => void;
}

export function ExerciseCard(props: ExerciseCardProps) {
  const { exercise, expandedHints, expandedSolutions, onToggleHint, onToggleSolution, onOpenTool } = props;
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number | null>(null);

  return (
    <Card className="overflow-hidden border-border/80 shadow-sm hover:border-primary/40 transition-colors">
      <ExerciseCardHeader exercise={exercise} onOpenTool={onOpenTool} />
      <CardContent className="p-5 pt-2 space-y-4 text-xs">
        <ExerciseObjectives goals={exercise.goals} />
        <ExerciseStepRunner
          toolId={exercise.toolId}
          sampleId={exercise.sampleId}
          exerciseId={exercise.id}
          activeQuestionIdx={activeQuestionIdx}
          onClearQuestionIdx={() => setActiveQuestionIdx(null)}
        />
        <ExerciseQuestionsList
          exerciseId={exercise.id}
          questions={exercise.questions}
          expandedHints={expandedHints}
          expandedSolutions={expandedSolutions}
          onToggleHint={onToggleHint}
          onToggleSolution={onToggleSolution}
          activeQuestionIdx={activeQuestionIdx}
          onSelectQuestion={(idx) => setActiveQuestionIdx((cur) => cur === idx ? null : idx)}
        />
      </CardContent>
    </Card>
  );
}
