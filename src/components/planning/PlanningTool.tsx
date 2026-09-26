import React from "react";
import { usePlanningTool } from "./usePlanningTool";
import { PlanningHeader } from "./PlanningHeader";
import { PlanningCanvasCard } from "./PlanningCanvasCard";
import { PlanningGoalCard } from "./PlanningGoalCard";
import { PlanningPlanStepsQueue } from "./PlanningPlanStepsQueue";
import { PlanningTabs } from "./PlanningTabs";

export function PlanningTool() {
  const d = usePlanningTool();
  const isGoalAchieved =
    d.currentStepIndex >= d.planSteps.length && d.planSteps.length > 0;

  return (
    <div className="space-y-6">
      <PlanningHeader
        problem={d.problem}
        selectedProblemId={d.selectedProblemId}
        onSelectProblemId={d.setSelectedProblemId}
        plannerType={d.plannerType}
        onSelectPlannerType={d.setPlannerType}
        isGoalAchieved={isGoalAchieved}
        badgeText={d.tutorial.badge}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <PlanningCanvasCard
            isExecuting={d.isExecuting}
            onToggleExecute={() => d.setIsExecuting(!d.isExecuting)}
            onStep={d.stepExecution}
            onReset={d.initializeBlocks}
            currentStepIndex={d.currentStepIndex}
            totalSteps={d.planSteps.length}
            columns={d.columns}
            gripperColIndex={d.gripperColIndex}
            holdingBlock={d.holdingBlock}
            problem={d.problem}
            log={d.log}
            speed={d.speed}
            setSpeed={d.setSpeed}
          />
        </div>
        <div className="space-y-4">
          <PlanningGoalCard problem={d.problem} />
          <PlanningPlanStepsQueue
            planSteps={d.planSteps}
            currentStepIndex={d.currentStepIndex}
          />
        </div>
      </div>
      <PlanningTabs problemId={d.problem.id} tutorial={d.tutorial} />
    </div>
  );
}
