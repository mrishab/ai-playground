import React, { useState } from "react";
import { useDTree } from "./useDTree";
import { DTreeCanvasCard } from "./DTreeCanvasCard";
import { DTreeGainRankingCard } from "./DTreeGainRankingCard";
import { DTreeDatasetTable } from "./DTreeDatasetTable";
import { DTreeTabs } from "./DTreeTabs";
import { GraphBuilder } from "../graph_builder/GraphBuilder";
import { CodeSandbox } from "../CodeSandbox";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { DTREE_PREBUILT_ITEMS, DTREE_ALGORITHM_ITEMS } from "./dtreeWorkspaceData";

export function DTreeTool() {
  const d = useDTree();
  const [algo, setAlgo] = useState("id3");

  return (
    <StudioWorkspace
      title="Decision Tree Induction Lab"
      category={d.tutorial.badge}
      description={d.dataset.description}
      prebuiltLabel="Dataset"
      prebuiltItems={DTREE_PREBUILT_ITEMS}
      selectedPrebuiltId={d.selectedDatasetId}
      onSelectPrebuiltId={d.setSelectedDatasetId}
      algorithmItems={DTREE_ALGORITHM_ITEMS}
      selectedAlgorithmId={algo}
      onSelectAlgorithmId={setAlgo}
      activeLogMessage={d.log}
      statsBadges={[
        { label: "Examples", value: d.dataset.examples.length, variant: "cyan" },
        { label: "Attributes", value: d.dataset.attributes.length, variant: "success" },
      ]}
      controls={{
        onReset: d.initializeDTree,
        speed: d.speed,
        setSpeed: d.setSpeed,
      }}
      animationSlot={
        <DTreeCanvasCard
          onAutoBuild={d.autoBuildTree} onReset={d.initializeDTree} onStepId3={d.stepId3}
          isPlaying={d.isPlaying} onTogglePlay={d.togglePlay} canStep={d.canStep}
          candidateGains={d.candidateGains} selectedSplitAttr={d.selectedSplitAttr}
          setSelectedSplitAttr={d.setSelectedSplitAttr} onSplit={d.splitNode}
          tree={d.tree} log={d.log} speed={d.speed} setSpeed={d.setSpeed}
        />
      }
      graphBuilderSlot={<GraphBuilder />}
      codingSlot={<CodeSandbox title="ID3 Decision Tree Code" initialCode={d.codeTemplate} algorithmName="ID3" />}
      theorySlot={<DTreeTabs codeTemplate={d.codeTemplate} tutorial={d.tutorial} />}
      inspectorSlot={<DTreeGainRankingCard candidateGains={d.candidateGains} />}
      stateSlot={<DTreeDatasetTable dataset={d.dataset} />}
    />
  );
}
