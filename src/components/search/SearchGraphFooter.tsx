import React from "react";

interface SearchGraphFooterProps {
  log: string;
  frontierCount: number;
  expandedCount: number;
}

export function SearchGraphFooter({
  log,
  frontierCount,
  expandedCount,
}: SearchGraphFooterProps) {
  return (
    <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs flex items-center justify-between">
      <span className="text-foreground/90">{log}</span>
      <span className="text-[11px] text-muted-foreground">
        Frontier paths:{" "}
        <strong className="text-primary">{frontierCount}</strong> | Expanded:{" "}
        <strong className="text-purple-600 dark:text-purple-400">
          {expandedCount}
        </strong>
      </span>
    </div>
  );
}
