import { useState, useCallback } from "react";
import { SearchNode } from "@/data/searchProblems";
import { SearchPath, StepHistoryState } from "./searchTypes";

export function useSearchState() {
  const [frontier, setFrontier] = useState<SearchPath[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [isGoalReached, setIsGoalReached] = useState(false);
  const [log, setLog] = useState("");
  const [history, setHistory] = useState<StepHistoryState[]>([]);
  const [inspectedNode, setInspectedNode] = useState<SearchNode | null>(null);

  const stepBack = useCallback(() => {
    if (history.length === 0) return;
    const p = history[history.length - 1];
    setFrontier(p.frontier);
    setExpanded(p.expanded);
    setCurrentNode(p.currentNode);
    setCurrentPath(p.currentPath);
    setIsGoalReached(p.isGoalReached);
    setLog(`Stepped back: ${p.logMessage}`);
    setHistory((h) => h.slice(0, -1));
  }, [history]);

  return {
    frontier,
    setFrontier,
    expanded,
    setExpanded,
    currentNode,
    setCurrentNode,
    currentPath,
    setCurrentPath,
    isGoalReached,
    setIsGoalReached,
    log,
    setLog,
    history,
    setHistory,
    inspectedNode,
    setInspectedNode,
    stepBack,
  };
}
