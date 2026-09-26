import { useState, useMemo, useCallback } from "react";
import { BayesNetwork, EvidenceMap } from "@/data/bayesProblems";
import { VeStepSnapshot } from "./bayesVeTypes";
import { generateVeSteps } from "./bayesVeEngine";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";

export function useBayesVe(network: BayesNetwork, evidence: EvidenceMap) {
  const defaultQuery = network.nodes.find((n) => n.type === "chance" && !evidence[n.id])?.id || network.nodes[0]?.id || "";
  const [queryVar, setQueryVar] = useState(defaultQuery);
  const steps: VeStepSnapshot[] = useMemo(() => generateVeSteps(network, queryVar, evidence), [network, queryVar, evidence]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  const safeStepIndex = Math.min(stepIndex, Math.max(0, steps.length - 1));

  const stepForward = useCallback(() => {
    if (stepIndex >= steps.length - 1) {
      setIsPlaying(false);
    } else {
      setStepIndex((idx) => Math.min(idx + 1, steps.length - 1));
    }
  }, [stepIndex, steps.length]);

  const stepBack = useCallback(() => setStepIndex((idx) => Math.max(0, idx - 1)), []);

  const togglePlay = useCallback(() => {
    if (safeStepIndex >= steps.length - 1) {
      setStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
  }, [safeStepIndex, steps.length]);

  const reset = useCallback(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, []);

  useSimulationTimer(isPlaying, safeStepIndex < steps.length - 1, stepForward, 1050 - speed);

  const currentStep = steps[safeStepIndex] || null;

  return { queryVar, setQueryVar, steps, stepIndex: safeStepIndex, currentStep, isPlaying, speed, setSpeed, stepForward, stepBack, togglePlay, reset };
}
