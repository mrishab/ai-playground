import React from "react";
import { Code2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CodeSandboxHeaderActions } from "./CodeSandboxHeaderActions";

export function CodeSandboxHeader({
  title,
  algorithmName,
  isCopied,
  onCopy,
}: {
  title: string;
  algorithmName?: string;
  isCopied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-secondary/40 px-4 py-2.5 border-b border-border">
      <div className="flex items-center gap-2">
        <Code2 className="h-4 w-4 text-primary" />
        <span className="font-semibold text-sm tracking-tight">{title}</span>
        {algorithmName && (
          <Badge variant="cyan" className="text-[10px] py-0 px-2">
            {algorithmName}
          </Badge>
        )}
      </div>

      <CodeSandboxHeaderActions
        isCopied={isCopied}
        onCopy={onCopy}
      />
    </div>
  );
}
