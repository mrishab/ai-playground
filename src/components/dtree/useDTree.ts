import { useState, useEffect } from "react";
import { DTREE_DATASETS, DTreeDataset } from "@/data/dtreeProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { TreeNode, CandidateGain } from "./dtreeTypes";
import { useDTreeActions } from "./useDTreeActions";
import { useDTreeStepper } from "./useDTreeStepper";
import { getDTreeCodeTemplate } from "./dtreeCodeTemplate";

export function useDTree() {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>("playTennis");
  const dataset: DTreeDataset = DTREE_DATASETS[selectedDatasetId] || DTREE_DATASETS.playTennis;
  const tutorial = TOOL_TUTORIALS.dtree;

  const [tree, setTree] = useState<TreeNode | null>(null);
  const [selectedSplitAttr, setSelectedSplitAttr] = useState<string>("");
  const [candidateGains, setCandidateGains] = useState<CandidateGain[]>([]);
  const [log, setLog] = useState<string>(
    "Dataset loaded. Click Auto-Build Tree or manually split step-by-step.",
  );

  const stepper = useDTreeStepper(dataset, tree, setTree, setCandidateGains, setSelectedSplitAttr, setLog);
  const actions = useDTreeActions(dataset, tree, setTree, setCandidateGains, setSelectedSplitAttr, setLog);

  const { stopPlaying } = stepper;
  const { initializeDTree } = actions;

  useEffect(() => {
    stopPlaying();
    initializeDTree();
  }, [selectedDatasetId, stopPlaying, initializeDTree]);

  return {
    selectedDatasetId,
    setSelectedDatasetId,
    dataset,
    tutorial,
    tree,
    selectedSplitAttr,
    setSelectedSplitAttr,
    candidateGains,
    log,
    ...actions,
    ...stepper,
    codeTemplate: getDTreeCodeTemplate(dataset),
  };
}
