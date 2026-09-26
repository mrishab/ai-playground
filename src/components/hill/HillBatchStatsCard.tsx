import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { BatchResult } from "./hillTypes";

export function HillBatchStatsCard({
  batchStats,
}: {
  batchStats: BatchResult;
}) {
  return (
    <Card className="border-indigo-500/40 bg-indigo-950/15 shadow-sm animate-in fade-in">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold text-indigo-300">
          Batch Run Statistics ({batchStats.trials} Trials)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Success Rate:</span>
          <span className="font-bold text-emerald-400">
            {((batchStats.successes / batchStats.trials) * 100).toFixed(1)}% (
            {batchStats.successes}/{batchStats.trials})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Average Steps to Solve:</span>
          <span className="font-mono text-cyan-300 font-bold">
            {batchStats.avgSteps.toFixed(1)} steps
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
