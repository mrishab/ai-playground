import { RobotWorld, RobotPose, RobotWall } from "@/data/robotProblems";
import { computeSensorWhiskers, isWallCollision } from "./robotSensors";

export interface RobotControlOptions {
  algo?: string;
  steeringGain?: number;
  obstacleSensitivity?: number;
}

function ccw(ax: number, ay: number, bx: number, by: number, cx: number, cy: number) {
  return (cy - ay) * (bx - ax) > (by - ay) * (cx - ax);
}

function segmentsIntersect(
  x1: number, y1: number, x2: number, y2: number,
  x3: number, y3: number, x4: number, y4: number,
) {
  return (
    ccw(x1, y1, x3, y3, x4, y4) !== ccw(x2, y2, x3, y3, x4, y4) &&
    ccw(x1, y1, x2, y2, x3, y3) !== ccw(x1, y1, x2, y2, x4, y4)
  );
}

function isSegmentBlocked(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  walls: RobotWall[],
) {
  for (const w of walls) {
    if (segmentsIntersect(p1.x, p1.y, p2.x, p2.y, w.x1, w.y1, w.x2, w.y2)) {
      return true;
    }
  }
  return false;
}

export function findNextSensePlanActWaypoint(
  current: { x: number; y: number },
  target: { x: number; y: number },
  walls: RobotWall[],
): { x: number; y: number } {
  if (!isSegmentBlocked(current, target, walls)) {
    return target;
  }

  const candidates: { x: number; y: number }[] = [current, target];
  const offsets = [
    { dx: 0, dy: 30 }, { dx: 0, dy: -30 },
    { dx: 30, dy: 0 }, { dx: -30, dy: 0 },
    { dx: 25, dy: 25 }, { dx: -25, dy: 25 },
    { dx: 25, dy: -25 }, { dx: -25, dy: -25 },
  ];

  for (const w of walls) {
    for (const pt of [{ x: w.x1, y: w.y1 }, { x: w.x2, y: w.y2 }]) {
      for (const off of offsets) {
        const nx = pt.x + off.dx;
        const ny = pt.y + off.dy;
        if (nx >= 20 && nx <= 580 && ny >= 20 && ny <= 340) {
          if (!isWallCollision(nx, ny, walls, 15)) {
            candidates.push({ x: nx, y: ny });
          }
        }
      }
    }
  }

  const dist = new Map<string, number>();
  const prev = new Map<string, { x: number; y: number }>();
  const key = (p: { x: number; y: number }) => `${Math.round(p.x)},${Math.round(p.y)}`;
  dist.set(key(current), 0);

  const unvisited = [...candidates];
  while (unvisited.length > 0) {
    unvisited.sort((a, b) => (dist.get(key(a)) ?? Infinity) - (dist.get(key(b)) ?? Infinity));
    const u = unvisited.shift()!;
    const dU = dist.get(key(u)) ?? Infinity;
    if (dU === Infinity || (Math.round(u.x) === Math.round(target.x) && Math.round(u.y) === Math.round(target.y))) {
      break;
    }
    for (const v of unvisited) {
      if (!isSegmentBlocked(u, v, walls)) {
        const cost = Math.hypot(u.x - v.x, u.y - v.y);
        const alt = dU + cost;
        const kx = key(v);
        if (alt < (dist.get(kx) ?? Infinity)) {
          dist.set(kx, alt);
          prev.set(kx, u);
        }
      }
    }
  }

  let curr = target;
  let pathNode = target;
  while (prev.has(key(curr))) {
    const parent = prev.get(key(curr))!;
    if (Math.round(parent.x) === Math.round(current.x) && Math.round(parent.y) === Math.round(current.y)) {
      return curr;
    }
    pathNode = curr;
    curr = parent;
  }
  return pathNode;
}

export function computeNextRobotStep(
  robotPose: RobotPose,
  targetLoc: { x: number; y: number },
  world: RobotWorld,
  options: RobotControlOptions = {},
): {
  newPose: RobotPose;
  sensorWhiskers: { left: number; front: number; right: number };
  isStuck?: boolean;
} {
  const effectiveTarget =
    options.algo === "wall_following"
      ? targetLoc
      : findNextSensePlanActWaypoint(robotPose, targetLoc, world.walls);

  const dx = effectiveTarget.x - robotPose.x;
  const dy = effectiveTarget.y - robotPose.y;
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
    isStuck: tooClose && sensorWhiskers.front < 15,
  };
}
