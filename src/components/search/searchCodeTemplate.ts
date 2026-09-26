import { SearchGraph } from "@/data/searchProblems";

export function getSearchCodeTemplate(graph: SearchGraph): string {
  return `// A* Graph Search Implementation
function aStarSearch(startNodeId, goalNodeIds, graph) {
  const frontier = [{
    nodeId: startNodeId,
    path: [startNodeId],
    g: 0,
    h: graph.nodes.find(n => n.id === startNodeId)?.h || 0,
    f: graph.nodes.find(n => n.id === startNodeId)?.h || 0
  }];
  
  const visited = new Set();
  const logs = [];

  while (frontier.length > 0) {
    // Sort frontier by f(n) = g(n) + h(n)
    frontier.sort((a, b) => a.f - b.f);
    const current = frontier.shift();
    logs.push(\`Expanding node: \${current.nodeId} (g=\${current.g}, h=\${current.h}, f=\${current.f})\`);

    if (goalNodeIds.includes(current.nodeId)) {
      logs.push(\`GOAL FOUND: \${current.path.join(' -> ')} with cost \${current.g}\`);
      return { success: true, path: current.path, cost: current.g, logs };
    }

    if (visited.has(current.nodeId)) continue;
    visited.add(current.nodeId);

    const edges = graph.edges.filter(e => e.from === current.nodeId);
    for (const edge of edges) {
      if (current.path.includes(edge.to)) continue; // cycle check
      const neighborNode = graph.nodes.find(n => n.id === edge.to);
      const h = neighborNode ? neighborNode.h : 0;
      const g = current.g + edge.cost;
      frontier.push({
        nodeId: edge.to,
        path: [...current.path, edge.to],
        g: g,
        h: h,
        f: g + h
      });
    }
  }

  return { success: false, logs };
}

const result = aStarSearch("${graph.startNode}", ${JSON.stringify(graph.goalNodes)}, {
  nodes: ${JSON.stringify(graph.nodes.slice(0, 8))},
  edges: ${JSON.stringify(graph.edges.slice(0, 10))}
});
return result.logs.join('\\n');
`;
}
