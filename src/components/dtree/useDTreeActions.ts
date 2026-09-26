import { useCallback } from "react";
import confetti from "canvas-confetti";
import { DTreeDataset } from "@/data/dtreeProblems";
import { TreeNode, CandidateGain } from "./dtreeTypes";
import { splitTreeNode, buildId3Tree } from "./dtreeEngine";
import { createInitialTreeState } from "./dtreeInit";

export function useDTreeActions(
  dataset: DTreeDataset,
  tree: TreeNode | null,
  setTree: (t: TreeNode | null) => void,
  setCandidateGains: (g: CandidateGain[]) => void,
  setSelectedSplitAttr: (s: string) => void,
  setLog: (l: string) => void,
) {
  const initializeDTree = useCallback(() => {
    const { root, gains } = createInitialTreeState(dataset);
    setTree(root);
    setCandidateGains(gains);
    if (gains.length > 0) setSelectedSplitAttr(gains[0].attr);
    setLog(
      `Initialized decision tree with ${dataset.examples.length} examples.`,
    );
  }, [dataset, setTree, setCandidateGains, setSelectedSplitAttr, setLog]);

  const splitNode = (attrToSplit: string) => {
    if (!tree) return;
    setTree(splitTreeNode(tree, attrToSplit, dataset));
    setLog(`Split root on "${attrToSplit}".`);
    confetti({ particleCount: 40, spread: 60 });
  };

  const autoBuildTree = () => {
    setTree(buildId3Tree(dataset));
    setCandidateGains([]);
    setLog("Built complete decision tree using ID3 algorithm.");
    confetti({ particleCount: 70, spread: 80 });
  };

  return { initializeDTree, splitNode, autoBuildTree };
}
