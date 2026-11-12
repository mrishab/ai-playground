import React from "react";
import { DataPoint } from "@/data/neuralProblems";
import { ToolTutorialData } from "@/data/toolTutorials";
import { StandardTutorialTabs } from "@/components/shared/StandardTutorialTabs";

export function NeuralTabs({
  tutorial,
}: {
  points?: DataPoint[];
  tutorial: ToolTutorialData;
}) {
  return <StandardTutorialTabs tutorial={tutorial} />;
}
