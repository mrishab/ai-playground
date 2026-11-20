import { RobotWorld, RobotPose } from "@/data/robotProblems";
import { computeNextRobotStep, RobotControlOptions } from "./robotController";

export function advanceRobotSimulation(
  world: RobotWorld,
  currentPlanIndex: number,
  robotPose: RobotPose,
  options?: RobotControlOptions,
) {
  const targetLocName = world.plan[currentPlanIndex];
  const targetLoc = world.locations.find((l) => l.name === targetLocName);
  if (!targetLoc) return null;

  const dist = Math.hypot(targetLoc.x - robotPose.x, targetLoc.y - robotPose.y);
  if (dist < 20) {
    const nextIdx = currentPlanIndex + 1;
    const isComplete = nextIdx >= world.plan.length;
    return {
      arrived: true,
      isComplete,
      nextIdx,
      log: isComplete
        ? `Final destination "${targetLocName}" reached! Mission complete.`
        : `Reached waypoint "${targetLocName}"! Heading to next: "${world.plan[nextIdx]}".`,
      newPose: robotPose,
      sensorWhiskers: { left: 50, front: 50, right: 50 },
    };
  }

  const { newPose, sensorWhiskers } = computeNextRobotStep(
    robotPose,
    targetLoc,
    world,
    options,
  );
  return {
    arrived: false,
    isComplete: false,
    nextIdx: currentPlanIndex,
    log: "",
    newPose,
    sensorWhiskers,
  };
}
