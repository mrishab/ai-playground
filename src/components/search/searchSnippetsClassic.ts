import { SearchGraph } from "@/data/searchProblems";

export function getDfsBfsSnippet(graph: SearchGraph, isDfs: boolean): string {
  const type = isDfs ? "DFS (LIFO Stack)" : "BFS (FIFO Queue)";
  const popOp = isDfs ? "pop()" : "shift()";
  return `// ${type} Reference Implementation
function ${isDfs ? "depthFirstSearch" : "breadthFirstSearch"}(startId, goalIds, graph) {
  const frontier = [{ nodeId: startId, path: [startId], cost: 0 }];
  const logs = [];

  while (frontier.length > 0) {
    const current = frontier.${popOp}; // ${isDfs ? "LIFO" : "FIFO"} order
    logs.push(\`Visiting: \${current.nodeId} (depth \${current.path.length - 1})\`);
    if (goalIds.includes(current.nodeId)) return { success: true, path: current.path, logs };

    for (const edge of graph.edges.filter(e => e.from === current.nodeId)) {
      if (current.path.includes(edge.to)) continue; // cycle prune along current path
      frontier.push({ nodeId: edge.to, path: [...current.path, edge.to], cost: current.cost + edge.cost });
    }
  }
  return { success: false, logs };
}
`;
}

export function getBestFirstSnippet(graph: SearchGraph): string {
  return `// Greedy Best-First Search Reference Implementation
// Frontier: Priority queue ordered strictly by heuristic h(n) (f = h)
function greedyBestFirst(startId, goalIds, graph) {
  const getH = (id) => graph.nodes.find(n => n.id === id)?.h || 0;
  const frontier = [{ nodeId: startId, path: [startId], cost: 0, h: getH(startId), f: getH(startId) }];
  const logs = [];

  while (frontier.length > 0) {
    frontier.sort((a, b) => a.h - b.h); // Priority by h: f = h
    const current = frontier.shift();
    logs.push(\`Expand: \${current.nodeId} (h=\${current.h}, f=h=\${current.h})\`);
    if (goalIds.includes(current.nodeId)) return { success: true, path: current.path, logs };

    for (const edge of graph.edges.filter(e => e.from === current.nodeId)) {
      if (current.path.includes(edge.to)) continue;
      const h = getH(edge.to);
      frontier.push({ nodeId: edge.to, path: [...current.path, edge.to], cost: current.cost + edge.cost, h, f: h });
    }
  }
  return { success: false, logs };
}
`;
}
