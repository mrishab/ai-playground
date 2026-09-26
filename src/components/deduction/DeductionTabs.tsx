import React from "react";
import { Code, BookOpen, Settings2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { ToolTutorialData } from "@/data/toolTutorials";
import { TutorialTheoryCards } from "@/components/shared/TutorialTheoryCards";
import { TutorialWalkthroughCards } from "@/components/shared/TutorialWalkthroughCards";
import { DeductionSandboxTab } from "./DeductionSandboxTab";

export function DeductionTabs({
  queryInput,
  kbCode,
  tutorial,
}: {
  queryInput: string;
  kbCode: string;
  tutorial: ToolTutorialData;
}) {
  return (
    <Tabs defaultValue="sandbox" className="mt-8">
      <TabsList className="grid grid-cols-3 max-w-md">
        <TabsTrigger value="sandbox" className="gap-1.5">
          <Code className="h-3.5 w-3.5" />
          Run Deduction Code
        </TabsTrigger>
        <TabsTrigger value="concepts" className="gap-1.5">
          <BookOpen className="h-3.5 w-3.5" />
          Concepts & Lessons
        </TabsTrigger>
        <TabsTrigger value="walkthrough" className="gap-1.5">
          <Settings2 className="h-3.5 w-3.5" />
          How To Use
        </TabsTrigger>
      </TabsList>

      <TabsContent value="sandbox">
        <DeductionSandboxTab queryInput={queryInput} kbCode={kbCode} />
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
