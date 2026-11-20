import confetti from "canvas-confetti";
import { synthesizePlan } from "./planningSynthesizer";
import { PlanningProblem } from "@/data/planningProblems";
import { ActionStep } from "./planningTypes";

export function initPlanState(problem: PlanningProblem): {
  steps: ActionStep[];
  log: string;
} {
  const steps = synthesizePlan(problem.id);
  return {
    steps,
    log: `Problem "${problem.name}" initialized with ${steps.length} STRIPS actions.`,
  };
}

export function firePlanningConfetti(count = 60, spread = 70) {
  confetti({ particleCount: count, spread });
}
