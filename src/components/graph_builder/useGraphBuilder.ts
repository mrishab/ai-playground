import { useRef, useEffect } from "react";
import { SearchGraph, SearchNode } from "@/data/searchProblems";
import { useGraphBuilderState } from "./useGraphBuilderState";
import { useGraphBuilderActions } from "./useGraphBuilderActions";
import { getCanvasCoords } from "./graphBuilderMath";

export function useGraphBuilder(
  initialGraph?: SearchGraph,
  onGraphChange?: (g: SearchGraph) => void,
) {
  const s = useGraphBuilderState(initialGraph);
  const setGraph = (updater: React.SetStateAction<SearchGraph>) => {
    s.setGraph((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      onGraphChange?.(next);
      return next;
    });
  };
  const a = useGraphBuilderActions({
    setGraph, setSelectedNodeId: s.setSelectedNodeId, setSelectedEdge: s.setSelectedEdge,
  });
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (initialGraph) s.setGraph(initialGraph);
  }, [initialGraph, s.setGraph]);

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (s.connectingSourceId) {
      s.setConnectingSourceId(null);
      s.setPointerPos(null);
      return;
    }
    if (s.mode === "add_node") {
      const { x, y } = getCanvasCoords(e, svgRef);
      a.addNodeAt(x, y);
    }
  };

  const handleNodeClick = (e: React.MouseEvent, node: SearchNode) => {
    e.stopPropagation();
    if (s.mode === "delete") {
      a.deleteNode(node.id);
    } else if (s.mode === "add_edge") {
      if (!s.connectingSourceId) {
        s.setConnectingSourceId(node.id);
      } else {
        a.addEdge(s.connectingSourceId, node.id);
        s.setConnectingSourceId(null);
        s.setPointerPos(null);
      }
    } else {
      s.setSelectedNodeId(node.id);
      s.setSelectedEdge(null);
    }
  };

  return { ...s, ...a, setGraph, svgRef, handleCanvasClick, handleNodeClick };
}
