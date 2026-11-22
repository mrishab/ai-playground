import confetti from "canvas-confetti";
import { advanceRobotSimulation } from "./robotStepHandler";
import { useRobotPoseState } from "./useRobotPoseState";

export function applyRobotStep(
  res: NonNullable<ReturnType<typeof advanceRobotSimulation>>,
  poseState: ReturnType<typeof useRobotPoseState>,
  setCurrentPlanIndex: (i: number) => void,
  setIsPlaying: (p: boolean) => void,
) {
  if (res.arrived) {
    setCurrentPlanIndex(res.nextIdx);
    poseState.setLog(res.log);
    if (res.isComplete) {
      setIsPlaying(false);
      confetti({ particleCount: 70, spread: 80 });
    }
  } else {
    poseState.setSensorWhiskers(res.sensorWhiskers);
    poseState.setRobotPose(res.newPose);
    if (res.log) {
      poseState.setLog(res.log);
    }
    if (
      res.newPose.x !== poseState.robotPose.x ||
      res.newPose.y !== poseState.robotPose.y
    ) {
      poseState.addBreadcrumb(res.newPose.x, res.newPose.y);
    }
  }
}
