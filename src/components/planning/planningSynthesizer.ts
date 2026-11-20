import { ActionStep } from "./planningTypes";
import { PLANNING_PROBLEMS, PlanningProblem } from "@/data/planningProblems";
import {
  forwardSearch,
  goalRegressionSearch,
  isGoalContradictory,
} from "./planningSearch";

export function createInitialColumns(problem: string | PlanningProblem): string[][] {
  const cols: string[][] = [[], [], [], [], []];
  const problemId = typeof problem === "string" ? problem : problem.id;

  if (problemId === "blank") {
    return cols;
  }
  if (problemId === "sussman") {
    cols[0] = ["block1", "block3"];
    cols[1] = ["block2"];
    return cols;
  }
  if (problemId === "simpleSwap") {
    cols[0] = ["block1"];
    cols[1] = ["block2"];
    return cols;
  }
  if (problemId === "fiveBlocks") {
    cols[0] = ["block1", "block2"];
    cols[1] = ["block3", "block4", "block5"];
    return cols;
  }

  if (typeof problem === "object" && problem.initial) {
    let colIdx = 0;
    if (Array.isArray(problem.initial.stacks)) {
      for (const stack of problem.initial.stacks) {
        if (colIdx < cols.length && Array.isArray(stack)) {
          cols[colIdx] = [...stack];
          colIdx++;
        }
      }
    }
    if (Array.isArray(problem.initial.table)) {
      for (const blockId of problem.initial.table) {
        if (colIdx < cols.length) {
          cols[colIdx] = [blockId];
          colIdx++;
        }
      }
    }
    return cols;
  }

  cols[0] = ["block1", "block2"];
  cols[1] = ["block3"];
  return cols;
}

export function synthesizePlan(
  problem: string | PlanningProblem,
  plannerType: "forward" | "regression" = "forward",
): ActionStep[] {
  const problemObj: PlanningProblem | undefined =
    typeof problem === "string" ? PLANNING_PROBLEMS[problem] : problem;

  if (!problemObj || problemObj.id === "blank") {
    return [];
  }

  // Detect contradictory goals immediately
  const check = isGoalContradictory(problemObj);
  if (check.contradictory) {
    return [];
  }

  if (plannerType === "regression") {
    return goalRegressionSearch(problemObj);
  }

  return forwardSearch(problemObj);
}
