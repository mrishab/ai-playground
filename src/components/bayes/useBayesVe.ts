import { useState, useMemo, useCallback, useEffect } from "react";
import { BayesNetwork, EvidenceMap } from "@/data/bayesProblems";
import { VeStepSnapshot, getValidBayesQueryVar } from "./bayesVeTypes";
import { generateVeSteps } from "./bayesVeEngine";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";

export function useBayesVe(network: BayesNetwork, evidence: EvidenceMap) {
  const [queryVar, setQueryVar] = useState(() => getValidBayesQueryVar(network, evidence));
  const steps: VeStepSnapshot[] = useMemo(() => generateVeSteps(network, queryVar, evidence), [network, queryVar, evidence]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  useEffect(() => {
    const valid = network.nodes.some((n) => n.id === queryVar && n.type === "chance");
    if (!valid) {
      setQueryVar(getValidBayesQueryVar(network, evidence));
      setStepIndex(0);
    }
  }, [network, queryVar, evidence]);

  const handleSetQueryVar = useCallback((v: string) => {
    setQueryVar(v);
    setStepIndex(0);
  }, []);

  const safeStepIndex = Math.min(stepIndex, Math.max(0, steps.length - 1));

  const stepForward = useCallback(() => {
    if (stepIndex >= steps.length - 1) setIsPlaying(false);
    else setStepIndex((idx) => Math.min(idx + 1, steps.length - 1));
  }, [stepIndex, steps.length]);

  const stepBack = useCallback(() => setStepIndex((idx) => Math.max(0, idx - 1)), []);

  const togglePlay = useCallback(() => {
    if (safeStepIndex >= steps.length - 1) {
      setStepIndex(0);
      setIsPlaying(true);
    } else setIsPlaying((p) => !p);
  }, [safeStepIndex, steps.length]);

  const reset = useCallback(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, []);

  useSimulationTimer(isPlaying, safeStepIndex < steps.length - 1, stepForward, 1050 - speed);

  return {
    queryVar, setQueryVar: handleSetQueryVar, steps, stepIndex: safeStepIndex,
    currentStep: steps[safeStepIndex] || null, isPlaying, speed, setSpeed,
    stepForward, stepBack, togglePlay, reset,
  };
}
