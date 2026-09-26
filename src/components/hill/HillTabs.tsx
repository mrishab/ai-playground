import React from "react";
import { Code, BookOpen, Settings2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { ToolTutorialData } from "@/data/toolTutorials";
import { HillSandboxTab } from "./HillSandboxTab";
import { TutorialTheoryCards } from "../shared/TutorialTheoryCards";
import { TutorialWalkthroughCards } from "../shared/TutorialWalkthroughCards";

export function HillTabs({
  codeTemplate,
  tutorial,
}: {
  codeTemplate: string;
  tutorial: ToolTutorialData;
}) {
  return (
    <Tabs defaultValue="sandbox" className="mt-8">
      <TabsList className="grid grid-cols-3 max-w-md">
        <TabsTrigger value="sandbox" className="gap-1.5">
          <Code className="h-3.5 w-3.5" /> Run SLS Code
        </TabsTrigger>
        <TabsTrigger value="concepts" className="gap-1.5">
          <BookOpen className="h-3.5 w-3.5" /> Concepts & Lessons
        </TabsTrigger>
        <TabsTrigger value="walkthrough" className="gap-1.5">
          <Settings2 className="h-3.5 w-3.5" /> How To Use
        </TabsTrigger>
      </TabsList>

      <TabsContent value="sandbox">
        <HillSandboxTab codeTemplate={codeTemplate} />
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
