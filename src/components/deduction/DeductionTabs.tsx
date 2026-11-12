import React from "react";
import { ToolTutorialData } from "@/data/toolTutorials";
import { StandardTutorialTabs } from "@/components/shared/StandardTutorialTabs";

export function DeductionTabs({
  tutorial,
}: {
  queryInput?: string;
  kbCode?: string;
  tutorial: ToolTutorialData;
}) {
  return <StandardTutorialTabs tutorial={tutorial} />;
}
