import { SearchNode } from "@/data/searchProblems";

export type AlgorithmType =
  "dfs" | "bfs" | "lcfs" | "best_first" | "astar" | "mpp";

export interface SearchPath {
  nodes: string[];
  cost: number;
  h: number;
  f: number;
}

export interface StepHistoryState {
  frontier: SearchPath[];
  expanded: string[];
  currentNode: string | null;
  currentPath: string[];
  isGoalReached: boolean;
  logMessage: string;
}

export interface QuizScore {
  correct: number;
  total: number;
}

export interface SearchNodeSvgProps {
  node: SearchNode;
  isCurrent: boolean;
  isExpandedNode: boolean;
  isFrontierNode: boolean;
  isInSolution: boolean;
  onClick: () => void;
}

export interface SearchStepButtonsProps {
  isPlaying: boolean;
  isGoalReached: boolean;
  isFrontierEmpty: boolean;
  isQuizMode: boolean;
  hasHistory: boolean;
  onTogglePlay: () => void;
  onStep: () => void;
  onStepBack: () => void;
  onReset: () => void;
}
