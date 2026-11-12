import React from "react";
import { ToolTutorialData } from "@/data/toolTutorials";
import { SearchGraph } from "@/data/searchProblems";
import { StandardTutorialTabs } from "../shared/StandardTutorialTabs";

interface SearchTabsProps {
  codeTemplate?: string;
  tutorial: ToolTutorialData;
  graph?: SearchGraph;
}

export function SearchTabs({ tutorial }: SearchTabsProps) {
  return <StandardTutorialTabs tutorial={tutorial} />;
}
