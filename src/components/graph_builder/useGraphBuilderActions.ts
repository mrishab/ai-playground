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
      const id = `N${prev.nodes.length + 1}`;
      const isFirst = prev.nodes.length === 0;
      const newNode: SearchNode = { id, name: id, x, y, isStart: isFirst, isGoal: false, h: 0 };
      return { ...prev, nodes: [...prev.nodes, newNode], startNode: isFirst ? id : prev.startNode };
    });
  }, [setGraph]);

  const moveNode = useCallback((id: string, x: number, y: number) => {
    setGraph((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (n.id === id ? { ...n, x, y } : n)),
    }));
  }, [setGraph]);

  const addEdge = useCallback((from: string, to: string, cost = 1.0) => {
    if (from === to) return;
    setGraph((prev) => {
      if (prev.edges.some((e) => e.from === from && e.to === to)) return prev;
      return { ...prev, edges: [...prev.edges, { from, to, cost }] };
    });
  }, [setGraph]);

  const deleteNode = useCallback((id: string) => {
    setGraph((prev) => ({
      ...prev,
      nodes: prev.nodes.filter((n) => n.id !== id),
      edges: prev.edges.filter((e) => e.from !== id && e.to !== id),
      goalNodes: prev.goalNodes.filter((g) => g !== id),
      startNode: prev.startNode === id ? (prev.nodes.find((n) => n.id !== id)?.id || "") : prev.startNode,
    }));
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
