import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ToolTutorialData } from "@/data/toolTutorials";

export function StripsTheoryCards({
  tutorial,
}: {
  tutorial: ToolTutorialData;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold">
            Algorithms & Frame Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-1 space-y-2 text-xs">
          {tutorial.algorithms.map((algo) => (
            <div
              key={algo.name}
              className="p-2.5 rounded-lg bg-secondary/30 border border-border/40 space-y-1"
            >
              <div className="flex items-center justify-between font-semibold">
                <span className="text-primary">{algo.name}</span>
                <span className="text-[10px] text-muted-foreground">
                  {algo.type}
                </span>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                {algo.concept}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold">
            Core Theory & Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-1 space-y-3 text-xs leading-relaxed">
          {tutorial.keyTakeaways.map((point) => (
            <div key={point} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
              <span className="text-foreground/90">{point}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
