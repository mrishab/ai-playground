import React from "react";
import { Terminal, ChevronRight } from "lucide-react";
import { Badge } from "../ui/Badge";
import { StatBadge, WorkspacePane } from "./workspaceTypes";

interface WorkspaceBottomDockProps {
  activeLogMessage?: string;
  statsBadges?: StatBadge[];
  onOpenLogPane: () => void;
  currentPane: WorkspacePane;
}

export function WorkspaceBottomDock({
  statsBadges,
  onOpenLogPane,
  currentPane,
}: WorkspaceBottomDockProps) {
  if (currentPane === "log") return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-card/90 border border-border rounded-xl shadow-xs text-xs backdrop-blur-xs">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <Terminal className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="font-semibold text-muted-foreground shrink-0 hidden sm:inline">
          Studio Terminal:
        </span>
        <span className="text-muted-foreground truncate font-mono text-[11.5px]">
          Execution environment active. Click to view detailed algorithm trace.
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {statsBadges?.map((s) => (
          <Badge key={s.label} variant={s.variant || "outline"} className="text-[11px]">
            {s.label}: <strong>{s.value}</strong>
          </Badge>
        ))}
        <button
          type="button"
          onClick={onOpenLogPane}
          className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline ml-1"
        >
          View Full Log <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
