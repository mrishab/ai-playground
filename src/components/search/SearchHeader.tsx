import React from "react";
import { SearchGraph } from "@/data/searchProblems";
import { ToolTutorialData } from "@/data/toolTutorials";
import { Badge } from "../ui/Badge";
import { AlgorithmType } from "./searchTypes";
import { SearchProblemSelect } from "./SearchProblemSelect";

interface SearchHeaderProps {
  selectedGraphId: string;
  setSelectedGraphId: (id: string) => void;
  algorithm: AlgorithmType;
  setAlgorithm: (algo: AlgorithmType) => void;
  graph: SearchGraph;
  tutorial: ToolTutorialData;
}

export function SearchHeader({
  selectedGraphId,
  setSelectedGraphId,
  algorithm,
  setAlgorithm,
  graph,
  tutorial,
}: SearchHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold tracking-tight">
            Graph Searching Lab
          </span>
          <Badge variant="cyan">{tutorial.badge}</Badge>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          {graph.description}
        </p>
      </div>

      <SearchProblemSelect
        selectedGraphId={selectedGraphId}
        setSelectedGraphId={setSelectedGraphId}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
      />
    </div>
  );
}
