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
  const hasSelected = items.some((item) => item.id === selectedId);

  return (
    <div className="flex items-center gap-1.5">
      <FolderGit2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
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
        {!hasSelected && selectedId && (
          <option value={selectedId}>
            {selectedId === "custom" || selectedId === "blank" ? "Custom / Reset Problem" : selectedId}
          </option>
        )}
        {onOpenGraphBuilder && (
          <option value="__custom_graph__">+ Build Custom Graph...</option>
        )}
      </select>
    </div>
  );
}
