import { SearchGraph } from "@/data/searchProblems";

export function normalizeSearchGraph(updated: SearchGraph): SearchGraph {
  const rawNodes = Array.isArray(updated.nodes)
    ? updated.nodes
    : Array.isArray((updated as any).nodes?.node)
    ? (updated as any).nodes.node
    : (updated as any).nodes?.node
    ? [(updated as any).nodes.node]
    : [];
  const rawEdges = Array.isArray(updated.edges)
    ? updated.edges
    : Array.isArray((updated as any).edges?.edge)
    ? (updated as any).edges.edge
    : (updated as any).edges?.edge
    ? [(updated as any).edges.edge]
    : [];
  return {
    ...updated,
    nodes: rawNodes,
    edges: rawEdges,
    goalNodes: Array.isArray(updated.goalNodes) ? updated.goalNodes : [],
  };
}
