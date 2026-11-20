import { useState, useEffect, useCallback, useMemo } from "react";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { useRobotPoseState } from "./useRobotPoseState";
import { useRobotStepper } from "./useRobotStepper";
import { useRobotWorldSelection } from "./useRobotWorldSelection";

export function useRobotSimulation() {
  const worldState = useRobotWorldSelection();
  const tutorial = TOOL_TUTORIALS.robot;
  const [algo, setAlgo] = useState("sense_plan_act");
  const [steeringGain, setSteeringGain] = useState(1.0);
  const [obstacleSensitivity, setObstacleSensitivity] = useState(30);

  const poseState = useRobotPoseState(worldState.world);
  const controlOptions = useMemo(
    () => ({ algo, steeringGain, obstacleSensitivity }),
    [algo, steeringGain, obstacleSensitivity],
  );
  const stepper = useRobotStepper(worldState.world, poseState, controlOptions);

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
    algo,
    setAlgo,
    steeringGain,
    setSteeringGain,
    obstacleSensitivity,
    setObstacleSensitivity,
    ...stepper,
    ...poseState,
    initializeWorld,
  };
}
