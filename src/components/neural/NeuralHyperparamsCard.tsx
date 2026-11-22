import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";

export function NeuralHyperparamsCard({
  learningRate,
  onLearningRateChange,
  momentum,
  onMomentumChange,
}: {
  learningRate: number;
  onLearningRateChange: (val: number) => void;
  momentum: number;
  onMomentumChange: (val: number) => void;
}) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">
          Training Hyperparameters
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-4 text-xs">
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Learning Rate (η):</span>
            <span className="font-mono text-primary font-bold">
              {learningRate.toFixed(2)}
            </span>
          </div>
          <Slider
            min={0.05}
            max={1.5}
            step={0.05}
            value={learningRate}
            onChange={onLearningRateChange}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Momentum (α):</span>
            <span className="font-mono text-primary font-bold">
              {momentum.toFixed(2)}
            </span>
          </div>
          <Slider
            min={0.0}
            max={0.95}
            step={0.05}
            value={momentum}
            onChange={onMomentumChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
