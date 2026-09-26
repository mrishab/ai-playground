import React from "react";
import { CodeSandbox } from "@/components/CodeSandbox";

export function RobotSandboxTab() {
  const codeTemplate = `// Robot Controller
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

  return (
    <CodeSandbox
      title="Robot Controller Sandbox"
      algorithmName="Sense-Plan-Act Loop"
      initialCode={codeTemplate}
      notes="Tune steering thresholds, wall repulsion, and waypoint tracking."
      onRun={(code) => {
        try {
          // react-doctor-disable-next-line react-doctor/no-eval
          const func = new Function(code);
          const out = func();
          return {
            success: true,
            output:
              typeof out === "string" ? out : JSON.stringify(out, null, 2),
          };
        } catch (e: any) {
          return { success: false, output: e.message };
        }
      }}
    />
  );
}
