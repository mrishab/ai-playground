import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function RobotPlanList({
  plan,
  currentPlanIndex,
}: {
  plan: string[];
  currentPlanIndex: number;
}) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">
          High Controller Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-1.5 text-xs">
        {plan.map((loc, idx) => {
          const isDone = idx < currentPlanIndex;
          const isCurrent = idx === currentPlanIndex;
          return (
            <div
              // react-doctor-disable-next-line react-doctor/no-array-index-as-key
              key={`${loc}-${idx}`}
              className={`p-2 rounded-lg flex items-center justify-between font-mono ${
                isCurrent
                  ? "bg-primary/20 border border-primary/40 text-primary"
                  : isDone
                    ? "bg-secondary/40 text-muted-foreground"
                    : "bg-secondary/30 text-muted-foreground"
              }`}
            >
              <span>
                {idx + 1}. Navigate to "{loc}"
              </span>
              {isDone && (
                <span className="text-[10px] text-primary">Reached</span>
              )}
              {isCurrent && (
                <Badge variant="purple" className="text-[9px] py-0">
                  Active
                </Badge>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
