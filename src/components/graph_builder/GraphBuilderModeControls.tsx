import React from "react";
import { Hand, PlusCircle, ArrowUpRight, Trash2, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { GraphBuilderToolMode } from "./graphBuilderTypes";

interface Props {
  mode: GraphBuilderToolMode;
  setMode: (m: GraphBuilderToolMode) => void;
}

export function GraphBuilderModeControls({ mode, setMode }: Props) {
  return (
    <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-lg">
      <Button size="sm" variant={mode === "move" ? "default" : "ghost"} onClick={() => setMode("move")} title="Move / Select Nodes">
        <Hand className="w-3.5 h-3.5 mr-1" /> Move
      </Button>
      <Button size="sm" variant={mode === "add_node" ? "default" : "ghost"} onClick={() => setMode("add_node")} title="Click to Add Node">
        <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add Node
      </Button>
      <Button size="sm" variant={mode === "add_edge" ? "default" : "ghost"} onClick={() => setMode("add_edge")} title="Click or Drag between nodes to connect">
        <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> Add Edge
      </Button>
      <Button size="sm" variant={mode === "delete" ? "destructive" : "ghost"} onClick={() => setMode("delete")} title="Click node or edge to delete">
        <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
      </Button>
      <div
        data-testid="gb-drag-node-source"
        draggable
        onDragStart={(e) => e.dataTransfer?.setData?.("text/plain", "new-node")}
        className="px-2.5 py-1 rounded bg-primary/10 border border-primary/30 text-primary cursor-grab active:cursor-grabbing font-medium flex items-center gap-1 transition-colors duration-150"
        title="Drag and drop onto canvas to place a node"
      >
        <Sparkles className="w-3 h-3" /> Drag Node
      </div>
    </div>
  );
}
