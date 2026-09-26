import React from "react";
import { CSPProblem } from "@/data/cspProblems";
import { ToolTutorialData } from "@/data/toolTutorials";
import { Badge } from "../ui/Badge";
import { SLSAlgorithm } from "./hillTypes";
import { HillProblemSelect } from "./HillProblemSelect";

interface HillHeaderProps {
  selectedProblemId: string;
  setSelectedProblemId: (id: string) => void;
  algorithm: SLSAlgorithm;
  setAlgorithm: (algo: SLSAlgorithm) => void;
  problem: CSPProblem;
  tutorial: ToolTutorialData;
  conflicts: number;
  stepCount: number;
}

export function HillHeader({
  selectedProblemId,
  setSelectedProblemId,
  algorithm,
  setAlgorithm,
  problem,
  tutorial,
  conflicts,
  stepCount,
}: HillHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold tracking-tight">
            Stochastic Local Search (SLS)
          </span>
          <Badge variant="warning">{tutorial.badge}</Badge>
          {conflicts === 0 && (
            <Badge variant="success">Solved ({stepCount} steps)</Badge>
          )}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          {problem.description}
        </p>
      </div>

      <HillProblemSelect
        selectedProblemId={selectedProblemId}
        setSelectedProblemId={setSelectedProblemId}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
      />
    </div>
  );
}
