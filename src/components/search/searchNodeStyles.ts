import { SearchNode } from "@/data/searchProblems";

interface NodeStyleProps {
  node: SearchNode;
  isCurrent: boolean;
  isExpandedNode: boolean;
  isFrontierNode: boolean;
  isInSolution: boolean;
}

export function getSearchNodeStyle(p: NodeStyleProps) {
  if (p.node.isStart) {
    return {
      circleClassName: "fill-primary stroke-primary-foreground",
      textClassName: "fill-primary-foreground",
      strokeWidth: 3,
    };
  }
  if (p.node.isGoal) {
    return {
      circleClassName: "fill-secondary stroke-primary",
      textClassName: "fill-secondary-foreground",
      strokeWidth: 3,
    };
  }
  if (p.isInSolution) {
    return {
      circleClassName: "fill-primary stroke-accent",
      textClassName: "fill-primary-foreground",
      strokeWidth: 4,
    };
  }
  if (p.isCurrent) {
    return { circleClassName: "fill-primary stroke-foreground", textClassName: "fill-primary-foreground", strokeWidth: 3.5 };
  }
  if (p.isFrontierNode) {
    return { circleClassName: "fill-accent stroke-primary", textClassName: "fill-accent-foreground", strokeWidth: 2.5 };
  }
  if (p.isExpandedNode) {
    return { circleClassName: "fill-muted stroke-muted-foreground", textClassName: "fill-muted-foreground", strokeWidth: 2 };
  }
  return { circleClassName: "fill-card stroke-border", textClassName: "fill-foreground", strokeWidth: 2 };
}
