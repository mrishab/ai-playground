import { useState, useCallback, useMemo, useEffect } from "react";
import { getExerciseStepsA } from "./exerciseStepsA";
import { getExerciseQuestionSteps } from "./exerciseStepsB";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";

export function useExerciseStepper(
  toolId: string,
  sampleId?: string,
  exerciseId?: string,
  questionIdx?: number | null,
  branch?: string | number,
) {
  const base = useMemo(() => getExerciseStepsA(toolId, sampleId, exerciseId), [toolId, sampleId, exerciseId]);
  const steps = useMemo(() => {
    if (exerciseId != null && questionIdx != null) {
      return getExerciseQuestionSteps(exerciseId, questionIdx) || base.steps;
    }
    return base.steps;
  }, [exerciseId, questionIdx, base]);

  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, [toolId, sampleId, exerciseId, questionIdx, branch, steps]);

  const stepForward = useCallback(() => setStepIndex((i) => (i >= steps.length - 1 ? i : i + 1)), [steps.length]);
  const stepBack = useCallback(() => setStepIndex((i) => Math.max(0, i - 1)), []);
  const togglePlay = useCallback(() => {
    setStepIndex((i) => (i >= steps.length - 1 ? 0 : i));
    setIsPlaying((p) => !p);
  }, [steps.length]);
  const reset = useCallback(() => { setStepIndex(0); setIsPlaying(false); }, []);

  useSimulationTimer(isPlaying, stepIndex < steps.length - 1, stepForward, 1050 - speed);

  const name = questionIdx != null ? `Q${questionIdx + 1} Logic: ${base.algorithmName}` : base.algorithmName;

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


