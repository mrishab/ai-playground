import { useEffect } from "react";
import { CSP_PROBLEMS, CSPProblem } from "@/data/cspProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { getHillCodeTemplate } from "./hillCodeTemplate";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";
import { useHillSettings } from "./useHillSettings";
import { useHillState } from "./useHillState";
import { useHillStepper } from "./useHillStepper";

export function useHillClimbing() {
  const cfg = useHillSettings();
  const problem: CSPProblem =
    CSP_PROBLEMS[cfg.selectedProblemId] || CSP_PROBLEMS.scheduling1;

  const s = useHillState(problem, cfg.setTemperature);
  const stepSLS = useHillStepper({
    problem,
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
  }, [problem]);

  useSimulationTimer(
    cfg.isPlaying,
    s.conflicts > 0,
    () => {
      if (!stepSLS()) cfg.setIsPlaying(false);
    },
    1050 - cfg.speed,
  );

  return {
    ...cfg,
    problem,
    tutorial: TOOL_TUTORIALS.hill,
    ...s,
    stepSLS,
    codeTemplate: getHillCodeTemplate(problem),
  };
}
