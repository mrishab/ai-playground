import React from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface CodeSandboxHeaderActionsProps {
  isCopied: boolean;
  onCopy: () => void;
}

export function CodeSandboxHeaderActions({
  isCopied,
  onCopy,
}: CodeSandboxHeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="text-[10px] text-muted-foreground border-border/80">
        Read-Only Reference
      </Badge>
      <Button
        variant="outline"
        size="sm"
        onClick={onCopy}
        title="Copy code"
        className="h-7 text-xs gap-1.5"
      >
        {isCopied ? (
          <Check className="h-3 w-3 text-emerald-400" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
        {isCopied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}
