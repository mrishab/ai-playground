import { SearchGraph } from "@/data/searchProblems";
import { AlgorithmType, SearchPath } from "./searchTypes";

export function expandSuccessors(
  headNodeId: string,
  chosenPath: SearchPath,
  graph: SearchGraph,
  algorithm?: AlgorithmType,
): SearchPath[] {
  const outgoing = graph.edges.filter((e) => e.from === headNodeId);
  const newPaths: SearchPath[] = [];
  const visitedSet = new Set(chosenPath.nodes);
  const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]));

  for (const edge of outgoing) {
    if (visitedSet.has(edge.to)) continue;
    const nNode = nodeMap.get(edge.to);
    const nH = nNode ? nNode.h : 0;
    const cost = chosenPath.cost + edge.cost;
    const f = algorithm === "best_first" ? nH : algorithm === "lcfs" ? cost : cost + nH;
    newPaths.push({
      nodes: [...chosenPath.nodes, edge.to],
      cost,
      h: nH,
      f,
    });
  }

  return newPaths;
}
