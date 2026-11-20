import { useState, useCallback } from "react";
import { RobotWorld } from "@/data/robotProblems";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";
import { advanceRobotSimulation } from "./robotStepHandler";
import { applyRobotStep } from "./robotStepApply";
import { useRobotPoseState } from "./useRobotPoseState";

export function useRobotStepper(
  world: RobotWorld,
  poseState: ReturnType<typeof useRobotPoseState>,
) {
  const [currentPlanIndex, setCurrentPlanIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600);

  const resetStepper = useCallback(() => {
    setIsPlaying(false);
    setCurrentPlanIndex(0);
  }, []);

  const stepSimulation = useCallback(() => {
    const res = advanceRobotSimulation(
      world,
      currentPlanIndex,
      poseState.robotPose,
    );
    if (res) {
      applyRobotStep(res, poseState, setCurrentPlanIndex, setIsPlaying);
    }
  }, [world, currentPlanIndex, poseState]);

  const interval = Math.max(30, Math.round((1050 - speed) / 4));
  useSimulationTimer(isPlaying, currentPlanIndex < world.plan.length, stepSimulation, interval);

  return {
    currentPlanIndex,
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    resetStepper,
    stepSimulation,
  };
}
