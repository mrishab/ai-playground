import { RobotWall } from "@/data/robotProblems";
import { pointToSegmentDist } from "./robotMath";

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
