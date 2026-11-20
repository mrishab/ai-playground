import { useState, useCallback, useMemo } from "react";
import { getExerciseStepsA } from "./exerciseStepsA";
import { getExerciseQuestionSteps } from "./exerciseStepsB";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";

export function useExerciseStepper(
  toolId: string,
  sampleId?: string,
  exerciseId?: string,
  questionIdx?: number | null,
) {
  const base = useMemo(
    () => getExerciseStepsA(toolId, sampleId, exerciseId),
    [toolId, sampleId, exerciseId],
  );
  const steps = useMemo(() => {
    if (exerciseId != null && questionIdx != null) {
      return getExerciseQuestionSteps(exerciseId, questionIdx) || base.steps;
    }
    return base.steps;
  }, [exerciseId, questionIdx, base]);

  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  const stepForward = useCallback(() => {
    setStepIndex((idx) => (idx >= steps.length - 1 ? idx : idx + 1));
  }, [steps.length]);
  const stepBack = useCallback(() => setStepIndex((idx) => Math.max(0, idx - 1)), []);
  const togglePlay = useCallback(() => {
    setStepIndex((idx) => (idx >= steps.length - 1 ? 0 : idx));
    setIsPlaying((p) => !p);
  }, [steps.length]);
  const reset = useCallback(() => { setStepIndex(0); setIsPlaying(false); }, []);

  useSimulationTimer(isPlaying, stepIndex < steps.length - 1, stepForward, 1050 - speed);

  const name =
    questionIdx != null
      ? `Q${questionIdx + 1} Logic: ${base.algorithmName}`
      : base.algorithmName;

  return {
    algorithmName: name,
    steps,
    stepIndex,
    currentStep: steps[stepIndex] || steps[0],
    isPlaying,
    speed,
    setSpeed,
    stepForward,
    stepBack,
    togglePlay,
    reset,
  };
}
