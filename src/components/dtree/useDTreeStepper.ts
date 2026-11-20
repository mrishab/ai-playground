import { useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { DTreeDataset } from "@/data/dtreeProblems";
import { TreeNode, CandidateGain } from "./dtreeTypes";
import { stepId3Tree } from "./dtreeStepApply";
import { findNextUnexpandedNode } from "./dtreeStepFinder";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";

export function useDTreeStepper(
  dataset: DTreeDataset,
  tree: TreeNode | null,
  setTree: (t: TreeNode | null) => void,
  setCandidateGains: (g: CandidateGain[]) => void,
  setSelectedSplitAttr: (s: string) => void,
  setLog: (l: string) => void,
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const canStep = Boolean(tree && findNextUnexpandedNode(tree));

  const stepId3 = useCallback(() => {
    if (!tree) return false;
    const res = stepId3Tree(tree, dataset);
    setTree(res.tree);
    setCandidateGains(res.gains);
    if (res.gains.length > 0) setSelectedSplitAttr(res.gains[0].attr);
    if (res.splitAttr) {
      setLog(`Step ID3: split on best attribute "${res.splitAttr}" (IG = ${res.maxGain?.toFixed(3)}).`);
    } else {
      setLog("Step ID3: tree fully expanded. All paths pure or exhausted.");
      confetti({ particleCount: 60, spread: 70 });
      setIsPlaying(false);
    }
    return !res.isComplete;
  }, [tree, dataset, setTree, setCandidateGains, setSelectedSplitAttr, setLog]);

  const togglePlay = useCallback(() => {
    if (!canStep) return;
    setIsPlaying((p) => !p);
  }, [canStep]);

  useSimulationTimer(isPlaying, canStep, stepId3, 1050 - speed);

  const stopPlaying = useCallback(() => setIsPlaying(false), []);

  return { isPlaying, canStep, stepId3, togglePlay, stopPlaying, speed, setSpeed };
}
