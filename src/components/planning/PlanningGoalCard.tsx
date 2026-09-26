import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PlanningProblem } from "@/data/planningProblems";

export function PlanningGoalCard({ problem }: { problem: PlanningProblem }) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">
          Goal Specification
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-1.5 text-xs font-mono">
        {problem.goal.map((g) => (
          <div
            key={`${g.predicate}-${g.args.join("-")}`}
            className="p-2 rounded bg-secondary/30 flex items-center justify-between"
          >
            <span className="text-primary font-bold">
              {g.predicate}(
              {g.args
                .map(
                  (arg) =>
                    problem.blocks.find((b) => b.id === arg)?.label || arg,
                )
                .join(", ")}
              )
            </span>
            <Badge variant="cyan" className="text-[9px]">
              Goal Atom
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
