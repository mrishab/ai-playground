import { useState, useEffect } from "react";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";
import { useConstraintState } from "./useConstraintState";
import { useConstraintStepper } from "./useConstraintStepper";
import { isCspFullySolved, hasAnyWipeout } from "./ac3MacStep";
import { useConstraintProblemSelection } from "./useConstraintProblemSelection";

export function useConstraintTool() {
  const probState = useConstraintProblemSelection();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  const s = useConstraintState(probState.problem);
  const { fineStep, stepMacSearch, resetSolved } = useConstraintStepper(s, probState.problem);

  useEffect(() => {
    resetSolved();
    setIsPlaying(false);
    s.initializeCSP();
    // react-doctor-disable-next-line react-doctor/exhaustive-deps
  }, [probState.problem]);

  useSimulationTimer(
    isPlaying,
    s.arcQueue.length > 0,
    () => { if (!fineStep()) setIsPlaying(false); },
    1050 - speed,
  );

  return {
    ...probState,
    tutorial: TOOL_TUTORIALS.constraint,
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    ...s,
    fineStep,
    stepMacSearch,
    toggleAutoAC: () => setIsPlaying(!isPlaying),
    isCSPFullySolved: isCspFullySolved(s.domains) && s.arcQueue.length === 0,
    hasDomainWipeout: hasAnyWipeout(s.domains),
  };
}
