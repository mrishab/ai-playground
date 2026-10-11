import { useCallback } from "react";
import { SearchGraph, SearchNode } from "@/data/searchProblems";
import { GraphBuilderEdge } from "./graphBuilderTypes";

type StateSetters = {
  setGraph: React.Dispatch<React.SetStateAction<SearchGraph>>;
  setSelectedNodeId: (id: string | null) => void;
  setSelectedEdge: (edge: GraphBuilderEdge | null) => void;
};

export function useGraphBuilderActions({ setGraph, setSelectedNodeId, setSelectedEdge }: StateSetters) {
  const addNodeAt = useCallback((x: number, y: number) => {
    setGraph((prev) => {
      let idx = prev.nodes.length + 1;
      while (prev.nodes.some((n) => n.id === `N${idx}`)) idx++;
      const id = `N${idx}`;
      const isFirst = prev.nodes.length === 0;
      const newNode: SearchNode = { id, name: id, x, y, isStart: isFirst, isGoal: false, h: 0 };
      return { ...prev, nodes: [...prev.nodes, newNode], startNode: isFirst ? id : prev.startNode };
    });
  }, [setGraph]);

  const moveNode = useCallback((id: string, x: number, y: number) => {
    setGraph((prev) => ({ ...prev, nodes: prev.nodes.map((n) => (n.id === id ? { ...n, x, y } : n)) }));
  }, [setGraph]);

  const addEdge = useCallback((from: string, to: string, cost = 1.0) => {
    if (from === to) return;
    setGraph((prev) => {
      if (prev.edges.some((e) => e.from === from && e.to === to)) return prev;
      return { ...prev, edges: [...prev.edges, { from, to, cost: Math.max(0.1, cost) }] };
    });
  }, [setGraph]);

  const deleteNode = useCallback((id: string) => {
    setGraph((prev) => {
      const remainingNodes = prev.nodes.filter((n) => n.id !== id);
      const nextStartId = prev.startNode === id ? (remainingNodes[0]?.id || "") : prev.startNode;
      const updatedNodes = remainingNodes.map((n) => ({ ...n, isStart: n.id === nextStartId }));
      return {
        ...prev, nodes: updatedNodes, startNode: nextStartId,
        edges: prev.edges.filter((e) => e.from !== id && e.to !== id),
        goalNodes: prev.goalNodes.filter((g) => g !== id),
      };
    });
    setSelectedNodeId(null);
  }, [setGraph, setSelectedNodeId]);

  const deleteEdge = useCallback((edge: GraphBuilderEdge) => {
    setGraph((prev) => ({
      ...prev,
      edges: prev.edges.filter((e) => !(e.from === edge.from && e.to === edge.to)),
    }));
    setSelectedEdge(null);
  }, [setGraph, setSelectedEdge]);

  return { addNodeAt, moveNode, addEdge, deleteNode, deleteEdge };
}
