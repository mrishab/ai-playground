import React from "react";
import { Activity, GitBranch, Code2, Terminal, BookOpen } from "lucide-react";
import { WorkspacePane } from "./workspaceTypes";

interface WorkspacePaneSwitcherProps {
  activePane: WorkspacePane;
  onSelectPane: (pane: WorkspacePane) => void;
  hasGraphBuilder?: boolean;
}

export function WorkspacePaneSwitcher({
  activePane,
  onSelectPane,
  hasGraphBuilder = true,
}: WorkspacePaneSwitcherProps) {
  const panes: Array<{ id: WorkspacePane; label: string; icon: React.ReactNode }> = [
    { id: "animation", label: "Animation Area", icon: <Activity className="w-3.5 h-3.5" /> },
    ...(hasGraphBuilder
      ? [{ id: "graph_builder" as WorkspacePane, label: "Graph Building", icon: <GitBranch className="w-3.5 h-3.5" /> }]
      : []),
    { id: "coding", label: "Coding Area", icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: "log", label: "Log & Output", icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: "theory", label: "Theory & Guide", icon: <BookOpen className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-muted/60 dark:bg-muted/30 rounded-xl border border-border/60">
      {panes.map((p) => {
        const isActive = activePane === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelectPane(p.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.98] ${
              isActive
                ? "bg-card text-foreground shadow-xs border border-border/80"
                : "text-muted-foreground hover:text-foreground hover:bg-card/40"
            }`}
          >
            {p.icon}
            <span className="hidden lg:inline">{p.label}</span>
          </button>
        );
      })}
    </div>
  );
}
