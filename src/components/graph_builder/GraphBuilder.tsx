import React from "react";
import { SearchGraph } from "@/data/searchProblems";
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

  const handleSaveNode = (u: any) => {
    gb.setGraph((prev) => {
      const nodes = prev.nodes.map((n) => (n.id === gb.editingNode?.id ? { ...n, ...u } : n));
      const startNode = u.isStart ? gb.editingNode!.id : prev.startNode === gb.editingNode!.id && !u.isStart ? "" : prev.startNode;
      const goalNodes = u.isGoal ? Array.from(new Set([...prev.goalNodes, gb.editingNode!.id])) : prev.goalNodes.filter((g) => g !== gb.editingNode!.id);
      const next = { ...prev, nodes, startNode, goalNodes };
      onGraphChange?.(next);
      return next;
    });
  };

  const handleSaveEdge = (edge: any, cost: number) => {
    gb.setGraph((prev) => {
      const edges = prev.edges.map((e) => (e.from === edge.from && e.to === edge.to ? { ...e, cost } : e));
      const next = { ...prev, edges };
      onGraphChange?.(next);
      return next;
    });
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
