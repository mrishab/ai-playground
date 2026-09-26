import { useState, useCallback } from "react";
import { CSPProblem } from "@/data/cspProblems";
import { TabuItem, VariableAssignment } from "./hillTypes";
import { initHillAssignment } from "./hillEvaluation";
import { executeSLSStep } from "./hillStepEngine";
import { useHillBatch } from "./useHillBatch";

export function useHillState(
  problem: CSPProblem,
  setTemperature: (t: number) => void,
) {
  const [assignment, setAssignment] = useState<VariableAssignment>({});
  const [conflicts, setConflicts] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [conflictHistory, setConflictHistory] = useState<number[]>([]);
  const [tabuList, setTabuList] = useState<TabuItem[]>([]);
  const [log, setLog] = useState("Initialized random total assignment.");

  const batch = useHillBatch(problem, setLog);

  const initializeAssignment = useCallback(() => {
    const { assignment: initAssign, conflicts: initConflicts } =
      initHillAssignment(problem);
    setAssignment(initAssign);
    setConflicts(initConflicts);
    setStepCount(0);
    setConflictHistory([initConflicts]);
    setTabuList([]);
    batch.setBatchStats(null);
    setTemperature(10.0);
    setLog(`Generated random assignment with ${initConflicts} conflicts.`);
  }, [problem, setTemperature, batch.setBatchStats]);

  const applyStepResult = useCallback(
    (res: ReturnType<typeof executeSLSStep>) => {
      setAssignment(res.nextAssign);
      setConflicts(res.newConflicts);
      setStepCount((p) => p + 1);
      setConflictHistory((p) => [...p.slice(-100), res.newConflicts]);
      setTabuList(res.newTabuList);
      setTemperature(res.newTemperature);
      setLog(res.log);
    },
    [setTemperature],
  );

  return {
    assignment,
    conflicts,
    stepCount,
    conflictHistory,
    tabuList,
    log,
    ...batch,
    initializeAssignment,
    applyStepResult,
  };
}
