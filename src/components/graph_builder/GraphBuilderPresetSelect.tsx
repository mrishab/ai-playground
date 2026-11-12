import React from "react";
import { Play } from "lucide-react";
import { Button } from "../ui/Button";
import { SearchGraph } from "@/data/searchProblems";
import { BLANK_GRAPH, TRIANGLE_PRESET, GRID_PRESET } from "./graphBuilderPresets";

interface Props {
  onSetGraph: (g: SearchGraph) => void;
  onSolveGraph?: () => void;
}

export function GraphBuilderPresetSelect({ onSetGraph, onSolveGraph }: Props) {
  return (
    <>
      <select
        aria-label="Load Graph Preset"
        value=""
        onChange={(e) => {
          if (e.target.value === "blank") onSetGraph(BLANK_GRAPH);
          if (e.target.value === "triangle") onSetGraph(TRIANGLE_PRESET);
          if (e.target.value === "grid") onSetGraph(GRID_PRESET);
        }}
        className="h-8 px-2 text-xs rounded border border-input bg-card text-foreground"
      >
        <option value="" disabled>Load Preset...</option>
        <option value="blank">Blank Canvas</option>
        <option value="triangle">Triangle Graph</option>
        <option value="grid">2x2 Grid</option>
      </select>
      {onSolveGraph && (
        <Button size="sm" variant="success" onClick={onSolveGraph} className="gap-1.5 font-bold">
          <Play className="w-3 h-3 fill-current" /> Solve in Animation
        </Button>
      )}
    </>
  );
}
