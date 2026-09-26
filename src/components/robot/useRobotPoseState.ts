import { useState, useCallback } from "react";
import { RobotWorld, RobotPose } from "@/data/robotProblems";

export function useRobotPoseState(world: RobotWorld) {
  const [robotPose, setRobotPose] = useState<RobotPose>(world.robot);
  const [breadcrumbs, setBreadcrumbs] = useState<{ x: number; y: number }[]>(
    [],
  );
  const [sensorWhiskers, setSensorWhiskers] = useState<{
    left: number;
    front: number;
    right: number;
  }>({ left: 50, front: 50, right: 50 });
  const [log, setLog] = useState<string>(
    "Robot ready at start pose. Click Play or Step to navigate.",
  );

  const resetPoseState = useCallback((w: RobotWorld) => {
    setRobotPose(w.robot);
    setBreadcrumbs([{ x: w.robot.x, y: w.robot.y }]);
    setSensorWhiskers({ left: 50, front: 50, right: 50 });
    setLog(
      `Loaded "${w.name}". Current waypoint target: ${w.plan[0] || "Goal"}.`,
    );
  }, []);

  const addBreadcrumb = useCallback((x: number, y: number) => {
    setBreadcrumbs((prev) => [...prev.slice(-150), { x, y }]);
  }, []);

  return {
    robotPose,
    setRobotPose,
    breadcrumbs,
    sensorWhiskers,
    setSensorWhiskers,
    log,
    setLog,
    resetPoseState,
    addBreadcrumb,
  };
}
