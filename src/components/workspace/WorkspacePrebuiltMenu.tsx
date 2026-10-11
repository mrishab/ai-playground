import React from "react";
import { FolderGit2 } from "lucide-react";
import { PrebuiltItem } from "./workspaceTypes";

interface WorkspacePrebuiltMenuProps {
  label?: string;
  items: PrebuiltItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  onOpenGraphBuilder?: () => void;
}

export function WorkspacePrebuiltMenu({
  label = "Examples",
  items,
  selectedId,
  onSelect,
  onOpenGraphBuilder,
}: WorkspacePrebuiltMenuProps) {
  return (
    <div className="flex items-center gap-1.5">
      <FolderGit2 className="w-3.5 h-3.5 text-muted-foreground hidden sm:inline" />
      <span className="text-xs font-semibold text-muted-foreground hidden md:inline">
        {label}:
      </span>
      <select
        aria-label={`Select ${label}`}
        value={selectedId}
        onChange={(e) => {
          if (e.target.value === "__custom_graph__" && onOpenGraphBuilder) {
            onOpenGraphBuilder();
          } else {
            onSelect(e.target.value);
          }
        }}
        className="h-8.5 px-2.5 text-xs font-medium rounded-lg border border-input bg-card text-foreground shadow-xs focus:ring-1 focus:ring-primary focus:outline-none transition-colors cursor-pointer"
      >
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
        {onOpenGraphBuilder && (
          <option value="__custom_graph__">+ Build Custom Graph...</option>
        )}
      </select>
    </div>
  );
}
