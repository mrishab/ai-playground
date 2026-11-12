import { SLSStepContext } from "./hillTypes";
import { stepMinConflicts, stepRandomWalk } from "./hillHeuristics";
import {
  stepAnnealing,
  stepTabu,
  stepGreedyDescent,
} from "./hillMetaheuristics";

export function executeSLSStep(ctx: SLSStepContext) {
  const {
    problem,
    assignment,
    conflicts,
    algorithm,
    randomWalkProb,
    temperature,
    tabuList,
    tabuTenure,
  } = ctx;

  if (!problem?.variables || problem.variables.length === 0) {
    return {
      nextAssign: assignment,
      newConflicts: 0,
      log: "No variables in problem.",
      newTabuList: tabuList,
      newTemperature: temperature,
      stopped: true,
    };
  }

  if (algorithm === "min_conflicts") {
    return {
      ...stepMinConflicts(problem, assignment),
      newTabuList: tabuList,
      newTemperature: temperature,
      stopped: false,
    };
  }
  if (algorithm === "random_walk") {
    return {
      ...stepRandomWalk(problem, assignment, randomWalkProb),
      newTabuList: tabuList,
      newTemperature: temperature,
      stopped: false,
    };
  }
  if (algorithm === "annealing") {
    const res = stepAnnealing(problem, assignment, conflicts, temperature);
    return { ...res, newTabuList: tabuList, stopped: false };
  }
  if (algorithm === "tabu") {
    const res = stepTabu(problem, assignment, tabuList, tabuTenure);
    return { ...res, newTemperature: temperature, stopped: false };
  }
  const res = stepGreedyDescent(problem, assignment, conflicts);
  return {
    nextAssign: res.nextAssign,
    newConflicts: res.newConflicts,
    log: res.log,
    newTabuList: tabuList,
    newTemperature: temperature,
    stopped: res.plateau,
  };
}
