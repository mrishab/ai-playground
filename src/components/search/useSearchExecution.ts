import { useCallback } from "react";
import confetti from "canvas-confetti";
import { SearchGraph } from "@/data/searchProblems";
import { AlgorithmType } from "./searchTypes";
import { executeSearchStep } from "./searchEngine";
import { useSearchState } from "./useSearchState";

export function useSearchExecution(
  graph: SearchGraph,
  algorithm: AlgorithmType,
) {
  const s = useSearchState();

  const initializeSearch = useCallback(() => {
    const start = graph.nodes.find((n) => n.id === graph.startNode) || graph.nodes[0];
    const h = start?.h || 0;
    const f = algorithm === "best_first" ? h : algorithm === "lcfs" ? 0 : h;
    s.setFrontier(start ? [{ nodes: [start.id], cost: 0, h, f }] : []);
    s.setExpanded([]);
    s.setCurrentNode(null);
    s.setCurrentPath([]);
    s.setIsGoalReached(false);
    s.setHistory([]);
    s.setInspectedNode(null);
    s.setLog(start ? `Initialized ${algorithm.toUpperCase()} from start node "${start.id}".` : "No nodes in graph.");
    // react-doctor-disable-next-line react-doctor/exhaustive-deps
  }, [graph, algorithm]);

  const stepSearch = useCallback((): boolean => {
    if (s.isGoalReached || s.frontier.length === 0) return false;
    s.setHistory((p) => [
      ...p,
      {
        frontier: [...s.frontier],
        expanded: [...s.expanded],
        currentNode: s.currentNode,
        currentPath: [...s.currentPath],
        isGoalReached: s.isGoalReached,
        logMessage: s.log,
      },
    ]);
    const res = executeSearchStep(s.frontier, s.expanded, graph, algorithm);
    s.setFrontier(res.updatedFrontier);
    s.setExpanded(res.updatedExpanded);
    s.setCurrentNode(res.headNodeId);
    s.setCurrentPath(res.currentPath);
    s.setIsGoalReached(res.isGoalReached);
    s.setLog(res.log);
    if (res.confetti)
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    return !res.done;
  }, [s, graph, algorithm]);

  return { ...s, initializeSearch, stepSearch };
}
