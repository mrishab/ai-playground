import { SearchGraph } from "@/data/searchProblems";
import { AlgorithmType, SearchPath } from "./searchTypes";
import { orderFrontier } from "./searchOrdering";
import { expandSuccessors } from "./expandSuccessors";

export function executeSearchStep(
  frontier: SearchPath[],
  expanded: string[],
  graph: SearchGraph,
  algorithm: AlgorithmType,
) {
  if (!frontier || frontier.length === 0) {
    return {
      updatedFrontier: [], updatedExpanded: expanded, headNodeId: "",
      currentPath: [], isGoalReached: false, done: true, confetti: false,
      log: "Search exhausted: frontier is empty, no path to goal.",
    };
  }
  const currentFrontier = [...frontier];
  const chosenPath = currentFrontier.shift()!;
  const headNodeId = chosenPath.nodes[chosenPath.nodes.length - 1];

  if (graph.goalNodes.includes(headNodeId)) {
    return {
      updatedFrontier: currentFrontier, updatedExpanded: expanded, headNodeId,
      currentPath: chosenPath.nodes, isGoalReached: true, done: true, confetti: true,
      log: `Goal "${headNodeId}" reached! Total cost: ${chosenPath.cost.toFixed(1)}. Path: ${chosenPath.nodes.join(" -> ")}`,
    };
  }

  if (algorithm === "mpp" && expanded.includes(headNodeId)) {
    return {
      updatedFrontier: currentFrontier, updatedExpanded: expanded, headNodeId,
      currentPath: chosenPath.nodes, isGoalReached: false, done: false, confetti: false,
      log: `Multi-path pruning: Node "${headNodeId}" already expanded with optimal cost. Pruning path.`,
    };
  }

  const newExpanded = [...expanded, headNodeId];
  const newPaths = expandSuccessors(headNodeId, chosenPath, graph, algorithm);
  const updated = algorithm === "dfs" ? [...newPaths, ...currentFrontier] : [...currentFrontier, ...newPaths];
  const updatedFrontier = orderFrontier(updated, algorithm);
  const isDone = updatedFrontier.length === 0;

  return {
    updatedFrontier, updatedExpanded: newExpanded, headNodeId,
    currentPath: chosenPath.nodes, isGoalReached: false, done: isDone, confetti: false,
    log: isDone
      ? `Expanded "${headNodeId}". Added 0 paths. Frontier exhausted: no path to goal.`
      : `Expanded "${headNodeId}". Added ${newPaths.length} successor paths to frontier.`,
  };
}
