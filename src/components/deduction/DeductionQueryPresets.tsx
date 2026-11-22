import React from "react";

interface DeductionQueryPresetsProps {
  sampleQueries: string[];
  onQueryChange: (q: string) => void;
}

export function DeductionQueryPresets({ sampleQueries, onQueryChange }: DeductionQueryPresetsProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
        <span>Interactive Query Goal</span>
        <span className="text-[10px] font-normal">Presets:</span>
      </div>
      <div className="flex flex-wrap items-center gap-1">
        {sampleQueries.map((sq) => (
          <button
            key={sq}
            onClick={() => onQueryChange(sq)}
            className="text-[10px] px-2 py-0.5 rounded bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors font-mono max-w-full truncate"
            title={sq}
          >
            {sq}
          </button>
        ))}
      </div>
    </div>
  );
}
