import { SearchGraph } from "@/data/searchProblems";

export function normalizeImportedGraphData(imported: any): SearchGraph {
  const rawNodes = Array.isArray(imported?.nodes)
    ? imported.nodes
    : Array.isArray(imported?.nodes?.node)
    ? imported.nodes.node
    : imported?.nodes?.node
    ? [imported.nodes.node]
    : [];
  if (rawNodes.length === 0) throw new Error("Invalid graph format: missing nodes array");

  const rawEdges = Array.isArray(imported?.edges)
    ? imported.edges
    : Array.isArray(imported?.edges?.edge)
    ? imported.edges.edge
    : imported?.edges?.edge
    ? [imported.edges.edge]
    : [];

  const normalizedNodes = rawNodes.map((n: any, idx: number) => ({
    id: String(n.id || `node-${idx + 1}`),
    label: String(n.label || n.id || `Node ${idx + 1}`),
    x: typeof n.x === "number" ? n.x : Number(n.x) || 100 + (idx % 5) * 80,
    y: typeof n.y === "number" ? n.y : Number(n.y) || 100 + Math.floor(idx / 5) * 80,
    isStart: Boolean(n.isStart),
    isGoal: Boolean(n.isGoal),
    heuristic: typeof n.heuristic === "number" ? n.heuristic : Number(n.heuristic) || 0,
  }));

  const normalizedEdges = rawEdges.map((e: any, idx: number) => ({
    id: String(e.id || `${e.from || e.source}-${e.to || e.target}-${idx}`),
    from: String(e.from || e.source || ""),
    to: String(e.to || e.target || ""),
    cost: typeof e.cost === "number" ? e.cost : Number(e.cost) || 1,
  }));

  return {
    id: imported.id || "custom",
    name: imported.name || "Custom Graph",
    description: imported.description || "Imported graph",
    startNode: imported.startNode || (normalizedNodes.find((n: any) => n.isStart)?.id || normalizedNodes[0]?.id || ""),
    goalNodes: Array.isArray(imported.goalNodes)
      ? imported.goalNodes
      : normalizedNodes.filter((n: any) => n.isGoal).map((n: any) => n.id),
    nodes: normalizedNodes,
    edges: normalizedEdges,
  };
}
