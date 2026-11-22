import React from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface ConstraintGraphFooterProps {
  log: string;
  hasDomainWipeout: boolean;
  isCSPFullySolved: boolean;
}

export function ConstraintGraphFooter({
  log,
  hasDomainWipeout,
  isCSPFullySolved,
}: ConstraintGraphFooterProps) {
  return (
    <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs flex items-center justify-between">
      <span className="text-foreground/90 truncate max-w-xl">{log}</span>
      {hasDomainWipeout && (
        <span className="flex items-center gap-1 text-destructive font-semibold text-xs">
          <AlertTriangle className="h-3.5 w-3.5" /> Wipeout
        </span>
      )}
      {isCSPFullySolved && (
        <span className="flex items-center gap-1 text-primary font-semibold text-xs">
          <CheckCircle2 className="h-3.5 w-3.5" /> Valid Assignment
        </span>
      )}
    </div>
  );
}
