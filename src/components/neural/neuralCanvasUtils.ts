import React from "react";
import { DataPoint } from "@/data/neuralProblems";

export function getCanvasClickPoint(
  e: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement,
  forceClass1?: boolean,
): DataPoint {
  const rect = canvas.getBoundingClientRect();
  const px = e.clientX - rect.left;
  const py = e.clientY - rect.top;
  const x = Math.max(-0.95, Math.min(0.95, (px / rect.width) * 2 - 1));
  const y = Math.max(-0.95, Math.min(0.95, -((py / rect.height) * 2 - 1)));
  const label = e.shiftKey || forceClass1 || e.button === 2 ? 1 : 0;
  return { x, y, label };
}
