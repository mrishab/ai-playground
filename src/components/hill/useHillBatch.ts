import { useState, useCallback } from "react";
import { CSPProblem } from "@/data/cspProblems";
import { BatchResult } from "./hillTypes";
import { runBatchSimulations } from "./hillBatchRunner";

export function useHillBatch(
  problem: CSPProblem,
  setLog: (msg: string) => void,
) {
  const [batchStats, setBatchStats] = useState<BatchResult | null>(null);

  const runBatchRuns = useCallback(
    (trials = 50) => {
      const s = runBatchSimulations(problem, trials);
      setBatchStats(s);
      setLog(`Batch run finished: ${s.successes}/${trials} solved.`);
    },
    [problem, setLog],
  );

  return { batchStats, setBatchStats, runBatchRuns };
}
