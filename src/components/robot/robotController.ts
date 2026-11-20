import { RobotWorld, RobotPose } from "@/data/robotProblems";
import { computeMinWallDist, isWallCollision } from "./robotSensors";

export function computeNextRobotStep(
  robotPose: RobotPose,
  targetLoc: { x: number; y: number },
  world: RobotWorld,
): {
  newPose: RobotPose;
  sensorWhiskers: { left: number; front: number; right: number };
} {
  const dx = targetLoc.x - robotPose.x;
  const dy = targetLoc.y - robotPose.y;
  const desiredAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

  let angleDiff = desiredAngle - robotPose.angle;
  while (angleDiff > 180) angleDiff -= 360;
  while (angleDiff < -180) angleDiff += 360;

  const minFrontDist = computeMinWallDist(
    robotPose.x,
    robotPose.y,
    world.walls,
  );
  const sensorWhiskers = {
    front: Math.round(minFrontDist),
    left: Math.round(minFrontDist * 1.2),
    right: Math.round(minFrontDist * 0.9),
  };

  let steerStep = Math.sign(angleDiff) * Math.min(15, Math.abs(angleDiff));
  if (minFrontDist < 25) steerStep = 30;

  const newAngle = (((robotPose.angle + steerStep) % 360) + 360) % 360;
  const rad = (newAngle * Math.PI) / 180;
  const newX = robotPose.x + 8 * Math.cos(rad);
  const newY = robotPose.y + 8 * Math.sin(rad);

  const tooClose = isWallCollision(newX, newY, world.walls, 10);

  return {
    newPose: tooClose
      ? { ...robotPose, angle: newAngle }
      : { x: newX, y: newY, angle: newAngle },
    sensorWhiskers,
  };
}
