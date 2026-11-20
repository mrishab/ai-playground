import { useState, useEffect } from "react";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { TreeNode, CandidateGain, DTreeAlgorithm } from "./dtreeTypes";
import { useDTreeActions } from "./useDTreeActions";
import { useDTreeStepper } from "./useDTreeStepper";
import { getDTreeCodeTemplate } from "./dtreeCodeTemplate";
import { useDTreeDatasetSelection } from "./useDTreeDatasetSelection";

export function useDTree(algo: DTreeAlgorithm = "id3") {
  const dsState = useDTreeDatasetSelection();
  const tutorial = TOOL_TUTORIALS.dtree;

  const [tree, setTree] = useState<TreeNode | null>(null);
  const [selectedSplitAttr, setSelectedSplitAttr] = useState<string>("");
  const [candidateGains, setCandidateGains] = useState<CandidateGain[]>([]);
  const [log, setLog] = useState<string>("Dataset loaded. Click Auto-Build Tree or manually split step-by-step.");

  const stepper = useDTreeStepper(dsState.dataset, tree, setTree, setCandidateGains, setSelectedSplitAttr, setLog, algo);
  const actions = useDTreeActions(dsState.dataset, tree, setTree, setCandidateGains, setSelectedSplitAttr, setLog, algo);
  const { stopPlaying } = stepper;
  const { initializeDTree } = actions;

  useEffect(() => {
    stopPlaying();
    initializeDTree();
  }, [dsState.selectedDatasetId, algo, stopPlaying, initializeDTree]);

  const handleResetProblem = () => {
    dsState.handleResetDataset();
    stopPlaying();
    initializeDTree();
  };

  return {
    ...dsState,
    handleResetDataset: handleResetProblem,
    tutorial,
    tree,
    selectedSplitAttr,
    setSelectedSplitAttr,
    candidateGains,
    log,
    ...actions,
    ...stepper,
    codeTemplate: getDTreeCodeTemplate(dsState.dataset, algo),
  };
}
