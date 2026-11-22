import React from "react";

interface ConstraintGraphHeaderProps {
  arcQueueLength: number;
  activeSplitId: string | null;
}

export function ConstraintGraphHeader({
  arcQueueLength,
  activeSplitId,
}: ConstraintGraphHeaderProps) {
  return (
    <div className="absolute top-2 left-2 bg-card/80 backdrop-blur px-3 py-1.5 rounded-lg border border-border/60 text-[11px] text-muted-foreground flex items-center gap-3">
      <span>
        Arcs in Agenda:{" "}
        <strong className="text-primary">{arcQueueLength}</strong>
      </span>
      <span>
        Active Branch:{" "}
        <strong className="text-accent-foreground">
          {activeSplitId ? "Split Branch" : "Root"}
        </strong>
      </span>
    </div>
  );
}
