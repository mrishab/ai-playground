import React from "react";

export function NeuralToolbarHint() {
  return (
    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
      <span>Click canvas to add:</span>
      <span className="text-sky-400 font-semibold">Click (Class 0)</span>
      <span>•</span>
      <span className="text-rose-400 font-semibold">Shift+Click (Class 1)</span>
    </div>
  );
}
