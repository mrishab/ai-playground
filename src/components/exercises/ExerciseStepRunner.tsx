import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { useExerciseStepper } from "./useExerciseStepper";
import { ExerciseStepControls } from "./ExerciseStepControls";
import { ExerciseStepBadges } from "./ExerciseStepBadges";
import { ExerciseStepRunnerHeader } from "./ExerciseStepRunnerHeader";

interface RunnerProps {
  toolId: string;
  sampleId?: string;
  exerciseId?: string;
  activeQuestionIdx?: number | null;
  onClearQuestionIdx?: () => void;
}

export function ExerciseStepRunner(p: RunnerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const s = useExerciseStepper(p.toolId, p.sampleId, p.exerciseId, p.activeQuestionIdx);
  const effectiveOpen = isOpen || p.activeQuestionIdx != null;

  const handleToggle = () => {
    if (effectiveOpen) { setIsOpen(false); p.onClearQuestionIdx?.(); } else setIsOpen(true);
  };

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 overflow-hidden transition-colors">
      <ExerciseStepRunnerHeader
        algorithmName={s.algorithmName}
        isOpen={effectiveOpen}
        onToggleOpen={handleToggle}
        hasActiveQuestion={p.activeQuestionIdx != null}
        onClearQuestion={p.onClearQuestionIdx}
      />
      {effectiveOpen && (
        <div className="p-3 border-t border-primary/15 bg-background/50 space-y-2.5 animate-step-enter">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-[10px] text-primary">{s.currentStep.stateBadge}</Badge>
              <span className="font-semibold text-foreground text-xs">{s.currentStep.label}</span>
            </div>
            <ExerciseStepControls
              stepIndex={s.stepIndex}
              totalSteps={s.steps.length}
              isPlaying={s.isPlaying}
              onStepForward={s.stepForward}
              onStepBack={s.stepBack}
              onTogglePlay={s.togglePlay}
              speed={s.speed}
              setSpeed={s.setSpeed}
            />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{s.currentStep.detail}</p>
          <ExerciseStepBadges step={s.currentStep} />
        </div>
      )}
    </div>
  );
}
