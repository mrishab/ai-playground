import React from "react";
import { Card } from "@/components/ui/Card";
import { PlanningToolbar } from "./PlanningToolbar";
import { BlocksWorldArenaSvg } from "./BlocksWorldArenaSvg";
import { PlanningProblem } from "@/data/planningProblems";

interface PlanningCanvasCardProps {
  isExecuting: boolean;
  onToggleExecute: () => void;
  onStep: () => void;
  onReset: () => void;
  currentStepIndex: number;
  totalSteps: number;
  columns: string[][];
  gripperColIndex: number;
  holdingBlock: string | null;
  problem: PlanningProblem;
  log: string;
  speed: number;
  setSpeed: (v: number) => void;
}

export function PlanningCanvasCard(p: PlanningCanvasCardProps) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <PlanningToolbar
        isExecuting={p.isExecuting}
        onToggleExecute={p.onToggleExecute}
        onStep={p.onStep}
        onReset={p.onReset}
        currentStepIndex={p.currentStepIndex}
        totalSteps={p.totalSteps}
        speed={p.speed}
        setSpeed={p.setSpeed}
      />
      <BlocksWorldArenaSvg
        columns={p.columns}
        gripperColIndex={p.gripperColIndex}
        holdingBlock={p.holdingBlock}
        problem={p.problem}
      />
      <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs text-foreground/90">
        {p.log}
      </div>
    </Card>
  );
}
