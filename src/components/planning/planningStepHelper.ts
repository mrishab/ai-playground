import confetti from "canvas-confetti";
import { synthesizePlan } from "./planningSynthesizer";
import { PlanningProblem } from "@/data/planningProblems";
import { ActionStep } from "./planningTypes";
import { isGoalContradictory } from "./planningSearch";

export function initPlanState(
  problem: PlanningProblem,
  plannerType: "forward" | "regression" = "forward",
): {
  steps: ActionStep[];
  log: string;
  isUnsolvable: boolean;
} {
  const check = isGoalContradictory(problem);
  const steps = check.contradictory ? [] : synthesizePlan(problem, plannerType);
  const isUnsolvable =
    check.contradictory ||
    (steps.length === 0 && Array.isArray(problem.goal) && problem.goal.length > 0 && problem.id !== "blank");

  const plannerName =
    plannerType === "regression" ? "Goal Regression Planning" : "Forward State-Space Search";

  const log = isUnsolvable
    ? `Goal: Unsolvable - ${check.reason || "Detected contradictory or unreachable goal specification."}`
    : `${plannerName} synthesized ${steps.length} STRIPS actions for "${problem.name}".`;

  return {
    steps,
    log,
    isUnsolvable,
  };
}

export function firePlanningConfetti(count = 60, spread = 70) {
  confetti({ particleCount: count, spread });
}
