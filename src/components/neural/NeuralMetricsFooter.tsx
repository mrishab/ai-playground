import React from "react";

export function NeuralMetricsFooter({
  epoch,
  loss,
  pointCount,
}: {
  epoch: number;
  loss: number;
  pointCount: number;
}) {
  return (
    <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span>
          Epoch: <strong className="text-primary">{epoch}</strong>
        </span>
        <span>
          Loss (MSE):{" "}
          <strong
            className={loss < 0.05 ? "text-emerald-400" : "text-amber-400"}
          >
            {loss.toFixed(4)}
          </strong>
        </span>
        <span>
          Points: <strong className="text-foreground">{pointCount}</strong>
        </span>
      </div>
    </div>
  );
}
