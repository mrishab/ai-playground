import React, { useRef, useEffect } from "react";
import { DataPoint } from "@/data/neuralProblems";
import { NeuralWeights } from "./neuralMath";
import { renderNeuralCanvas } from "./neuralCanvas";
import { getCanvasClickPoint } from "./neuralCanvasUtils";

export function NeuralCanvasElement({
  weightsRef,
  points,
  onAddPoint,
  epoch,
  selectedDatasetId,
}: {
  weightsRef: React.MutableRefObject<NeuralWeights>;
  points: DataPoint[];
  onAddPoint: (p: DataPoint) => void;
  epoch: number;
  selectedDatasetId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      renderNeuralCanvas(canvasRef.current, weightsRef.current, points);
    }
  }, [points, epoch, selectedDatasetId, weightsRef]);

  const handleClick = (
    e: React.MouseEvent<HTMLCanvasElement>,
    force?: boolean,
  ) => {
    if (canvasRef.current)
      onAddPoint(getCanvasClickPoint(e, canvasRef.current, force));
  };

  return (
    <div className="p-4 bg-slate-50 dark:bg-[#070a13] flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        width={480}
        height={320}
        tabIndex={0}
        role="img"
        aria-label="Neural network visualization canvas"
        onClick={(e) => handleClick(e)}
        onKeyDown={(e) => { if (e.key === "Enter") handleClick(e as any); }}
        onContextMenu={(e) => {
          e.preventDefault();
          handleClick(e, true);
        }}
        className="rounded-xl border border-border shadow-2xl cursor-crosshair max-w-full"
      />
    </div>
  );
}
