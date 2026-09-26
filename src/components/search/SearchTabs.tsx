import React from "react";
import { Code, BookOpen, Settings2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { ToolTutorialData } from "@/data/toolTutorials";
import { SearchGraph } from "@/data/searchProblems";
import { SearchSandboxTab } from "./SearchSandboxTab";
import { TutorialTheoryCards } from "../shared/TutorialTheoryCards";
import { TutorialWalkthroughCards } from "../shared/TutorialWalkthroughCards";

interface SearchTabsProps {
  codeTemplate: string;
  tutorial: ToolTutorialData;
  graph: SearchGraph;
}

export function SearchTabs({ codeTemplate, tutorial, graph }: SearchTabsProps) {
  return (
    <Tabs defaultValue="sandbox" className="mt-8">
      <TabsList className="grid grid-cols-3 max-w-md">
        <TabsTrigger value="sandbox" className="gap-1.5">
          <Code className="h-3.5 w-3.5" /> Run Algorithm Code
        </TabsTrigger>
        <TabsTrigger value="concepts" className="gap-1.5">
          <BookOpen className="h-3.5 w-3.5" /> Concepts & Lessons
        </TabsTrigger>
        <TabsTrigger value="walkthrough" className="gap-1.5">
          <Settings2 className="h-3.5 w-3.5" /> How To Use
        </TabsTrigger>
      </TabsList>

      <TabsContent value="sandbox">
        <SearchSandboxTab codeTemplate={codeTemplate} graph={graph} />
      </TabsContent>
      <TabsContent value="concepts">
        <TutorialTheoryCards tutorial={tutorial} />
      </TabsContent>
      <TabsContent value="walkthrough">
        <TutorialWalkthroughCards tutorial={tutorial} />
      </TabsContent>
    </Tabs>
  );
}
