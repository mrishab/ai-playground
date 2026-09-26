import { useState, useEffect, useCallback } from "react";
import { STRIPS_PROBLEMS, StripsProblem } from "@/data/stripsProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import confetti from "canvas-confetti";
import { solveStripsCsp } from "./stripsCspSolver";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";

export function useStripsToCsp() {
  const [selectedProblemId, setSelectedProblemId] = useState("coffeeDelivery");
  const problem: StripsProblem = STRIPS_PROBLEMS[selectedProblemId] || STRIPS_PROBLEMS.coffeeDelivery;
  const [horizonK, setHorizonK] = useState(3);
  const [isSolved, setIsSolved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const [extractedPlan, setExtractedPlan] = useState<string[]>([]);
  const [log, setLog] = useState("Unfolded STRIPS problem into CSP across time horizons.");

  useEffect(() => {
    const res = solveStripsCsp(problem.id, horizonK);
    setIsSolved(res.isSolved);
    setExtractedPlan(res.plan);
    setLog(res.log);
    if (res.isSolved) {
      confetti({ particleCount: 50, spread: 60 });
      setIsPlaying(false);
    }
  }, [horizonK, problem.id]);

  const stepForward = useCallback(() => setHorizonK((k) => Math.min(4, k + 1)), []);
  const resetHorizon = useCallback(() => { setHorizonK(0); setIsPlaying(false); }, []);
  const togglePlay = useCallback(() => {
    if (horizonK >= 4 || isSolved) {
      setHorizonK(0);
      setIsPlaying(true);
    } else setIsPlaying((p) => !p);
  }, [horizonK, isSolved]);

  useSimulationTimer(isPlaying, horizonK < 4 && !isSolved, stepForward, 1050 - speed);

  return {
    selectedProblemId,
    setSelectedProblemId,
    problem,
    tutorial: TOOL_TUTORIALS.strips_to_csp,
    horizonK,
    setHorizonK,
    isSolved,
    extractedPlan,
    log,
    isPlaying,
    speed,
    setSpeed,
    stepForward,
    resetHorizon,
    togglePlay,
  };
}
