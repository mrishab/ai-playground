import { useEffect, useCallback } from "react";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { useRobotPoseState } from "./useRobotPoseState";
import { useRobotStepper } from "./useRobotStepper";
import { useRobotWorldSelection } from "./useRobotWorldSelection";

export function useRobotSimulation() {
  const worldState = useRobotWorldSelection();
  const tutorial = TOOL_TUTORIALS.robot;

  const poseState = useRobotPoseState(worldState.world);
  const stepper = useRobotStepper(worldState.world, poseState);

  const initializeWorld = useCallback(() => {
    stepper.resetStepper();
    poseState.resetPoseState(worldState.world);
  }, [worldState.world, stepper.resetStepper, poseState.resetPoseState]);

  useEffect(() => {
    initializeWorld();
  }, [initializeWorld]);

  return {
    ...worldState,
    tutorial,
    ...stepper,
    ...poseState,
    initializeWorld,
  };
}
