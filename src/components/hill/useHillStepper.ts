import { useCallback } from "react";
import confetti from "canvas-confetti";
import { executeSLSStep } from "./hillStepEngine";
import { HillStepperArgs } from "./hillTypes";

export function useHillStepper(args: HillStepperArgs) {
  const {
    problem,
    assignment,
    conflicts,
    tabuList,
    algorithm,
    randomWalkProb,
    temperature,
    tabuTenure,
    setIsPlaying,
    applyStepResult,
  } = args;

  return useCallback((): boolean => {
    if (conflicts === 0) {
      setIsPlaying(false);
      return false;
    }
    const res = executeSLSStep({
      problem,
      assignment,
      conflicts,
      algorithm,
      randomWalkProb,
      temperature,
      tabuList,
      tabuTenure,
    });
    applyStepResult(res);
    if (res.newConflicts === 0) {
      setIsPlaying(false);
      confetti({ particleCount: 70, spread: 80 });
      return false;
    }
    if (res.stopped) {
      setIsPlaying(false);
      return false;
    }
    return true;
  }, [
    problem,
    assignment,
    conflicts,
    tabuList,
    algorithm,
    randomWalkProb,
    temperature,
    tabuTenure,
    setIsPlaying,
    applyStepResult,
  ]);
}
