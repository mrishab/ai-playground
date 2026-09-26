import React from "react";
import { ROBOT_WORLDS, RobotWorld } from "@/data/robotProblems";
import { Badge } from "@/components/ui/Badge";

export function RobotHeader({
  world,
  selectedWorldId,
  onSelectWorldId,
  isComplete,
  badgeText,
}: {
  world: RobotWorld;
  selectedWorldId: string;
  onSelectWorldId: (id: string) => void;
  isComplete: boolean;
  badgeText: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold tracking-tight">
            Autonomous Robot Control Lab
          </span>
          <Badge variant="cyan">{badgeText}</Badge>
          {isComplete && <Badge variant="success">Mission Complete</Badge>}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          {world.description}
        </p>
      </div>

      <select
        aria-label="Select Robot World"
        value={selectedWorldId}
        onChange={(e) => onSelectWorldId(e.target.value)}
        className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {Object.values(ROBOT_WORLDS).map((w) => (
          <option key={w.id} value={w.id}>
            {w.name}
          </option>
        ))}
      </select>
    </div>
  );
}
