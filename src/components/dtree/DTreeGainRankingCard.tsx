import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { CandidateGain } from "./dtreeTypes";
import { getMetricLabel } from "./dtreeMetrics";

export function DTreeGainRankingCard({
  candidateGains,
  algo = "id3",
}: {
  candidateGains: CandidateGain[];
  algo?: string;
}) {
  const { fullName, shortName } = getMetricLabel(algo);
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">{fullName} Ranking</CardTitle>
        <CardDescription className="text-xs">Candidate attribute impurity reduction</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-2 text-xs">
        {candidateGains.map((cg, i) => (
          <div key={cg.attr} className="p-2.5 rounded-lg bg-secondary/30 border border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">{cg.attr}</span>
              {i === 0 && <Badge variant="cyan" className="text-[9px] py-0">Best Split</Badge>}
            </div>
            <span className="font-mono text-cyan-400 font-semibold">
              {shortName}: {cg.gain.toFixed(4)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
