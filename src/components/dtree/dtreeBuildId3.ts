import { DTreeDataset } from "@/data/dtreeProblems";
import { TreeNode, DTreeExample, ClassFrequencyMap } from "./dtreeTypes";
import { calculateEntropy } from "./dtreeMath";
import { findBestSplitAttr } from "./dtreeBestAttr";
import { createLeafNode } from "./dtreeLeaf";

export function buildId3Tree(dataset: DTreeDataset): TreeNode {
  function build(
    examples: DTreeExample[],
    availableAttrs: string[],
  ): TreeNode {
    const counts: ClassFrequencyMap = {};
    for (const ex of examples)
      counts[ex[dataset.target]] = (counts[ex[dataset.target]] || 0) + 1;
    const isPure = Object.keys(counts).length <= 1;
    const majority =
      Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Unknown";
    const entropy = calculateEntropy(examples, dataset.target);

    if (isPure || availableAttrs.length === 0) {
      return createLeafNode(majority, counts, entropy);
    }
    const { bestAttr, maxGain } = findBestSplitAttr(
      examples,
      availableAttrs,
      dataset.target,
    );
    if (maxGain <= 0) {
      return createLeafNode(majority, counts, entropy);
    }

    const values = dataset.attributeValues[bestAttr] || [];
    const remainingAttrs = availableAttrs.filter((a) => a !== bestAttr);
    const children = values.map((val) => {
      const subset = examples.filter((ex) => ex[bestAttr] === val);
      return subset.length === 0
        ? { value: val, node: createLeafNode(majority, {}, 0) }
        : { value: val, node: build(subset, remainingAttrs) };
    });

    return {
      id: `node-${bestAttr}-${Math.random()}`,
      attribute: bestAttr,
      isLeaf: false,
      classCounts: counts,
      entropy,
      children,
    };
  }
  return build(dataset.examples, dataset.attributes);
}
