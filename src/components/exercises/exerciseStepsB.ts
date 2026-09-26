import { ExerciseStepItem } from "./exerciseStepTypes";
import { EXERCISE_ALGORITHMS } from "@/data/exerciseAlgorithmsData";

export function getExerciseQuestionSteps(
  exerciseId: string,
  questionIndex: number,
): ExerciseStepItem[] | null {
  const ex = EXERCISE_ALGORITHMS[exerciseId];
  if (!ex || !ex.questionSteps) return null;
  return ex.questionSteps[questionIndex] || null;
}
