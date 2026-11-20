import { useState, useCallback } from "react";
import { generateSLDSteps } from "./sldStepRecorder";
import { generateBottomUpSteps } from "./bottomUpRunner";
import { SLDStepSnapshot } from "./deductionTypes";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";

export function useDeductionStepper() {
  const [steps, setSteps] = useState<SLDStepSnapshot[]>([]);
  const [stepIndex, setStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  const initSteps = useCallback((q: string, code: string, algo = "sld") => {
    const s = algo === "bottom_up" ? generateBottomUpSteps(q, code) : generateSLDSteps(q, code);
    setSteps(s);
    setStepIndex(0);
    setIsPlaying(false);
    return s;
  }, []);

  const stepForward = useCallback((q: string, code: string, algo = "sld") => {
    if (steps.length === 0) { initSteps(q, code, algo); return; }
    setStepIndex((idx) => (idx >= steps.length - 1 ? idx : idx + 1));
  }, [steps.length, initSteps]);

  const stepBack = useCallback(() => setStepIndex((i) => Math.max(0, i - 1)), []);

  const nextAnswer = useCallback((q: string, code: string, algo = "sld") => {
    const sList = steps.length === 0 ? initSteps(q, code, algo) : steps;
    const curAns = stepIndex >= 0 && stepIndex < sList.length ? sList[stepIndex].answers.length : 0;
    const nextIdx = sList.findIndex((s, i) => i > stepIndex && s.answers.length > curAns);
    setStepIndex(nextIdx !== -1 ? nextIdx : sList.length - 1);
  }, [steps, stepIndex, initSteps]);

  const togglePlay = useCallback((q: string, code: string, algo = "sld") => {
    if (steps.length === 0) { initSteps(q, code, algo); setIsPlaying(true); return; }
    setStepIndex((idx) => (idx >= steps.length - 1 ? 0 : idx));
    setIsPlaying((p) => !p);
  }, [steps.length, initSteps]);

  useSimulationTimer(isPlaying, stepIndex < steps.length - 1, () => {
    setStepIndex((idx) => (idx < steps.length - 1 ? idx + 1 : idx));
  }, 1050 - speed);

  const resetStepper = useCallback(() => { setSteps([]); setStepIndex(-1); setIsPlaying(false); }, []);

  return {
    steps, stepIndex, setStepIndex, isPlaying, speed, setSpeed,
    currentStep: stepIndex >= 0 && stepIndex < steps.length ? steps[stepIndex] : null,
    initSteps, stepForward, stepBack, nextAnswer, togglePlay, resetStepper,
  };
}
