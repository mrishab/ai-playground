import React from "react";
import { Cpu } from "lucide-react";
import { AlgorithmItem } from "./workspaceTypes";

interface WorkspaceAlgoMenuProps {
  items?: AlgorithmItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export function WorkspaceAlgoMenu({
  items,
  selectedId,
  onSelect,
}: WorkspaceAlgoMenuProps) {
  if (!items || items.length === 0 || !onSelect) return null;

  return (
    <div className="flex items-center gap-1.5">
      <Cpu className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      <select
        aria-label="Select Algorithm"
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="h-8.5 px-2.5 text-xs font-medium rounded-lg border border-input bg-card text-foreground shadow-xs focus:ring-1 focus:ring-primary focus:outline-none transition-colors cursor-pointer"
      >
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
