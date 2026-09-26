import { DTreeDataset } from "@/data/dtreeProblems";
import { TreeNode, CandidateGain, ClassFrequencyMap } from "./dtreeTypes";
import { calculateEntropy, computeCandidateGains } from "./dtreeMath";

export function createInitialTreeState(dataset: DTreeDataset): {
  root: TreeNode;
  gains: CandidateGain[];
} {
  const counts: ClassFrequencyMap = {};
  for (const ex of dataset.examples) {
    counts[ex[dataset.target]] = (counts[ex[dataset.target]] || 0) + 1;
  }
  const root: TreeNode = {
    id: "root",
    isLeaf: Object.keys(counts).length <= 1,
    classCounts: counts,
    entropy: calculateEntropy(dataset.examples, dataset.target),
    children: [],
    examples: dataset.examples,
    availableAttrs: dataset.attributes,
  };
  const gains = computeCandidateGains(
    dataset.examples,
    [],
    dataset.attributes,
    dataset.target,
  );
  return { root, gains };
}
