export interface ExerciseStepItem {
  step: number;
  label: string;
  detail: string;
  stateBadge: string;
  queueOrFrontier?: string;
  metric?: string;
}

export interface ExerciseStepData {
  algorithmName: string;
  steps: ExerciseStepItem[];
  questionSteps?: Record<number, ExerciseStepItem[]>;
}

