import { DTreeDataset } from "@/data/dtreeProblems";
import { TreeNode, ClassFrequencyMap } from "./dtreeTypes";
import { calculateEntropy } from "./dtreeMath";
import { calculateGini } from "./dtreeMetrics";
import { findNextUnexpandedNode, replaceNodeInTree } from "./dtreeStepFinder";

export function splitTreeNode(
  tree: TreeNode,
  attrToSplit: string,
  dataset: DTreeDataset,
): TreeNode {
  const target = findNextUnexpandedNode(tree) || tree;
  const exList = target.examples || dataset.examples;
  const attrs = target.availableAttrs || dataset.attributes;
  const remAttrs = attrs.filter((a) => a !== attrToSplit);
  const values = dataset.attributeValues[attrToSplit] || [];

  const children = values.map((val) => {
    const matching = exList.filter((ex) => ex[attrToSplit] === val);
    const counts: ClassFrequencyMap = {};
    for (const ex of matching) counts[ex[dataset.target]] = (counts[ex[dataset.target]] || 0) + 1;
    const isPure = Object.keys(counts).length <= 1;
    const majority = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Unknown";
    const isLeaf = isPure || remAttrs.length === 0 || matching.length === 0;
    return {
      value: val,
      node: {
        id: `node-${attrToSplit}-${val}-${Math.random().toString(36).slice(2, 6)}`,
        isLeaf,
        prediction: isLeaf ? majority : undefined,
        classCounts: counts,
        entropy: calculateEntropy(matching, dataset.target),
        gini: calculateGini(matching, dataset.target),
        children: [],
        examples: matching,
        availableAttrs: remAttrs,
      },
    };
  });
  return replaceNodeInTree(tree, target.id, { ...target, attribute: attrToSplit, isLeaf: false, children });
}
