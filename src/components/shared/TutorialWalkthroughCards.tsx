import React from "react";
import { Card } from "@/components/ui/Card";
import { ToolTutorialData } from "@/data/toolTutorials";

export function TutorialWalkthroughCards({
  tutorial,
}: {
  tutorial: ToolTutorialData;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {tutorial.walkthroughs.map((w) => (
        <Card key={w.step} className="p-4 space-y-2 bg-secondary/20">
          <span className="text-xs font-semibold text-primary">{w.step}</span>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {w.description}
          </p>
        </Card>
      ))}
    </div>
  );
}
