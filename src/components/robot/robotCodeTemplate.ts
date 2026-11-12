export const ROBOT_CODE_TEMPLATE = `// Robot Sense-Plan-Act Controller Reference Algorithm
function robotController(sensors, target, currentPose) {
  if (sensors.front < 20) {
    return { action: "turn", angle: 45, speed: 2 };
  }
  const dx = target.x - currentPose.x;
  const dy = target.y - currentPose.y;
  const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
  return { action: "moveForward", targetAngle, speed: 8 };
}

const action = robotController({ front: 45, left: 60, right: 30 }, { x: 450, y: 80 }, { x: 60, y: 90, angle: 0 });
return JSON.stringify(action, null, 2);
`;
