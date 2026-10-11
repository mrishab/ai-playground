import React from "react";
import { Hand, PlusCircle, ArrowUpRight, Trash2, Play, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { useGraphBuilder } from "./useGraphBuilder";
import { BLANK_GRAPH, TRIANGLE_PRESET, GRID_PRESET } from "./graphBuilderPresets";

interface GraphBuilderToolbarProps {
  gb: ReturnType<typeof useGraphBuilder>;
  onSolveGraph?: () => void;
}

export function GraphBuilderToolbar({ gb, onSolveGraph }: GraphBuilderToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-card border-b border-border text-xs">
      <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-lg">
        <Button size="sm" variant={gb.mode === "move" ? "default" : "ghost"} onClick={() => gb.setMode("move")} title="Move / Select Nodes"><Hand className="w-3.5 h-3.5 mr-1" /> Move</Button>
        <Button size="sm" variant={gb.mode === "add_node" ? "default" : "ghost"} onClick={() => gb.setMode("add_node")} title="Click to Add Node"><PlusCircle className="w-3.5 h-3.5 mr-1" /> Add Node</Button>
        <Button size="sm" variant={gb.mode === "add_edge" ? "default" : "ghost"} onClick={() => gb.setMode("add_edge")} title="Click or Drag between nodes to connect"><ArrowUpRight className="w-3.5 h-3.5 mr-1" /> Add Edge</Button>
        <Button size="sm" variant={gb.mode === "delete" ? "destructive" : "ghost"} onClick={() => gb.setMode("delete")} title="Click node or edge to delete"><Trash2 className="w-3.5 h-3.5 mr-1" /> Delete</Button>
      </div>

      <div className="flex items-center gap-2">
        <div data-testid="gb-drag-node-source" draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", "new-node")} className="px-2.5 py-1 rounded bg-primary/10 border border-primary/30 text-primary cursor-grab active:cursor-grabbing font-medium flex items-center gap-1" title="Drag and drop onto canvas to place a node">
          <Sparkles className="w-3 h-3" /> Drag Node to Canvas
        </div>
        <select aria-label="Load Graph Preset" value="" onChange={(e) => {
          if (e.target.value === "blank") gb.setGraph(BLANK_GRAPH);
          if (e.target.value === "triangle") gb.setGraph(TRIANGLE_PRESET);
          if (e.target.value === "grid") gb.setGraph(GRID_PRESET);
        }} className="h-8 px-2 text-xs rounded border border-input bg-card text-foreground">
          <option value="" disabled>Load Preset...</option>
          <option value="blank">Blank Canvas</option>
          <option value="triangle">Triangle Graph</option>
          <option value="grid">2x2 Grid</option>
        </select>
        {onSolveGraph && (
          <Button size="sm" variant="success" onClick={onSolveGraph} className="gap-1.5 font-bold"><Play className="w-3 h-3 fill-current" /> Solve in Animation</Button>
        )}
      </div>
    </div>
  );
}
