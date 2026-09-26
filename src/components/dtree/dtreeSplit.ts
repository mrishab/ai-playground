import { DTreeDataset } from "@/data/dtreeProblems";
import { TreeNode, ClassFrequencyMap } from "./dtreeTypes";
import { calculateEntropy } from "./dtreeMath";

export function splitTreeNode(
  tree: TreeNode,
  attrToSplit: string,
  dataset: DTreeDataset,
): TreeNode {
  const values = dataset.attributeValues[attrToSplit] || [];
  const children = values.map((val) => {
    const matching = dataset.examples.filter((ex) => ex[attrToSplit] === val);
    const counts: ClassFrequencyMap = {};
    for (const ex of matching)
      counts[ex[dataset.target]] = (counts[ex[dataset.target]] || 0) + 1;
    const isPure = Object.keys(counts).length <= 1;
    const majority =
      Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Unknown";
    return {
      value: val,
      node: {
        id: `node-${attrToSplit}-${val}`,
        isLeaf: isPure,
        prediction: isPure ? majority : undefined,
        classCounts: counts,
        entropy: calculateEntropy(matching, dataset.target),
        children: [],
      },
    };
  });
  return { ...tree, attribute: attrToSplit, children };
}
