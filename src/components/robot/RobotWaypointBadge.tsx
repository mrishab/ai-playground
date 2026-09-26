import React from "react";
import { Badge } from "@/components/ui/Badge";
import { RobotWorld } from "@/data/robotProblems";

export function RobotWaypointBadge({
  world,
  currentPlanIndex,
}: {
  world: RobotWorld;
  currentPlanIndex: number;
}) {
  const target =
    world.plan[currentPlanIndex] || world.plan[world.plan.length - 1];
  const stepCount = Math.min(currentPlanIndex + 1, world.plan.length);

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground text-[11px]">
        Waypoint Target:
      </span>
      <Badge variant="purple" className="font-mono text-xs">
        {target} ({stepCount}/{world.plan.length})
      </Badge>
    </div>
  );
}
