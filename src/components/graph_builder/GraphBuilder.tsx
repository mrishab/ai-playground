import React from "react";
import { SearchGraph, SearchNode } from "@/data/searchProblems";
import { GraphBuilderEdge } from "./graphBuilderTypes";
import { useGraphBuilder } from "./useGraphBuilder";
import { GraphBuilderToolbar } from "./GraphBuilderToolbar";
import { GraphBuilderCanvas } from "./GraphBuilderCanvas";
import { GraphBuilderFooter } from "./GraphBuilderFooter";
import { GraphBuilderModals } from "./GraphBuilderModals";

interface GraphBuilderProps {
  initialGraph?: SearchGraph;
  onGraphChange?: (g: SearchGraph) => void;
  onSolveGraph?: () => void;
}

export function GraphBuilder({ initialGraph, onGraphChange, onSolveGraph }: GraphBuilderProps) {
  const gb = useGraphBuilder(initialGraph, onGraphChange);

  const handleSaveNode = (u: Partial<SearchNode>) => {
    gb.setGraph((prev) => {
      const id = gb.editingNode?.id;
      const nodes = prev.nodes.map((n) => (n.id === id ? { ...n, ...u } : u.isStart ? { ...n, isStart: false } : n));
      const startNode = u.isStart ? id! : prev.startNode === id && u.isStart === false ? "" : prev.startNode;
      const goalNodes = u.isGoal ? Array.from(new Set([...prev.goalNodes, id!])) : prev.goalNodes.filter((g) => g !== id);
      return { ...prev, nodes, startNode, goalNodes };
    });
  };

  const handleSaveEdge = (edge: GraphBuilderEdge, cost: number) => {
    gb.setGraph((prev) => ({
      ...prev,
      edges: prev.edges.map((e) => (e.from === edge.from && e.to === edge.to ? { ...e, cost } : e)),
    }));
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-md">
      <GraphBuilderToolbar gb={gb} onSolveGraph={onSolveGraph} />
      <GraphBuilderCanvas gb={gb} />
      <GraphBuilderFooter graph={gb.graph} />
      <GraphBuilderModals
        editingNode={gb.editingNode}
        editingEdge={gb.editingEdge}
        onSaveNode={handleSaveNode}
        onDeleteNode={gb.deleteNode}
        onCloseNode={() => gb.setEditingNode(null)}
        onSaveEdge={handleSaveEdge}
        onDeleteEdge={gb.deleteEdge}
        onCloseEdge={() => gb.setEditingEdge(null)}
      />
    </div>
  );
}
