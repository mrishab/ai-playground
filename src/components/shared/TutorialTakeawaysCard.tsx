import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ToolTutorialData } from "@/data/toolTutorials";

export function TutorialTakeawaysCard({
  keyTakeaways,
}: {
  keyTakeaways: ToolTutorialData["keyTakeaways"];
}) {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">
          Core Theory & Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-3 text-xs leading-relaxed">
        {keyTakeaways.map((point) => (
          <div key={point} className="flex items-start gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 mt-1.5 shrink-0" />
            <span className="text-foreground/90">{point}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
