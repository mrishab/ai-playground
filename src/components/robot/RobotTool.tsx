import React from "react";
import { useRobotSimulation } from "./useRobotSimulation";
import { RobotCanvasCard } from "./RobotCanvasCard";
import { RobotTelemetryCard } from "./RobotTelemetryCard";
import { RobotSettingsCard } from "./RobotSettingsCard";
import { RobotPlanList } from "./RobotPlanList";
import { RobotTabs } from "./RobotTabs";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { CodeSandbox } from "../CodeSandbox";
import { ROBOT_CODE_TEMPLATE } from "./robotCodeTemplate";
import { ROBOT_PREBUILT_ITEMS, ROBOT_ALGORITHM_ITEMS } from "./robotWorkspaceData";

export function RobotTool() {
  const d = useRobotSimulation();
  const isComplete = d.currentPlanIndex >= d.world.plan.length;

  return (
    <StudioWorkspace
      title="Autonomous Robot Control Lab" category={d.tutorial.badge} description={d.world.description}
      prebuiltLabel="Robot World" prebuiltItems={ROBOT_PREBUILT_ITEMS} selectedPrebuiltId={d.selectedWorldId} onSelectPrebuiltId={d.setSelectedWorldId}
      algorithmItems={ROBOT_ALGORITHM_ITEMS} selectedAlgorithmId={d.algo} onSelectAlgorithmId={d.setAlgo} activeLogMessage={d.log}
      exportData={{ toolType: "robot", problem: d.world, filename: `${d.world.id || "robot"}-world` }}
      onImportProblem={(data) => {
        if (!data.problem || (!Array.isArray(data.problem.locations) && !data.problem.robot)) throw new Error("Invalid robot world: missing locations or robot pose");
        d.handleImportWorld(data.problem);
      }}
      onResetProblem={d.handleResetWorld}
      statsBadges={[{ label: "Plan Steps", value: `${d.currentPlanIndex}/${d.world.plan.length}`, variant: isComplete ? "success" : "cyan" }, { label: "Status", value: isComplete ? "Goal Reached" : "Navigating", variant: isComplete ? "success" : "outline" }]}
      controls={{
        onStep: d.stepSimulation, stepLabel: "Advance", isPlaying: d.isPlaying,
        onTogglePlay: () => d.setIsPlaying(!d.isPlaying), onReset: d.initializeWorld,
        speed: d.speed, setSpeed: d.setSpeed, isDone: isComplete,
      }}
      animationSlot={
        <RobotCanvasCard
          isPlaying={d.isPlaying} onTogglePlay={() => d.setIsPlaying(!d.isPlaying)}
          onStep={d.stepSimulation} onReset={d.initializeWorld} currentPlanIndex={d.currentPlanIndex}
          world={d.world} robotPose={d.robotPose} breadcrumbs={d.breadcrumbs} log={d.log} speed={d.speed} setSpeed={d.setSpeed}
        />
      }
      codingSlot={<CodeSandbox title="Robot Controller Code" initialCode={ROBOT_CODE_TEMPLATE} algorithmName={d.algo === "wall_following" ? "Reactive Wall Following" : "Sense-Plan-Act"} />}
      theorySlot={<RobotTabs tutorial={d.tutorial} />}
      inspectorSlot={
        <div className="space-y-4">
          <RobotTelemetryCard sensorWhiskers={d.sensorWhiskers} robotPose={d.robotPose} />
          <RobotSettingsCard steeringGain={d.steeringGain} setSteeringGain={d.setSteeringGain} obstacleSensitivity={d.obstacleSensitivity} setObstacleSensitivity={d.setObstacleSensitivity} />
        </div>
      }
      stateSlot={<RobotPlanList plan={d.world.plan} currentPlanIndex={d.currentPlanIndex} />}
    />
  );
}
