export const DEFAULT_ALGO_SNIPPETS: Record<string, string> = {
  dfs: `// Depth-First Search (DFS)
function dfs(graph, start, goal) {
  const stack = [[start]], visited = new Set();
  while (stack.length) {
    const path = stack.pop(), node = path[path.length - 1];
    if (node === goal) return path;
    if (!visited.has(node)) {
      visited.add(node);
      for (const next of graph[node] || []) stack.push([...path, next]);
    }
  }
  return null;
}`,
  bfs: `// Breadth-First Search (BFS)
function bfs(graph, start, goal) {
  const queue = [[start]], visited = new Set([start]);
  while (queue.length) {
    const path = queue.shift(), node = path[path.length - 1];
    if (node === goal) return path;
    for (const next of graph[node] || []) {
      if (!visited.has(next)) { visited.add(next); queue.push([...path, next]); }
    }
  }
  return null;
}`,
  tabu: `// Tabu Search
function tabuSearch(problem, tenure = 3, maxSteps = 100) {
  let current = initAssignment(problem), tabuList = [];
  for (let s = 0; s < maxSteps; s++) {
    const moves = getCandidates(current).filter(m => !isTabu(m, tabuList, s));
    current = pickBest(moves);
    tabuList.push({ move: current, expire: s + tenure });
  }
  return current;
}`,
  perceptron: `// Single-Layer Perceptron (SLP)
function trainPerceptron(data, lr = 0.1, epochs = 100) {
  let w = [0, 0], b = 0;
  for (let ep = 0; ep < epochs; ep++) {
    for (const { x, y, label } of data) {
      const pred = (w[0] * x + w[1] * y + b) >= 0 ? 1 : 0;
      const err = label - pred;
      w[0] += lr * err * x; w[1] += lr * err * y; b += lr * err;
    }
  }
  return { w, b };
}`,
};
