import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ToolTutorialData } from "@/data/toolTutorials";

export function TutorialAlgorithmsCard({
  algorithms,
}: {
  algorithms: ToolTutorialData["algorithms"];
}) {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">
          Algorithms & Methods
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-2 text-xs">
        {algorithms.map((algo) => (
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
  );
}
