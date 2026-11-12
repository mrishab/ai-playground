import React from "react";
import { Info } from "lucide-react";

export function CodeSandboxOutput({
  notes,
}: {
  output?: string;
  hasError?: boolean;
  notes?: string;
}) {
  return (
    <>
      <div className="border-t border-border bg-muted/40 p-3 text-xs flex items-center justify-between text-muted-foreground">
        <div className="flex items-center gap-2">
          <Info className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="text-[11px] leading-relaxed">
            The AI Space is a visual builder app. Code writing and running are not supported. Experiment with algorithms using the visual canvas and interactive controls.
          </span>
        </div>
      </div>

      {notes && (
        <div className="px-4 py-2 bg-secondary/20 text-muted-foreground text-[11px] border-t border-border/30 flex items-center gap-1.5">
          <span className="text-primary font-medium">Tip:</span> {notes}
        </div>
      )}
    </>
  );
}
