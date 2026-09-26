import React from "react";
import { Terminal, AlertCircle } from "lucide-react";

export function CodeSandboxOutput({
  output,
  hasError,
  notes,
}: {
  output: string;
  hasError: boolean;
  notes?: string;
}) {
  return (
    <>
      <div className="border-t border-border bg-slate-100/70 dark:bg-[#070a12] p-3 text-xs font-mono">
        <div className="flex items-center justify-between mb-1.5 text-muted-foreground pb-1 border-b border-border/40">
          <div className="flex items-center gap-1.5 text-[11px]">
            <Terminal className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Console Output</span>
          </div>
          {hasError ? (
            <span className="flex items-center gap-1 text-destructive text-[11px]">
              <AlertCircle className="h-3 w-3" /> Execution Error
            </span>
          ) : (
            <span className="text-emerald-500 text-[10px]">
              Ready
            </span>
          )}
        </div>
        <pre
          aria-live="polite"
          className={`whitespace-pre-wrap max-h-32 overflow-y-auto ${hasError ? "text-rose-500" : "text-foreground/90"}`}
        >
          {output}
        </pre>
      </div>

      {notes && (
        <div className="px-4 py-2 bg-secondary/20 text-muted-foreground text-[11px] border-t border-border/30 flex items-center gap-1.5">
          <span className="text-primary font-medium">Tip:</span> {notes}
        </div>
      )}
    </>
  );
}
