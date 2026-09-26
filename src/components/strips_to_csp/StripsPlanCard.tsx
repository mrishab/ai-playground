import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { StripsFrameAxiomsCard } from "./StripsFrameAxiomsCard";

export function StripsPlanCard({
  horizonK,
  extractedPlan,
}: {
  horizonK: number;
  extractedPlan: string[];
}) {
  return (
    <div className="space-y-4">
      <Card className="border-border/80 shadow-sm">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Satisfying Plan (Horizon k = {horizonK})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-1 space-y-2 text-xs">
          {extractedPlan.length > 0 ? (
            <div className="space-y-2 font-mono">
              {extractedPlan.map((act, i) => (
                <div
                  key={`${act}-${i}`}
                  className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span>{act}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground text-xs">
              Increase horizon slider to find a satisfying plan.
            </div>
          )}
        </CardContent>
      </Card>

      <StripsFrameAxiomsCard />
    </div>
  );
}
