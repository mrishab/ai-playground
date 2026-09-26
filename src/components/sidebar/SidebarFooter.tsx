import React from "react";

export function SidebarFooter() {
  return (
    <div className="p-3 border-t border-border/60 text-[11px] text-muted-foreground bg-secondary/20 shrink-0">
      <div className="flex items-center justify-between">
        <span className="font-medium text-foreground">AIspace Studio</span>
        <span className="text-[10px] text-primary font-mono">
          v3.0
        </span>
      </div>
      <p className="text-[10px] text-muted-foreground/80 mt-0.5">
        Classic AI Algorithms
      </p>
    </div>
  );
}
