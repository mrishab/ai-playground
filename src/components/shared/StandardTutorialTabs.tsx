import React from "react";
import { BookOpen, Settings2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { ToolTutorialData } from "@/data/toolTutorials";
import { TutorialTheoryCards } from "./TutorialTheoryCards";
import { TutorialWalkthroughCards } from "./TutorialWalkthroughCards";

export function StandardTutorialTabs({
  tutorial,
}: {
  tutorial: ToolTutorialData;
}) {
  return (
    <Tabs defaultValue="concepts" className="mt-8">
      <TabsList className="grid grid-cols-2 max-w-sm">
        <TabsTrigger value="concepts" className="gap-1.5">
          <BookOpen className="h-3.5 w-3.5" /> Concepts & Lessons
        </TabsTrigger>
        <TabsTrigger value="walkthrough" className="gap-1.5">
          <Settings2 className="h-3.5 w-3.5" /> How To Use
        </TabsTrigger>
      </TabsList>

      <TabsContent value="concepts">
        <TutorialTheoryCards tutorial={tutorial} />
      </TabsContent>
      <TabsContent value="walkthrough">
        <TutorialWalkthroughCards tutorial={tutorial} />
      </TabsContent>
    </Tabs>
  );
}
