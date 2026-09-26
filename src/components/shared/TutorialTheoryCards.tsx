import React from "react";
import { ToolTutorialData } from "@/data/toolTutorials";
import { TutorialAlgorithmsCard } from "./TutorialAlgorithmsCard";
import { TutorialTakeawaysCard } from "./TutorialTakeawaysCard";

export function TutorialTheoryCards({
  tutorial,
}: {
  tutorial: ToolTutorialData;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TutorialAlgorithmsCard algorithms={tutorial.algorithms} />
      <TutorialTakeawaysCard keyTakeaways={tutorial.keyTakeaways} />
    </div>
  );
}
