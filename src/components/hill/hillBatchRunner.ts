import { CSPProblem } from "@/data/cspProblems";
import { BatchResult } from "./hillTypes";
import { simulateTrial } from "./simulateTrial";

export function runBatchSimulations(
  problem: CSPProblem,
  trials = 50,
): BatchResult {
  let successes = 0;
  let totalSteps = 0;
  const distribution: number[] = [];

  for (let t = 0; t < trials; t++) {
    const step = simulateTrial(problem);
    if (step !== null) {
      successes++;
      totalSteps += step;
      distribution.push(step);
    }
  }

  return {
    trials,
    successes,
    avgSteps: successes > 0 ? totalSteps / successes : 0,
    stepDistribution: distribution,
  };
}
