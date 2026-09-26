import React from "react";
import { useRobotSimulation } from "./useRobotSimulation";
import { RobotHeader } from "./RobotHeader";
import { RobotCanvasCard } from "./RobotCanvasCard";
import { RobotTelemetryCard } from "./RobotTelemetryCard";
import { RobotPlanList } from "./RobotPlanList";
import { RobotTabs } from "./RobotTabs";

export function RobotTool() {
  const d = useRobotSimulation();
  const isComplete = d.currentPlanIndex >= d.world.plan.length;

  return (
    <div className="space-y-6">
      <RobotHeader
        world={d.world}
        selectedWorldId={d.selectedWorldId}
        onSelectWorldId={d.setSelectedWorldId}
        isComplete={isComplete}
        badgeText={d.tutorial.badge}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <RobotCanvasCard
            isPlaying={d.isPlaying}
            onTogglePlay={() => d.setIsPlaying(!d.isPlaying)}
            onStep={d.stepSimulation}
            onReset={d.initializeWorld}
            currentPlanIndex={d.currentPlanIndex}
            world={d.world}
            robotPose={d.robotPose}
            breadcrumbs={d.breadcrumbs}
            log={d.log}
            speed={d.speed}
            setSpeed={d.setSpeed}
          />
        </div>
        <div className="space-y-4">
          <RobotTelemetryCard
            sensorWhiskers={d.sensorWhiskers}
            robotPose={d.robotPose}
          />
          <RobotPlanList
            plan={d.world.plan}
            currentPlanIndex={d.currentPlanIndex}
          />
        </div>
      </div>
      <RobotTabs tutorial={d.tutorial} />
    </div>
  );
}
