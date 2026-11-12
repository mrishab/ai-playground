import React, { useState } from "react";
import { useRobotSimulation } from "./useRobotSimulation";
import { RobotCanvasCard } from "./RobotCanvasCard";
import { RobotTelemetryCard } from "./RobotTelemetryCard";
import { RobotPlanList } from "./RobotPlanList";
import { RobotTabs } from "./RobotTabs";
import { GraphBuilder } from "../graph_builder/GraphBuilder";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { CodeSandbox } from "../CodeSandbox";
import { ROBOT_CODE_TEMPLATE } from "./robotCodeTemplate";
import { ROBOT_PREBUILT_ITEMS, ROBOT_ALGORITHM_ITEMS } from "./robotWorkspaceData";

export function RobotTool() {
  const d = useRobotSimulation();
  const [algo, setAlgo] = useState("sense_plan_act");
  const isComplete = d.currentPlanIndex >= d.world.plan.length;

  return (
    <StudioWorkspace
      title="Autonomous Robot Control Lab"
      category={d.tutorial.badge}
      description={d.world.description}
      prebuiltLabel="Robot World"
      prebuiltItems={ROBOT_PREBUILT_ITEMS}
      selectedPrebuiltId={d.selectedWorldId}
      onSelectPrebuiltId={d.setSelectedWorldId}
      algorithmItems={ROBOT_ALGORITHM_ITEMS}
      selectedAlgorithmId={algo}
      onSelectAlgorithmId={setAlgo}
      activeLogMessage={d.log}
      exportData={{ toolType: "robot", problem: d.world, filename: `${d.world.id || "robot"}-world` }}
      onImportProblem={(data) => {
        if (!data.problem || (!Array.isArray(data.problem.locations) && !data.problem.robot)) throw new Error("Invalid robot world: missing locations or robot pose");
        d.handleImportWorld(data.problem);
      }}
      onResetProblem={d.handleResetWorld}
      statsBadges={[{ label: "Plan Steps", value: `${d.currentPlanIndex}/${d.world.plan.length}`, variant: isComplete ? "success" : "cyan" }, { label: "Status", value: isComplete ? "Goal Reached" : "Navigating", variant: isComplete ? "success" : "outline" }]}
      controls={{ onReset: d.initializeWorld, speed: d.speed, setSpeed: d.setSpeed }}
      animationSlot={
        <RobotCanvasCard
          isPlaying={d.isPlaying} onTogglePlay={() => d.setIsPlaying(!d.isPlaying)}
          onStep={d.stepSimulation} onReset={d.initializeWorld} currentPlanIndex={d.currentPlanIndex}
          world={d.world} robotPose={d.robotPose} breadcrumbs={d.breadcrumbs} log={d.log} speed={d.speed} setSpeed={d.setSpeed}
        />
      }
      graphBuilderSlot={<GraphBuilder />}
      codingSlot={<CodeSandbox title="Robot Controller Code" initialCode={ROBOT_CODE_TEMPLATE} algorithmName="Sense-Plan-Act" />}
      theorySlot={<RobotTabs tutorial={d.tutorial} />}
      inspectorSlot={<RobotTelemetryCard sensorWhiskers={d.sensorWhiskers} robotPose={d.robotPose} />}
      stateSlot={<RobotPlanList plan={d.world.plan} currentPlanIndex={d.currentPlanIndex} />}
    />
  );
}
