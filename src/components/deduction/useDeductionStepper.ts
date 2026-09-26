import { useState, useCallback } from "react";
import { generateSLDSteps } from "./sldStepRecorder";
import { SLDStepSnapshot } from "./deductionTypes";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";

export function useDeductionStepper() {
  const [steps, setSteps] = useState<SLDStepSnapshot[]>([]);
  const [stepIndex, setStepIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600);

  const initSteps = useCallback((query: string, code: string) => {
    const s = generateSLDSteps(query, code);
    setSteps(s);
    setStepIndex(0);
    setIsPlaying(false);
    return s;
  }, []);

  const stepForward = useCallback((query: string, code: string) => {
    if (steps.length === 0) {
      initSteps(query, code);
      return;
    }
    setStepIndex((idx) => (idx >= steps.length - 1 ? idx : idx + 1));
  }, [steps.length, initSteps]);

  const stepBack = useCallback(() => setStepIndex((idx) => Math.max(0, idx - 1)), []);

  const togglePlay = useCallback((query: string, code: string) => {
    if (steps.length === 0) {
      initSteps(query, code);
      setIsPlaying(true);
      return;
    }
    setStepIndex((idx) => (idx >= steps.length - 1 ? 0 : idx));
    setIsPlaying((p) => !p);
  }, [steps.length, initSteps]);

  useSimulationTimer(isPlaying, stepIndex < steps.length - 1, () => {
    setStepIndex((idx) => (idx < steps.length - 1 ? idx + 1 : idx));
  }, 1050 - speed);

  const currentStep = stepIndex >= 0 && stepIndex < steps.length ? steps[stepIndex] : null;

  return { steps, stepIndex, currentStep, isPlaying, speed, setSpeed, initSteps, stepForward, stepBack, togglePlay };
}
