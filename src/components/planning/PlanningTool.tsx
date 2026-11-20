import React from "react";
import { usePlanningTool } from "./usePlanningTool";
import { PlanningCanvasCard } from "./PlanningCanvasCard";
import { PlanningGoalCard } from "./PlanningGoalCard";
import { PlanningPlanStepsQueue } from "./PlanningPlanStepsQueue";
import { PlanningTabs } from "./PlanningTabs";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { PLANNING_PREBUILT_ITEMS, PLANNING_ALGORITHM_ITEMS } from "./planningWorkspaceData";

export function PlanningTool() {
  const d = usePlanningTool();
  const isGoalAchieved = d.currentStepIndex >= d.planSteps.length && d.planSteps.length > 0;
  const isUnsolvable = d.isUnsolvable;

  return (
    <StudioWorkspace
      title="STRIPS Planning Lab" category={d.tutorial.badge} description={d.problem.description}
      prebuiltLabel="Blocks World Problem" prebuiltItems={PLANNING_PREBUILT_ITEMS} selectedPrebuiltId={d.selectedProblemId}
      onSelectPrebuiltId={d.setSelectedProblemId} algorithmItems={PLANNING_ALGORITHM_ITEMS} selectedAlgorithmId={d.plannerType}
      onSelectAlgorithmId={(t) => d.setPlannerType(t as "forward" | "regression")} activeLogMessage={d.log}
      exportData={{ toolType: "planning", problem: d.problem, filename: `${d.problem.id || "planning"}-problem` }}
      onImportProblem={(data) => {
        if (!data.problem || (!Array.isArray(data.problem.blocks) && !data.problem.initial)) throw new Error("Invalid planning problem: missing blocks or initial state");
        d.handleImportProblem(data.problem);
      }}
      onResetProblem={d.handleResetProblem}
      statsBadges={[
        { label: "Steps", value: `${d.currentStepIndex}/${d.planSteps.length}`, variant: isGoalAchieved ? "success" : "cyan" },
        { label: "Goal", value: isGoalAchieved ? "Achieved" : isUnsolvable ? "Unsolvable" : "In Progress", variant: isGoalAchieved ? "success" : isUnsolvable ? "destructive" : "warning" }
      ]}
      controls={{
        onStep: d.stepExecution, stepLabel: "Advance", isPlaying: d.isExecuting,
        onTogglePlay: () => d.setIsExecuting(!d.isExecuting), onReset: d.initializeBlocks,
        speed: d.speed, setSpeed: d.setSpeed, isDone: isGoalAchieved || isUnsolvable,
      }}
      animationSlot={
        <PlanningCanvasCard
          isExecuting={d.isExecuting} onToggleExecute={() => d.setIsExecuting(!d.isExecuting)}
          onStep={d.stepExecution} onReset={d.initializeBlocks} currentStepIndex={d.currentStepIndex}
          totalSteps={d.planSteps.length} columns={d.columns} gripperColIndex={d.gripperColIndex}
          holdingBlock={d.holdingBlock} problem={d.problem} log={d.log} speed={d.speed} setSpeed={d.setSpeed}
        />
      }
      theorySlot={<PlanningTabs tutorial={d.tutorial} />}
      inspectorSlot={<PlanningGoalCard problem={d.problem} />}
      stateSlot={<PlanningPlanStepsQueue planSteps={d.planSteps} currentStepIndex={d.currentStepIndex} />}
    />
  );
}
