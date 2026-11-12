import React from "react";
import { ToolTutorialData } from "@/data/toolTutorials";
import { StandardTutorialTabs } from "../shared/StandardTutorialTabs";

export function ConstraintTabs({
  tutorial,
}: {
  codeTemplate?: string;
  tutorial: ToolTutorialData;
}) {
  return <StandardTutorialTabs tutorial={tutorial} />;
}
