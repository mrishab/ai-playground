import { getCanvasCoords } from "./graphBuilderMath";
import { SearchNode } from "@/data/searchProblems";
import { useGraphBuilder } from "./useGraphBuilder";

export function useGraphBuilderEvents(gb: ReturnType<typeof useGraphBuilder>) {
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const coords = getCanvasCoords(e, gb.svgRef);
    if (gb.connectingSourceId) gb.setPointerPos(coords);
    if (gb.isDraggingNode && gb.selectedNodeId) {
      gb.moveNode(gb.selectedNodeId, coords.x, coords.y);
    }
  };

  const handleMouseUp = () => {
    if (gb.isDraggingNode) gb.setIsDraggingNode(false);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, node: SearchNode) => {
    if (gb.mode === "move") {
      gb.setSelectedNodeId(node.id);
      gb.setIsDraggingNode(true);
    }
  };

  const handleDrop = (e: React.DragEvent<SVGSVGElement>) => {
    e.preventDefault();
    const coords = getCanvasCoords(e, gb.svgRef);
    gb.addNodeAt(coords.x, coords.y);
  };

  return { handleMouseMove, handleMouseUp, handleNodeMouseDown, handleDrop };
}
