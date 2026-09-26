import { useState, useEffect } from "react";
import { CSP_PROBLEMS, CSPProblem } from "@/data/cspProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { getConstraintCodeTemplate } from "./constraintCodeTemplate";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";
import { useConstraintState } from "./useConstraintState";
import { useConstraintStepper } from "./useConstraintStepper";
import { isCspFullySolved, hasAnyWipeout } from "./ac3MacStep";

export function useConstraintTool() {
  const [selectedProblemId, setSelectedProblemId] = useState("simple1");
  const problem: CSPProblem =
    CSP_PROBLEMS[selectedProblemId] || CSP_PROBLEMS.simple1;
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  const s = useConstraintState(problem);
  const { fineStep, stepMacSearch, resetSolved } = useConstraintStepper(s, problem);

  useEffect(() => {
    resetSolved();
    setIsPlaying(false);
    s.initializeCSP();
    // react-doctor-disable-next-line react-doctor/exhaustive-deps
  }, [problem]);

  useSimulationTimer(
    isPlaying,
    s.arcQueue.length > 0,
    () => {
      if (!fineStep()) setIsPlaying(false);
    },
    1050 - speed,
  );

  return {
    selectedProblemId,
    setSelectedProblemId,
    problem,
    tutorial: TOOL_TUTORIALS.constraint,
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    ...s,
    fineStep,
    stepMacSearch,
    toggleAutoAC: () => setIsPlaying(!isPlaying),
    isCSPFullySolved: isCspFullySolved(s.domains),
    hasDomainWipeout: hasAnyWipeout(s.domains),
    codeTemplate: getConstraintCodeTemplate(problem),
  };
}
