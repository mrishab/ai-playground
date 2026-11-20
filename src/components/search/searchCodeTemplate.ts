import { SearchGraph } from "@/data/searchProblems";
import { getAStarSnippet } from "./searchSnippetsAstar";
import { getDfsBfsSnippet, getBestFirstSnippet } from "./searchSnippetsClassic";

export function getSearchCodeTemplate(
  graph: SearchGraph,
  algorithm: string = "astar",
): string {
  switch (algorithm.toLowerCase()) {
    case "dfs":
      return getDfsBfsSnippet(graph, true);
    case "bfs":
      return getDfsBfsSnippet(graph, false);
    case "best_first":
      return getBestFirstSnippet(graph);
    case "mpp":
      return getAStarSnippet(graph, true);
    case "lcfs":
      return `// Lowest-Cost-First (Dijkstra) Search Reference Implementation\nfunction lcfs(startId, goalIds, graph) {\n  const frontier = [{ nodeId: startId, path: [startId], cost: 0 }];\n  while (frontier.length > 0) {\n    frontier.sort((a, b) => a.cost - b.cost);\n    const current = frontier.shift();\n    if (goalIds.includes(current.nodeId)) return { success: true, path: current.path, cost: current.cost };\n    for (const edge of graph.edges.filter(e => e.from === current.nodeId)) {\n      if (current.path.includes(edge.to)) continue;\n      frontier.push({ nodeId: edge.to, path: [...current.path, edge.to], cost: current.cost + edge.cost });\n    }\n  }\n  return { success: false };\n}\n`;
    case "astar":
    default:
      return getAStarSnippet(graph, false);
  }
}
