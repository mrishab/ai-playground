import { useState } from "react";
import { ROBOT_WORLDS, RobotWorld } from "@/data/robotProblems";

export function useRobotWorldSelection() {
  const [selectedWorldId, setSelectedWorldId] = useState<string>("bookWorld");
  const [customWorld, setCustomWorld] = useState<RobotWorld | null>(null);

  const world: RobotWorld =
    selectedWorldId === "custom" && customWorld
      ? customWorld
      : ROBOT_WORLDS[selectedWorldId] || ROBOT_WORLDS.bookWorld;

  const handleImportWorld = (imported: RobotWorld) => {
    setCustomWorld({
      ...imported,
      locations: Array.isArray(imported.locations) ? imported.locations : [],
      walls: Array.isArray(imported.walls) ? imported.walls : [],
      robot: imported.robot || { x: 0, y: 0, angle: 0 },
      plan: Array.isArray(imported.plan) ? imported.plan : [],
    });
    setSelectedWorldId("custom");
  };

  const handleResetWorld = () => {
    setCustomWorld({
      id: "blank",
      name: "Empty World",
      description: "Reset empty robot world",
      locations: [],
      walls: [],
      robot: { x: 0, y: 0, angle: 0 },
      plan: [],
    });
    setSelectedWorldId("custom");
  };

  const handleSelectWorldId = (id: string) => {
    setSelectedWorldId(id);
    if (id !== "custom" && ROBOT_WORLDS[id]) {
      setCustomWorld(ROBOT_WORLDS[id]);
    }
  };

  return {
    selectedWorldId,
    setSelectedWorldId: handleSelectWorldId,
    customWorld,
    world,
    handleImportWorld,
    handleResetWorld,
  };
}
