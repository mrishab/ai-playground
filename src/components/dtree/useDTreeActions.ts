import { useCallback } from "react";
import confetti from "canvas-confetti";
import { DTreeDataset } from "@/data/dtreeProblems";
import { TreeNode, CandidateGain, DTreeAlgorithm } from "./dtreeTypes";
import { splitTreeNode, buildId3Tree } from "./dtreeEngine";
import { createInitialTreeState } from "./dtreeInit";
import { findNextUnexpandedNode } from "./dtreeStepFinder";
import { computeCandidateGains } from "./dtreeMath";

export function useDTreeActions(
  dataset: DTreeDataset,
  tree: TreeNode | null,
  setTree: (t: TreeNode | null) => void,
  setCandidateGains: (g: CandidateGain[]) => void,
  setSelectedSplitAttr: (s: string) => void,
  setLog: (l: string) => void,
  algo: DTreeAlgorithm = "id3",
) {
  const initializeDTree = useCallback(() => {
    const { root, gains } = createInitialTreeState(dataset, algo);
    setTree(root);
    setCandidateGains(gains);
    if (gains.length > 0) setSelectedSplitAttr(gains[0].attr);
    setLog(`Initialized decision tree with ${dataset.examples.length} examples.`);
  }, [dataset, algo, setTree, setCandidateGains, setSelectedSplitAttr, setLog]);

  const splitNode = (attrToSplit: string) => {
    if (!tree) return;
    const nextTree = splitTreeNode(tree, attrToSplit, dataset);
    const nextUnexpanded = findNextUnexpandedNode(nextTree);
    setTree(nextTree);
    if (nextUnexpanded) {
      const nextGains = computeCandidateGains(nextUnexpanded.examples || [], [], nextUnexpanded.availableAttrs || [], dataset.target, algo);
      setCandidateGains(nextGains);
      if (nextGains.length > 0) setSelectedSplitAttr(nextGains[0].attr);
      setLog(`Split on "${attrToSplit}". Next unexpanded node ready.`);
    } else {
      setCandidateGains([]);
      setLog(`Tree fully built. All leaves classified.`);
      confetti({ particleCount: 70, spread: 80 });
    }
  };

  const autoBuildTree = () => {
    setTree(buildId3Tree(dataset, algo));
    setCandidateGains([]);
    const algoName = algo === "c45" ? "C4.5" : algo === "cart" ? "CART" : "ID3";
    setLog(`Built complete decision tree using ${algoName} algorithm.`);
    confetti({ particleCount: 70, spread: 80 });
  };

  return { initializeDTree, splitNode, autoBuildTree };
}
