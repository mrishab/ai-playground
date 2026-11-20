import { DTreeDataset } from "@/data/dtreeProblems";
import { TreeNode, CandidateGain, ClassFrequencyMap, DTreeAlgorithm } from "./dtreeTypes";
import { calculateEntropy, computeCandidateGains } from "./dtreeMath";
import { calculateGini } from "./dtreeMetrics";

export function createInitialTreeState(dataset: DTreeDataset, algo: DTreeAlgorithm = "id3"): {
  root: TreeNode;
  gains: CandidateGain[];
} {
  const counts: ClassFrequencyMap = {};
  for (const ex of dataset.examples) {
    counts[ex[dataset.target]] = (counts[ex[dataset.target]] || 0) + 1;
  }
  const isPure = Object.keys(counts).length <= 1;
  const majority = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";
  const root: TreeNode = {
    id: "root",
    isLeaf: dataset.examples.length === 0 ? false : isPure,
    prediction: isPure && dataset.examples.length > 0 ? majority : undefined,
    classCounts: counts,
    entropy: calculateEntropy(dataset.examples, dataset.target),
    gini: calculateGini(dataset.examples, dataset.target),
    children: [],
    examples: dataset.examples,
    availableAttrs: dataset.attributes,
  };
  const gains = computeCandidateGains(dataset.examples, [], dataset.attributes, dataset.target, algo);
  return { root, gains };
}
