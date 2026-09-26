import { ExerciseStepData } from "./exerciseStepTypes";
import { EXERCISE_ALGORITHMS } from "@/data/exerciseAlgorithmsData";

const TOOL_DEFAULT_EXERCISES: Record<string, string> = {
  robot: "2.A",
  search: "3.B",
  constraint: "4.A",
  csp: "4.A",
  hill: "4.C",
  deduction: "5.A",
  bayes: "6.C",
  dtree: "7.A",
  neural: "7.B",
  planning: "8.A",
  strips_to_csp: "8.C",
};

export function getExerciseStepsA(
  toolId: string,
  _sampleId?: string,
  exerciseId?: string,
): ExerciseStepData {
  if (exerciseId && EXERCISE_ALGORITHMS[exerciseId]) {
    return EXERCISE_ALGORITHMS[exerciseId];
  }
  const mapped = TOOL_DEFAULT_EXERCISES[toolId];
  if (mapped && EXERCISE_ALGORITHMS[mapped]) {
    return EXERCISE_ALGORITHMS[mapped];
  }
  return EXERCISE_ALGORITHMS["3.B"];
}
