import React from "react";
import { DTreeHeader } from "./DTreeHeader";
import { DTreeCanvasCard } from "./DTreeCanvasCard";
import { DTreeGainRankingCard } from "./DTreeGainRankingCard";
import { DTreeDatasetTable } from "./DTreeDatasetTable";
import { DTreeTabs } from "./DTreeTabs";
import { useDTree } from "./useDTree";

export function DTreeTool() {
  const d = useDTree();

  return (
    <div className="space-y-6">
      <DTreeHeader
        selectedDatasetId={d.selectedDatasetId}
        setSelectedDatasetId={d.setSelectedDatasetId}
        dataset={d.dataset}
        tutorial={d.tutorial}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <DTreeCanvasCard
            onAutoBuild={d.autoBuildTree}
            onReset={d.initializeDTree}
            onStepId3={d.stepId3}
            isPlaying={d.isPlaying}
            onTogglePlay={d.togglePlay}
            canStep={d.canStep}
            candidateGains={d.candidateGains}
            selectedSplitAttr={d.selectedSplitAttr}
            setSelectedSplitAttr={d.setSelectedSplitAttr}
            onSplit={d.splitNode}
            tree={d.tree}
            log={d.log}
            speed={d.speed}
            setSpeed={d.setSpeed}
          />
        </div>

        <div className="space-y-4">
          <DTreeGainRankingCard candidateGains={d.candidateGains} />
          <DTreeDatasetTable dataset={d.dataset} />
        </div>
      </div>

      <DTreeTabs codeTemplate={d.codeTemplate} tutorial={d.tutorial} />
    </div>
  );
}
