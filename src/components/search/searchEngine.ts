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
  const currentFrontier = [...frontier];
  const chosenPath = currentFrontier.shift()!;
  const headNodeId = chosenPath.nodes[chosenPath.nodes.length - 1];

  if (graph.goalNodes.includes(headNodeId)) {
    return {
      updatedFrontier: currentFrontier,
      updatedExpanded: expanded,
      headNodeId,
      currentPath: chosenPath.nodes,
      isGoalReached: true,
      log: `Goal "${headNodeId}" reached! Total cost: ${chosenPath.cost.toFixed(1)}. Path: ${chosenPath.nodes.join(" -> ")}`,
      confetti: true,
      done: true,
    };
  }

  if (algorithm === "mpp" && expanded.includes(headNodeId)) {
    return {
      updatedFrontier: currentFrontier,
      updatedExpanded: expanded,
      headNodeId,
      currentPath: chosenPath.nodes,
      isGoalReached: false,
      log: `Multi-path pruning: Node "${headNodeId}" already expanded with optimal cost. Pruning path.`,
      confetti: false,
      done: false,
    };
  }

  const newExpanded = [...expanded, headNodeId];
  const newPaths = expandSuccessors(headNodeId, chosenPath, graph);
  const updated =
    algorithm === "dfs"
      ? [...newPaths, ...currentFrontier]
      : [...currentFrontier, ...newPaths];

  return {
    updatedFrontier: orderFrontier(updated, algorithm),
    updatedExpanded: newExpanded,
    headNodeId,
    currentPath: chosenPath.nodes,
    isGoalReached: false,
    log: `Expanded "${headNodeId}". Added ${newPaths.length} successor paths to frontier.`,
    confetti: false,
    done: false,
  };
}
