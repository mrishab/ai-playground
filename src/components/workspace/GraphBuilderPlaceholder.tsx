import React from "react";
import { GitBranch } from "lucide-react";

export function GraphBuilderPlaceholder() {
  return (
    <div className="p-8 text-center bg-card rounded-2xl border border-border space-y-2">
      <GitBranch className="w-8 h-8 text-muted-foreground mx-auto" />
      <h3 className="text-sm font-semibold text-foreground">Graph Builder Unavailable</h3>
      <p className="text-xs text-muted-foreground">Graph builder available for Graph Searching.</p>
    </div>
  );
}
