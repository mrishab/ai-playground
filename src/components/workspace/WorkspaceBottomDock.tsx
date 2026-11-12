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
  activeLogMessage,
  statsBadges,
  onOpenLogPane,
  currentPane,
}: WorkspaceBottomDockProps) {
  if (currentPane === "log") return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 py-2 bg-card/40 border border-border/80 rounded-xl shadow-xs text-xs">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Terminal className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="text-muted-foreground truncate font-mono text-xs">
          Execution environment active
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {statsBadges?.map((s) => (
          <Badge key={s.label} variant={s.variant || "outline"} className="text-[10px] py-0 px-2 font-normal">
            {s.label}: <strong className="font-semibold ml-0.5">{s.value}</strong>
          </Badge>
        ))}
        <button
          type="button"
          onClick={onOpenLogPane}
          className="flex items-center gap-0.5 text-xs text-primary hover:underline transition-colors duration-150 ml-1"
        >
          View Full Log <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
