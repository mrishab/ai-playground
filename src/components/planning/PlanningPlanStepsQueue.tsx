import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { ActionStep } from "./planningTypes";
import { PlanningPlanStepItem } from "./PlanningPlanStepItem";

export function PlanningPlanStepsQueue({
  planSteps,
  currentStepIndex,
}: {
  planSteps: ActionStep[];
  currentStepIndex: number;
}) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">
          Generated Plan Steps
        </CardTitle>
        <CardDescription className="text-xs">
          Sequential STRIPS operators
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-2 text-xs max-h-60 overflow-y-auto">
        {planSteps.map((step, idx) => (
          <PlanningPlanStepItem
            key={`${step.name}-${step.args.join("-")}-${step.description}`}
            step={step}
            idx={idx}
            isDone={idx < currentStepIndex}
            isCurrent={idx === currentStepIndex}
          />
        ))}
      </CardContent>
    </Card>
  );
}
