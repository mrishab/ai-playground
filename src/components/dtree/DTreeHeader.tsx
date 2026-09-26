import React from "react";
import { DTREE_DATASETS, DTreeDataset } from "@/data/dtreeProblems";
import { ToolTutorialData } from "@/data/toolTutorials";
import { Badge } from "../ui/Badge";

interface DTreeHeaderProps {
  selectedDatasetId: string;
  setSelectedDatasetId: (id: string) => void;
  dataset: DTreeDataset;
  tutorial: ToolTutorialData;
}

export function DTreeHeader({
  selectedDatasetId,
  setSelectedDatasetId,
  dataset,
  tutorial,
}: DTreeHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold tracking-tight">
            Decision Tree Induction Lab
          </span>
          <Badge variant="cyan">{tutorial.badge}</Badge>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          {dataset.description}
        </p>
      </div>

      <select
        aria-label="Select Decision Tree Dataset"
        value={selectedDatasetId}
        onChange={(e) => setSelectedDatasetId(e.target.value)}
        className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {Object.values(DTREE_DATASETS).map((ds) => (
          <option key={ds.id} value={ds.id}>
            {ds.name}
          </option>
        ))}
      </select>
    </div>
  );
}
