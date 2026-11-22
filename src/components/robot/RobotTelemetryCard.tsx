import React from "react";
import { Compass } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { RobotPose } from "@/data/robotProblems";

export function RobotTelemetryCard({
  sensorWhiskers,
  robotPose,
}: {
  sensorWhiskers: { left: number; front: number; right: number };
  robotPose: RobotPose;
}) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
          <Compass className="h-4 w-4 text-primary" />
          Sensor Telemetry
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-2.5 text-xs font-mono">
        <div className="flex justify-between items-center p-2 rounded bg-secondary/30">
          <span className="text-muted-foreground">Front Range:</span>
          <span className="font-bold text-primary">
            {sensorWhiskers.front} cm
          </span>
        </div>
        <div className="flex justify-between items-center p-2 rounded bg-secondary/30">
          <span className="text-muted-foreground">Left Whisker:</span>
          <span className="font-bold text-foreground">
            {sensorWhiskers.left} cm
          </span>
        </div>
        <div className="flex justify-between items-center p-2 rounded bg-secondary/30">
          <span className="text-muted-foreground">Right Whisker:</span>
          <span className="font-bold text-foreground">
            {sensorWhiskers.right} cm
          </span>
        </div>
        <div className="flex justify-between items-center p-2 rounded bg-secondary/30">
          <span className="text-muted-foreground">Heading:</span>
          <span className="font-bold text-foreground">
            {robotPose.angle.toFixed(1)}°
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
