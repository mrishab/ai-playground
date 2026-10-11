import { useState } from "react";
import { SearchGraph, SearchNode } from "@/data/searchProblems";
import { GraphBuilderToolMode, GraphBuilderEdge } from "./graphBuilderTypes";
import { TRIANGLE_PRESET } from "./graphBuilderPresets";

export function useGraphBuilderState(initialGraph: SearchGraph = TRIANGLE_PRESET) {
  const [graph, setGraph] = useState<SearchGraph>(initialGraph);
  const [mode, setMode] = useState<GraphBuilderToolMode>("move");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<GraphBuilderEdge | null>(null);
  const [connectingSourceId, setConnectingSourceId] = useState<string | null>(null);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null);
  const [editingNode, setEditingNode] = useState<SearchNode | null>(null);
  const [editingEdge, setEditingEdge] = useState<GraphBuilderEdge | null>(null);
  const [isDraggingNode, setIsDraggingNode] = useState(false);

  return {
    graph,
    setGraph,
    mode,
    setMode,
    selectedNodeId,
    setSelectedNodeId,
    selectedEdge,
    setSelectedEdge,
    connectingSourceId,
    setConnectingSourceId,
    pointerPos,
    setPointerPos,
    editingNode,
    setEditingNode,
    editingEdge,
    setEditingEdge,
    isDraggingNode,
    setIsDraggingNode,
  };
}
