import React from "react";
import { Sliders } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";

interface RobotSettingsCardProps {
  steeringGain: number;
  setSteeringGain: (v: number) => void;
  obstacleSensitivity: number;
  setObstacleSensitivity: (v: number) => void;
}

export function RobotSettingsCard({
  steeringGain,
  setSteeringGain,
  obstacleSensitivity,
  setObstacleSensitivity,
}: RobotSettingsCardProps) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
          <Sliders className="h-4 w-4 text-primary" />
          Controller Tuning
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-3 text-xs">
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-muted-foreground font-mono">
            <span>Steering Gain:</span>
            <span className="font-bold text-foreground">{steeringGain.toFixed(1)}x</span>
          </div>
          <Slider
            aria-label="Steering Gain"
            min={0.5}
            max={2.5}
            step={0.1}
            value={steeringGain}
            onChange={setSteeringGain}
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-muted-foreground font-mono">
            <span>Obstacle Avoidance:</span>
            <span className="font-bold text-foreground">{obstacleSensitivity} cm</span>
          </div>
          <Slider
            aria-label="Obstacle Avoidance Sensitivity"
            min={15}
            max={60}
            step={1}
            value={obstacleSensitivity}
            onChange={setObstacleSensitivity}
          />
        </div>
      </CardContent>
    </Card>
  );
}
