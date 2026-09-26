import React from "react";
import { DataPoint } from "@/data/neuralProblems";
import { NeuralWeights } from "./neuralMath";
import { NeuralMetricsFooter } from "./NeuralMetricsFooter";
import { NeuralCanvasElement } from "./NeuralCanvasElement";

export function NeuralCanvasCard({
  weightsRef,
  points,
  onAddPoint,
  epoch,
  loss,
  selectedDatasetId,
}: {
  weightsRef: React.MutableRefObject<NeuralWeights>;
  points: DataPoint[];
  onAddPoint: (p: DataPoint) => void;
  epoch: number;
  loss: number;
  selectedDatasetId: string;
}) {
  return (
    <div className="space-y-0">
      <NeuralCanvasElement
        weightsRef={weightsRef}
        points={points}
        onAddPoint={onAddPoint}
        epoch={epoch}
        selectedDatasetId={selectedDatasetId}
      />
      <NeuralMetricsFooter
        epoch={epoch}
        loss={loss}
        pointCount={points.length}
      />
    </div>
  );
}
