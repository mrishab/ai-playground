import React from "react";
import { BookOpen, Settings2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { StripsProblem } from "@/data/stripsProblems";
import { ToolTutorialData } from "@/data/toolTutorials";
import { StripsTheoryCards } from "./StripsTheoryCards";
import { StripsWalkthroughCards } from "./StripsWalkthroughCards";

export function StripsToCspTabs({
  tutorial,
}: {
  problem?: StripsProblem;
  horizonK?: number;
  tutorial: ToolTutorialData;
}) {
  return (
    <Tabs defaultValue="concepts" className="mt-8">
      <TabsList className="grid grid-cols-2 max-w-sm">
        <TabsTrigger value="concepts" className="gap-1.5">
          <BookOpen className="h-3.5 w-3.5" />
          Concepts & Lessons
        </TabsTrigger>
        <TabsTrigger value="walkthrough" className="gap-1.5">
          <Settings2 className="h-3.5 w-3.5" />
          How To Use
        </TabsTrigger>
      </TabsList>

      <TabsContent value="concepts">
        <StripsTheoryCards tutorial={tutorial} />
      </TabsContent>

      <TabsContent value="walkthrough">
        <StripsWalkthroughCards tutorial={tutorial} />
      </TabsContent>
    </Tabs>
  );
}
