import { RobotWall, RobotPose } from "@/data/robotProblems";
import { pointToSegmentDist } from "./robotMath";

export function castRay(
  rx: number,
  ry: number,
  angleDeg: number,
  walls: RobotWall[],
  maxDist = 120,
): number {
  const rad = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  let closest = maxDist;

  const arenaWalls: RobotWall[] = [
    { x1: 0, y1: 0, x2: 600, y2: 0 },
    { x1: 600, y1: 0, x2: 600, y2: 360 },
    { x1: 600, y1: 360, x2: 0, y2: 360 },
    { x1: 0, y1: 360, x2: 0, y2: 0 },
    ...walls,
  ];

  for (const w of arenaWalls) {
    const wx = w.x2 - w.x1;
    const wy = w.y2 - w.y1;
    const denom = dx * wy - dy * wx;
    if (Math.abs(denom) < 1e-6) continue;

    const t = ((w.x1 - rx) * wy - (w.y1 - ry) * wx) / denom;
    const u = ((w.x1 - rx) * dy - (w.y1 - ry) * dx) / denom;

    if (t > 0 && t < closest && u >= 0 && u <= 1) {
      closest = t;
    }
  }

  return closest;
}

export function computeSensorWhiskers(
  pose: RobotPose,
  walls: RobotWall[],
): { left: number; front: number; right: number } {
  return {
    front: Math.round(castRay(pose.x, pose.y, pose.angle, walls, 100)),
    left: Math.round(castRay(pose.x, pose.y, pose.angle - 30, walls, 100)),
    right: Math.round(castRay(pose.x, pose.y, pose.angle + 30, walls, 100)),
  };
}

export function computeMinWallDist(
  x: number,
  y: number,
  walls: RobotWall[],
): number {
  let minDist = 50;
  for (const w of walls) {
    const d = pointToSegmentDist(x, y, w.x1, w.y1, w.x2, w.y2);
    if (d < minDist) minDist = d;
  }
  return minDist;
}

export function isWallCollision(
  x: number,
  y: number,
  walls: RobotWall[],
  threshold = 10,
): boolean {
  for (const w of walls) {
    if (pointToSegmentDist(x, y, w.x1, w.y1, w.x2, w.y2) < threshold) {
      return true;
    }
  }
  return false;
}
