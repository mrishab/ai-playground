import React from "react";
import { Badge } from "../ui/Badge";
import { SearchPath } from "./searchTypes";

interface SearchFrontierItemProps {
  path: SearchPath;
  isNext: boolean;
}

export function SearchFrontierItem({ path, isNext }: SearchFrontierItemProps) {
  return (
    <div
      className={`p-2.5 rounded-lg border text-xs transition-colors duration-200 ease-out ${
        isNext
          ? "bg-sky-500/10 border-sky-500/40 text-sky-800 dark:text-sky-200"
          : "bg-secondary/40 border-border/50 text-foreground/90"
      }`}
    >
      <div className="flex items-center justify-between font-mono font-medium mb-1">
        <span
          className="truncate max-w-[170px]"
          title={path.nodes.join(" -> ")}
        >
          {path.nodes.join(" → ")}
        </span>
        {isNext && (
          <Badge variant="cyan" className="text-[9px] py-0 px-1.5">
            Next
          </Badge>
        )}
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
        <span>g = {(path.cost ?? 0).toFixed(1)}</span>
        <span>h = {(path.h ?? 0).toFixed(1)}</span>
        <span className="font-bold text-foreground">
          f = {(path.f ?? 0).toFixed(1)}
        </span>
      </div>
    </div>
  );
}
