import React from "react";
import { Card } from "../ui/Card";
import { useHillClimbing } from "./useHillClimbing";
import { HillToolbar } from "./HillToolbar";
import { HillAssignmentGrid } from "./HillAssignmentGrid";
import { HillConflictChart } from "./HillConflictChart";

interface HillMainCardProps {
  h: ReturnType<typeof useHillClimbing>;
}

export function HillMainCard({ h }: HillMainCardProps) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <HillToolbar
        isPlaying={h.isPlaying}
        conflicts={h.conflicts}
        onTogglePlay={() => h.setIsPlaying(!h.isPlaying)}
        onStep={h.stepSLS}
        onReset={h.initializeAssignment}
        onBatch={() => h.runBatchRuns(50)}
      />
      <HillAssignmentGrid
        problem={h.problem}
        assignment={h.assignment}
        conflicts={h.conflicts}
        stepCount={h.stepCount}
      />
      <HillConflictChart conflictHistory={h.conflictHistory} log={h.log} />
    </Card>
  );
}
