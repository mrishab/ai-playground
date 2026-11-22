import React from "react";

export function NeuralMetricsFooter({
  epoch,
  loss,
  pointCount,
  accuracy,
  bce,
}: {
  epoch: number;
  loss: number;
  pointCount: number;
  accuracy?: number;
  bce?: number;
}) {
  return (
    <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-4">
        <span>
          Epoch: <strong className="text-primary">{epoch}</strong>
        </span>
        <span>
          Loss (MSE):{" "}
          <strong
            className={loss < 0.05 ? "text-primary" : "text-destructive"}
          >
            {loss.toFixed(4)}
          </strong>
        </span>
        {bce !== undefined && (
          <span>
            BCE: <strong className="text-foreground">{bce.toFixed(4)}</strong>
          </span>
        )}
        {accuracy !== undefined && (
          <span>
            Accuracy:{" "}
            <strong className={accuracy >= 90 ? "text-primary" : "text-foreground"}>
              {accuracy.toFixed(1)}%
            </strong>
          </span>
        )}
        <span>
          Points: <strong className="text-foreground">{pointCount}</strong>
        </span>
      </div>
    </div>
  );
}
