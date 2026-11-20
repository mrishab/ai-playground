import { useEffect } from "react";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";
import { useHillSettings } from "./useHillSettings";
import { useHillState } from "./useHillState";
import { useHillStepper } from "./useHillStepper";
import { useHillProblemSelection } from "./useHillProblemSelection";

export function useHillClimbing() {
  const cfg = useHillSettings();
  const probState = useHillProblemSelection(cfg.selectedProblemId, cfg.setSelectedProblemId);
  const s = useHillState(probState.problem, cfg.setTemperature);

  const stepSLS = useHillStepper({
    problem: probState.problem,
    assignment: s.assignment,
    conflicts: s.conflicts,
    tabuList: s.tabuList,
    applyStepResult: s.applyStepResult,
    algorithm: cfg.algorithm,
    randomWalkProb: cfg.randomWalkProb,
    temperature: cfg.temperature,
    tabuTenure: cfg.tabuTenure,
    setIsPlaying: cfg.setIsPlaying,
  });

  useEffect(() => {
    cfg.setIsPlaying(false);
    s.initializeAssignment();
    // react-doctor-disable-next-line react-doctor/exhaustive-deps
  }, [probState.problem]);

  useSimulationTimer(
    cfg.isPlaying,
    s.conflicts > 0,
    () => { if (!stepSLS()) cfg.setIsPlaying(false); },
    1050 - cfg.speed,
  );

  return {
    ...cfg,
    ...probState,
    tutorial: TOOL_TUTORIALS.hill,
    ...s,
    stepSLS,
  };
}
