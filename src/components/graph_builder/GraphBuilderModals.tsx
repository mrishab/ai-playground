import React from "react";
import { SearchNode } from "@/data/searchProblems";
import { GraphBuilderEdge } from "./graphBuilderTypes";
import { GraphBuilderNodeModal } from "./GraphBuilderNodeModal";
import { GraphBuilderEdgeModal } from "./GraphBuilderEdgeModal";

interface GraphBuilderModalsProps {
  editingNode: SearchNode | null;
  editingEdge: GraphBuilderEdge | null;
  onSaveNode: (u: Partial<SearchNode>) => void;
  onDeleteNode: (id: string) => void;
  onCloseNode: () => void;
  onSaveEdge: (edge: GraphBuilderEdge, newCost: number) => void;
  onDeleteEdge: (edge: GraphBuilderEdge) => void;
  onCloseEdge: () => void;
}

export function GraphBuilderModals({
  editingNode, editingEdge, onSaveNode, onDeleteNode, onCloseNode,
  onSaveEdge, onDeleteEdge, onCloseEdge,
}: GraphBuilderModalsProps) {
  return (
    <>
      {editingNode && (
        <GraphBuilderNodeModal
          node={editingNode}
          onSave={onSaveNode}
          onDelete={onDeleteNode}
          onClose={onCloseNode}
        />
      )}
      {editingEdge && (
        <GraphBuilderEdgeModal
          edge={editingEdge}
          onSave={onSaveEdge}
          onDelete={onDeleteEdge}
          onClose={onCloseEdge}
        />
      )}
    </>
  );
}
