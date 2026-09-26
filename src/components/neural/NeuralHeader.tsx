import React from "react";
import { NEURAL_DATASETS, NeuralDataset } from "@/data/neuralProblems";
import { Badge } from "@/components/ui/Badge";

export function NeuralHeader({
  initialDataset,
  selectedDatasetId,
  onSelectDatasetId,
  loss,
  epoch,
  badgeText,
}: {
  initialDataset: NeuralDataset;
  selectedDatasetId: string;
  onSelectDatasetId: (id: string) => void;
  loss: number;
  epoch: number;
  badgeText: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold tracking-tight">
            Neural Network & Backprop Lab
          </span>
          <Badge variant="cyan">{badgeText}</Badge>
          {loss < 0.05 && epoch > 0 && (
            <Badge variant="success">Converged</Badge>
          )}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          {initialDataset.description}
        </p>
      </div>

      <select
        aria-label="Select Dataset"
        value={selectedDatasetId}
        onChange={(e) => onSelectDatasetId(e.target.value)}
        className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {Object.values(NEURAL_DATASETS).map((ds) => (
          <option key={ds.id} value={ds.id}>
            {ds.name}
          </option>
        ))}
      </select>
    </div>
  );
}
