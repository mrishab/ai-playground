import { DTreeDataset } from "@/data/dtreeProblems";
import { TreeNode, CandidateGain, ClassFrequencyMap, DTreeExample, DTreeAlgorithm } from "./dtreeTypes";
import { calculateEntropy, computeCandidateGains } from "./dtreeMath";
import { calculateGini } from "./dtreeMetrics";
import { findBestSplitAttr } from "./dtreeBestAttr";
import { findNextUnexpandedNode, replaceNodeInTree } from "./dtreeStepFinder";

function createChildBranch(val: string, ex: DTreeExample[], attr: string, target: string, parentMaj: string, remAttrs: string[]) {
  const subset = ex.filter((item) => item[attr] === val);
  const counts: ClassFrequencyMap = {};
  for (const item of subset) counts[item[target]] = (counts[item[target]] || 0) + 1;
  const isPure = Object.keys(counts).length <= 1;
  const maj = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || parentMaj;
  const isLeaf = isPure || remAttrs.length === 0 || subset.length === 0;
  return {
    value: val,
    node: {
      id: `node-${attr}-${val}-${Math.random().toString(36).slice(2, 6)}`,
      isLeaf,
      prediction: isLeaf ? maj : undefined,
      classCounts: counts,
      entropy: calculateEntropy(subset, target),
      gini: calculateGini(subset, target),
      children: [],
      examples: subset,
      availableAttrs: remAttrs,
    },
  };
}

export function stepId3Tree(tree: TreeNode, dataset: DTreeDataset, algo: DTreeAlgorithm = "id3") {
  const node = findNextUnexpandedNode(tree);
  if (!node) return { tree, isComplete: true, gains: [] as CandidateGain[] };
  const ex = node.examples || [];
  const attrs = node.availableAttrs || [];
  const { bestAttr, maxGain } = findBestSplitAttr(ex, attrs, dataset.target, algo);
  const parentMaj = Object.entries(node.classCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Unknown";
  if (maxGain <= 0 || attrs.length === 0) {
    const leaf = { ...node, isLeaf: true, prediction: parentMaj };
    const nextTree = replaceNodeInTree(tree, node.id, leaf);
    const nextNode = findNextUnexpandedNode(nextTree);
    const nextGains = nextNode ? computeCandidateGains(nextNode.examples || [], [], nextNode.availableAttrs || [], dataset.target, algo) : [];
    return { tree: nextTree, isComplete: !nextNode, gains: nextGains };
  }
  const remAttrs = attrs.filter((a) => a !== bestAttr);
  const values = dataset.attributeValues[bestAttr] || [];
  const children = values.map((v) => createChildBranch(v, ex, bestAttr, dataset.target, parentMaj, remAttrs));
  const newTree = replaceNodeInTree(tree, node.id, { ...node, attribute: bestAttr, children });
  const nextNode = findNextUnexpandedNode(newTree);
  const nextGains = nextNode ? computeCandidateGains(nextNode.examples || [], [], nextNode.availableAttrs || [], dataset.target, algo) : [];
  return { tree: newTree, isComplete: !nextNode, splitAttr: bestAttr, maxGain, gains: nextGains };
}
