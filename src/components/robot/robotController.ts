import { RobotWorld, RobotPose } from "@/data/robotProblems";
import { computeSensorWhiskers, isWallCollision } from "./robotSensors";

export interface RobotControlOptions {
  algo?: string;
  steeringGain?: number;
  obstacleSensitivity?: number;
}

export function computeNextRobotStep(
  robotPose: RobotPose,
  targetLoc: { x: number; y: number },
  world: RobotWorld,
  options: RobotControlOptions = {},
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

  const sensorWhiskers = computeSensorWhiskers(robotPose, world.walls);
  const gain = options.steeringGain ?? 1.0;
  const thresh = options.obstacleSensitivity ?? 30;

  let steerStep: number;
  if (options.algo === "wall_following") {
    if (sensorWhiskers.front < thresh) {
      steerStep = (sensorWhiskers.right < sensorWhiskers.left ? -25 : 25) * gain;
    } else if (sensorWhiskers.right < thresh * 1.5) {
      const error = sensorWhiskers.right - thresh;
      steerStep = Math.max(-25, Math.min(25, error * 0.8 * gain));
    } else if (sensorWhiskers.left < thresh * 1.5) {
      const error = sensorWhiskers.left - thresh;
      steerStep = Math.max(-25, Math.min(25, -error * 0.8 * gain));
    } else {
      steerStep = Math.sign(angleDiff) * Math.min(15 * gain, Math.abs(angleDiff));
    }
  } else {
    steerStep = Math.sign(angleDiff) * Math.min(15 * gain, Math.abs(angleDiff));
    if (sensorWhiskers.front < thresh) {
      steerStep = (sensorWhiskers.right < sensorWhiskers.left ? -30 : 30) * gain;
    }
  }

  const newAngle = (((robotPose.angle + steerStep) % 360) + 360) % 360;
  const rad = (newAngle * Math.PI) / 180;
  const speed = 8;
  const newX = Math.max(15, Math.min(585, robotPose.x + speed * Math.cos(rad)));
  const newY = Math.max(15, Math.min(345, robotPose.y + speed * Math.sin(rad)));

  const tooClose = isWallCollision(newX, newY, world.walls, 10);

  return {
    newPose: tooClose
      ? { ...robotPose, angle: newAngle }
      : { x: newX, y: newY, angle: newAngle },
    sensorWhiskers,
  };
}
