import React from "react";
import { Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export function NeuralLossCard({ lossHistory }: { lossHistory: number[] }) {
  const maxLoss = Math.max(0.5, ...lossHistory);
  const n = lossHistory.length;
  const pts = lossHistory
    .map((l, i) => `${(40 + (i / Math.max(1, n - 1)) * 245).toFixed(1)},${(95 - Math.min(1, Math.max(0, l / maxLoss)) * 80).toFixed(1)}`)
    .join(" ");

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
          <Activity className="h-4 w-4 text-primary" />
          Loss Curve (MSE vs Epoch)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1">
        <div className="h-32 w-full bg-canvas rounded-lg border border-border/50 relative overflow-hidden p-1">
          {n > 0 ? (
            <svg className="w-full h-full" viewBox="0 0 300 126">
              <line x1="40" y1="15" x2="40" y2="95" stroke="currentColor" className="text-border" strokeWidth="1" />
              <line x1="40" y1="95" x2="285" y2="95" stroke="currentColor" className="text-border" strokeWidth="1" />
              <line x1="40" y1="55" x2="285" y2="55" stroke="currentColor" className="text-border/40" strokeDasharray="3 3" />
              <text x="36" y="18" textAnchor="end" className="fill-muted-foreground font-mono text-[8px]">{maxLoss.toFixed(2)}</text>
              <text x="36" y="58" textAnchor="end" className="fill-muted-foreground font-mono text-[8px]">{(maxLoss / 2).toFixed(2)}</text>
              <text x="36" y="98" textAnchor="end" className="fill-muted-foreground font-mono text-[8px]">0.00</text>
              <text x="38" y="10" textAnchor="end" className="fill-foreground font-bold font-mono text-[8px]">MSE</text>
              <text x="40" y="108" textAnchor="middle" className="fill-muted-foreground font-mono text-[8px]">0</text>
              <text x="162" y="108" textAnchor="middle" className="fill-muted-foreground font-mono text-[8px]">{Math.floor(n / 2)}</text>
              <text x="285" y="108" textAnchor="middle" className="fill-muted-foreground font-mono text-[8px]">{n}</text>
              <text x="285" y="118" textAnchor="end" className="fill-foreground font-bold font-mono text-[8px]">Epoch</text>
              {n > 1 ? (
                <polyline fill="none" stroke="hsl(var(--primary))" strokeWidth="2" points={pts} />
              ) : (
                <circle cx="40" cy={(95 - Math.min(1, Math.max(0, lossHistory[0] / maxLoss)) * 80).toFixed(1)} r="3" fill="hsl(var(--primary))" />
              )}
            </svg>
          ) : (
            <div className="w-full text-center text-xs text-muted-foreground py-10">
              Train network to plot error curve.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
