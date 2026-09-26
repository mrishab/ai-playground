import { useState, useEffect, useCallback } from "react";
import { ROBOT_WORLDS, RobotWorld } from "@/data/robotProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { useRobotPoseState } from "./useRobotPoseState";
import { useRobotStepper } from "./useRobotStepper";

export function useRobotSimulation() {
  const [selectedWorldId, setSelectedWorldId] = useState<string>("bookWorld");
  const world: RobotWorld =
    ROBOT_WORLDS[selectedWorldId] || ROBOT_WORLDS.bookWorld;
  const tutorial = TOOL_TUTORIALS.robot;

  const poseState = useRobotPoseState(world);
  const stepper = useRobotStepper(world, poseState);

  const initializeWorld = useCallback(() => {
    stepper.resetStepper();
    poseState.resetPoseState(world);
  }, [world, stepper.resetStepper, poseState.resetPoseState]);

  useEffect(() => {
    initializeWorld();
  }, [initializeWorld]);

  return {
    selectedWorldId,
    setSelectedWorldId,
    world,
    tutorial,
    ...stepper,
    ...poseState,
    initializeWorld,
  };
}
