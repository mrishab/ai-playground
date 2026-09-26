import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { BayesNetwork } from "@/data/bayesProblems";
import { BayesDSeparationHeader } from "./BayesDSeparationHeader";
import { BayesDSeparationSelect } from "./BayesDSeparationSelect";
import { BayesDSeparationResult } from "./BayesDSeparationResult";

interface BayesDSeparationCardProps {
  network: BayesNetwork;
  dsepNodeA: string;
  setDsepNodeA: (s: string) => void;
  dsepNodeB: string;
  setDsepNodeB: (s: string) => void;
  dsepResult: string | null;
  onTestDSeparation: () => void;
}

export function BayesDSeparationCard({
  network,
  dsepNodeA,
  setDsepNodeA,
  dsepNodeB,
  setDsepNodeB,
  dsepResult,
  onTestDSeparation,
}: BayesDSeparationCardProps) {
  return (
    <Card className="border-border/80 shadow-sm">
      <BayesDSeparationHeader />
      <CardContent className="p-4 pt-1 space-y-3 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <BayesDSeparationSelect
            label="Variable A:"
            value={dsepNodeA}
            onChange={setDsepNodeA}
            nodes={network.nodes}
          />
          <BayesDSeparationSelect
            label="Variable B:"
            value={dsepNodeB}
            onChange={setDsepNodeB}
            nodes={network.nodes}
          />
        </div>

        <Button
          size="sm"
          onClick={onTestDSeparation}
          className="w-full h-8 text-xs font-semibold"
        >
          Test Independence (A ⊥ B | Evidence)
        </Button>

        <BayesDSeparationResult result={dsepResult} />
      </CardContent>
    </Card>
  );
}
