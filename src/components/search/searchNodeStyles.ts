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
      circleClassName: "fill-emerald-500 dark:fill-emerald-800 stroke-emerald-600 dark:stroke-emerald-400",
      textClassName: "fill-white",
      strokeWidth: 3,
    };
  }
  if (p.node.isGoal) {
    return {
      circleClassName: "fill-amber-500 dark:fill-amber-700 stroke-amber-600 dark:stroke-amber-400",
      textClassName: "fill-white",
      strokeWidth: 3,
    };
  }
  if (p.isInSolution) {
    return {
      circleClassName: "fill-emerald-600 dark:fill-emerald-700 stroke-emerald-300 dark:stroke-emerald-400",
      textClassName: "fill-white",
      strokeWidth: 4,
    };
  }
  if (p.isCurrent) {
    return { circleClassName: "fill-blue-600 stroke-blue-300 dark:stroke-blue-400", textClassName: "fill-white", strokeWidth: 3.5 };
  }
  if (p.isFrontierNode) {
    return { circleClassName: "fill-sky-100 dark:fill-sky-950 stroke-sky-500 dark:stroke-sky-400", textClassName: "fill-sky-900 dark:fill-sky-100", strokeWidth: 2.5 };
  }
  if (p.isExpandedNode) {
    return { circleClassName: "fill-purple-100 dark:fill-purple-950 stroke-purple-500 dark:stroke-purple-400", textClassName: "fill-purple-900 dark:fill-purple-100", strokeWidth: 2 };
  }
  return { circleClassName: "fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600", textClassName: "fill-slate-800 dark:fill-slate-100", strokeWidth: 2 };
}
