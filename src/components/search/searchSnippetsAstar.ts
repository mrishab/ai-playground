import { SearchGraph } from "@/data/searchProblems";

export function getAStarSnippet(graph: SearchGraph, isMpp: boolean = false): string {
  const mode = isMpp ? "graph_search" : "tree_search";
  return `// A* Search (${isMpp ? "Graph Search with MPP" : "Tree Search / Graph Search"})
// Tree Search: explores paths with path-cycle check; no closed list.
// Graph Search (MPP): maintains explored/closed set to prune re-expansions.
function aStar(startId, goalIds, graph, mode = "${mode}") {
  const getH = (id) => graph.nodes.find(n => n.id === id)?.h || 0;
  const frontier = [{
    nodeId: startId, path: [startId], g: 0, h: getH(startId), f: getH(startId)
  }];
  const explored = new Set();
  const logs = [];

  while (frontier.length > 0) {
    frontier.sort((a, b) => a.f - b.f); // Priority: f(n) = g(n) + h(n)
    const current = frontier.shift();

    if (goalIds.includes(current.nodeId)) {
      logs.push(\`GOAL FOUND: \${current.path.join(" -> ")} (cost=\${current.g})\`);
      return { success: true, path: current.path, cost: current.g, logs };
    }

    if (mode === "graph_search") {
      if (explored.has(current.nodeId)) continue; // Multi-path pruning
      explored.add(current.nodeId);
    }

    logs.push(\`Expand: \${current.nodeId} (g=\${current.g}, h=\${current.h}, f=\${current.f})\`);
    for (const edge of graph.edges.filter(e => e.from === current.nodeId)) {
      if (current.path.includes(edge.to)) continue; // Path cycle check
      const g = current.g + edge.cost;
      const h = getH(edge.to);
      frontier.push({ nodeId: edge.to, path: [...current.path, edge.to], g, h, f: g + h });
    }
  }
  return { success: false, logs };
}

const res = aStar("${graph.startNode}", ${JSON.stringify(graph.goalNodes)}, {
  nodes: ${JSON.stringify(graph.nodes.slice(0, 8))},
  edges: ${JSON.stringify(graph.edges.slice(0, 10))}
}, "${mode}");
return res.logs.join('\\n');
`;
}
