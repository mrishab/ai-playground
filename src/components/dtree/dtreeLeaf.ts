import { TreeNode, ClassFrequencyMap } from "./dtreeTypes";

export function createLeafNode(
  prediction: string,
  classCounts: ClassFrequencyMap,
  entropy: number,
): TreeNode {
  return {
    id: `leaf-${Math.random()}`,
    isLeaf: true,
    prediction,
    classCounts,
    entropy,
    children: [],
  };
}
