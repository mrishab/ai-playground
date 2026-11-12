import React from "react";
import { ToolTutorialData } from "@/data/toolTutorials";
import { StandardTutorialTabs } from "@/components/shared/StandardTutorialTabs";

export function PlanningTabs({
  tutorial,
}: {
  planLength?: number;
  tutorial: ToolTutorialData;
}) {
  return <StandardTutorialTabs tutorial={tutorial} />;
}
