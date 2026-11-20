import React from "react";
import { GitBranch } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { SplitTreeNode } from "./constraintTypes";

export function ConstraintSplitTreeCard({
  splitHistory,
}: {
  splitHistory: SplitTreeNode[];
}) {
  if (splitHistory.length === 0) return null;

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
          <GitBranch className="h-4 w-4 text-purple-400" />
          Domain Splitting Tree
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1 text-xs space-y-1.5">
        {splitHistory.map((s, i) => (
          <div
            key={s.id}
            className="flex items-center justify-between p-2 rounded bg-purple-950/20 border border-purple-500/30 text-purple-200"
          >
            <span>
              Depth {i + 1}:{" "}
              <strong>
                {s.varName} {s.value.startsWith("{") ? "∈" : "="} {s.value}
              </strong>
            </span>
            <Badge
              variant={s.status === "failed" ? "secondary" : "purple"}
              className="text-[10px]"
            >
              {s.status === "failed" ? "Pruned" : s.status === "solved" ? "Solved" : "Active"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
