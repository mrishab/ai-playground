import React from "react";
import { ToolTutorialData } from "@/data/toolTutorials";
import { StandardTutorialTabs } from "../shared/StandardTutorialTabs";

interface SearchTabsProps {
  tutorial: ToolTutorialData;
}

export function SearchTabs({ tutorial }: SearchTabsProps) {
  return <StandardTutorialTabs tutorial={tutorial} />;
}
