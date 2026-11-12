import React from "react";
import { Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export function NeuralLossCard({ lossHistory }: { lossHistory: number[] }) {
  const maxLoss = Math.max(0.5, ...lossHistory);

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
          <Activity className="h-4 w-4 text-primary" />
          Loss Curve (MSE vs Epoch)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1">
        <div className="h-28 w-full bg-canvas rounded-lg border border-border/50 relative overflow-hidden flex items-end p-2">
          {lossHistory.length > 1 ? (
            <svg
              className="w-full h-full"
              viewBox={`0 0 ${Math.max(10, lossHistory.length * 10)} 100`}
              preserveAspectRatio="none"
            >
              <polyline
                className="transition-[stroke,opacity] duration-300 ease-out"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                points={lossHistory
                  .map(
                    (l, i) =>
                      `${i * 10},${Math.max(5, Math.min(95, 95 - (l / maxLoss) * 90))}`,
                  )
                  .join(" ")}
              />
            </svg>
          ) : (
            <div className="w-full text-center text-xs text-muted-foreground py-8">
              Train network to plot error curve.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
