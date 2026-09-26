import React from "react";
import { Card } from "../ui/Card";
import { useConstraintTool } from "./useConstraintTool";
import { ConstraintToolbar } from "./ConstraintToolbar";
import { ConstraintGraphSvg } from "./ConstraintGraphSvg";

interface ConstraintCanvasCardProps {
  c: ReturnType<typeof useConstraintTool>;
}

export function ConstraintCanvasCard({ c }: ConstraintCanvasCardProps) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <ConstraintToolbar
        arcQueueLength={c.arcQueue.length}
        isPlaying={c.isPlaying}
        hasBackups={c.domainBackups.length > 0}
        speed={c.speed}
        setSpeed={c.setSpeed}
        onFineStep={c.arcQueue.length > 0 ? c.fineStep : c.stepMacSearch}
        onToggleAutoAC={c.toggleAutoAC}
        onBacktrack={c.backtrack}
        onReset={c.initializeCSP}
        variables={c.problem.variables}
        domains={c.domains}
        selectedVarToSplit={c.selectedVarToSplit}
        setSelectedVarToSplit={c.setSelectedVarToSplit}
        onPerformSplit={c.performDomainSplit}
      />
      <ConstraintGraphSvg
        problem={c.problem}
        domains={c.domains}
        currentArc={c.currentArc}
        arcQueueLength={c.arcQueue.length}
        activeSplitId={c.activeSplitId}
        log={c.log}
        hasDomainWipeout={c.hasDomainWipeout}
        isCSPFullySolved={c.isCSPFullySolved}
      />
    </Card>
  );
}
