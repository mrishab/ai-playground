import { TreeNode } from "./dtreeTypes";

export function findNextUnexpandedNode(tree: TreeNode | null): TreeNode | null {
  if (!tree) return null;
  const queue: TreeNode[] = [tree];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    if (!curr.isLeaf && curr.children.length === 0) return curr;
    for (const child of curr.children) {
      queue.push(child.node);
    }
  }
  return null;
}

export function replaceNodeInTree(
  root: TreeNode,
  targetId: string,
  replacement: TreeNode,
): TreeNode {
  if (root.id === targetId) return replacement;
  return {
    ...root,
    children: root.children.map((c) => ({
      value: c.value,
      node: replaceNodeInTree(c.node, targetId, replacement),
    })),
  };
}
