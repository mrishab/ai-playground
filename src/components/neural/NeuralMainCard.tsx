import React from "react";
import { Card } from "@/components/ui/Card";
import { NeuralToolbar } from "./NeuralToolbar";
import { NeuralCanvasCard } from "./NeuralCanvasCard";
import { DataPoint } from "@/data/neuralProblems";
import { NeuralWeights } from "./neuralMath";

interface MainCardProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStep1: () => void;
  onStep10: () => void;
  onReset: () => void;
  weightsRef: React.MutableRefObject<NeuralWeights>;
  points: DataPoint[];
  onAddPoint: (p: DataPoint) => void;
  epoch: number;
  loss: number;
  selectedDatasetId: string;
  speed: number;
  setSpeed: (v: number) => void;
}

export function NeuralMainCard(p: MainCardProps) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <NeuralToolbar
        isPlaying={p.isPlaying}
        onTogglePlay={p.onTogglePlay}
        onStep1={p.onStep1}
        onStep10={p.onStep10}
        onReset={p.onReset}
        speed={p.speed}
        setSpeed={p.setSpeed}
      />
      <NeuralCanvasCard
        weightsRef={p.weightsRef}
        points={p.points}
        onAddPoint={p.onAddPoint}
        epoch={p.epoch}
        loss={p.loss}
        selectedDatasetId={p.selectedDatasetId}
      />
    </Card>
  );
}
