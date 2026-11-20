import { useState, useCallback } from "react";
import confetti from "canvas-confetti";
import { DTreeDataset } from "@/data/dtreeProblems";
import { TreeNode, CandidateGain, DTreeAlgorithm } from "./dtreeTypes";
import { stepId3Tree } from "./dtreeStepApply";
import { findNextUnexpandedNode } from "./dtreeStepFinder";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";
import { getMetricLabel } from "./dtreeMetrics";

export function useDTreeStepper(
  dataset: DTreeDataset,
  tree: TreeNode | null,
  setTree: (t: TreeNode | null) => void,
  setCandidateGains: (g: CandidateGain[]) => void,
  setSelectedSplitAttr: (s: string) => void,
  setLog: (l: string) => void,
  algo: DTreeAlgorithm = "id3",
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const canStep = Boolean(tree && findNextUnexpandedNode(tree));

  const stepTree = useCallback(() => {
    if (!tree) return false;
    const res = stepId3Tree(tree, dataset, algo);
    setTree(res.tree);
    setCandidateGains(res.gains);
    if (res.gains.length > 0) setSelectedSplitAttr(res.gains[0].attr);
    const { shortName } = getMetricLabel(algo);
    if (res.isComplete) {
      setLog(`Step ${algo.toUpperCase()}: tree fully expanded. All paths pure or exhausted.`);
      confetti({ particleCount: 60, spread: 70 });
      setIsPlaying(false);
    } else if (res.splitAttr) {
      setLog(`Step ${algo.toUpperCase()}: split on best attribute "${res.splitAttr}" (${shortName} = ${res.maxGain?.toFixed(4)}).`);
    } else {
      setLog(`Step ${algo.toUpperCase()}: leaf assigned. Continuing tree expansion...`);
    }
    return !res.isComplete;
  }, [tree, dataset, algo, setTree, setCandidateGains, setSelectedSplitAttr, setLog]);

  const togglePlay = useCallback(() => {
    if (!canStep) return;
    setIsPlaying((p) => !p);
  }, [canStep]);

  useSimulationTimer(isPlaying, canStep, stepTree, 1050 - speed);

  return { isPlaying, canStep, stepId3: stepTree, stepTree, togglePlay, stopPlaying: useCallback(() => setIsPlaying(false), []), speed, setSpeed };
}
