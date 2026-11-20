import React, { useState } from "react";
import { useDTree } from "./useDTree";
import { DTreeCanvasCard } from "./DTreeCanvasCard";
import { DTreeGainRankingCard } from "./DTreeGainRankingCard";
import { DTreeDatasetTable } from "./DTreeDatasetTable";
import { DTreeTabs } from "./DTreeTabs";
import { CodeSandbox } from "../CodeSandbox";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { DTREE_PREBUILT_ITEMS, DTREE_ALGORITHM_ITEMS } from "./dtreeWorkspaceData";
import { DTreeAlgorithm } from "./dtreeTypes";

export function DTreeTool() {
  const [algo, setAlgo] = useState<DTreeAlgorithm>("id3");
  const d = useDTree(algo);

  return (
    <StudioWorkspace
      title="Decision Tree Induction Lab" category={d.tutorial.badge} description={d.dataset.description}
      prebuiltLabel="Dataset" prebuiltItems={DTREE_PREBUILT_ITEMS}
      selectedPrebuiltId={d.selectedDatasetId} onSelectPrebuiltId={d.setSelectedDatasetId}
      algorithmItems={DTREE_ALGORITHM_ITEMS} selectedAlgorithmId={algo} onSelectAlgorithmId={(id) => setAlgo(id as DTreeAlgorithm)}
      activeLogMessage={d.log}
      exportData={{ toolType: "dtree", problem: d.dataset, filename: `${d.dataset.id || "dtree"}-dataset` }}
      onImportProblem={(data) => {
        if (!data.problem || !Array.isArray(data.problem.examples)) throw new Error("Invalid decision tree dataset: missing examples array");
        d.handleImportDataset(data.problem);
      }}
      onResetProblem={d.handleResetDataset}
      statsBadges={[{ label: "Examples", value: d.dataset.examples.length, variant: "cyan" }, { label: "Attributes", value: d.dataset.attributes.length, variant: "success" }]}
      controls={{ onReset: d.initializeDTree, speed: d.speed, setSpeed: d.setSpeed }}
      animationSlot={
        <DTreeCanvasCard
          onAutoBuild={d.autoBuildTree} onReset={d.initializeDTree} onStepId3={d.stepTree}
          isPlaying={d.isPlaying} onTogglePlay={d.togglePlay} canStep={d.canStep}
          candidateGains={d.candidateGains} selectedSplitAttr={d.selectedSplitAttr}
          setSelectedSplitAttr={d.setSelectedSplitAttr} onSplit={d.splitNode}
          tree={d.tree} log={d.log} speed={d.speed} setSpeed={d.setSpeed} algo={algo}
        />
      }
      codingSlot={<CodeSandbox title="ID3 Decision Tree Code" initialCode={d.codeTemplate} algorithmName={algo.toUpperCase()} />}
      theorySlot={<DTreeTabs codeTemplate={d.codeTemplate} tutorial={d.tutorial} />}
      inspectorSlot={<DTreeGainRankingCard candidateGains={d.candidateGains} algo={algo} />}
      stateSlot={<DTreeDatasetTable dataset={d.dataset} />}
    />
  );
}
