import React from "react";
import { Play, RotateCcw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CodeSandboxHeaderActionsProps {
  isCopied: boolean;
  isRunning: boolean;
  onReset: () => void;
  onCopy: () => void;
  onRun: () => void;
}

export function CodeSandboxHeaderActions({
  isCopied,
  isRunning,
  onReset,
  onCopy,
  onRun,
}: CodeSandboxHeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        title="Reset to reference code"
        className="h-7 text-xs gap-1.5"
      >
        <RotateCcw className="h-3 w-3" />
        Reset
      </Button>
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
      <Button
        variant="default"
        size="sm"
        onClick={onRun}
        disabled={isRunning}
        className="h-7 text-xs gap-1.5 bg-primary font-semibold"
      >
        <Play className="h-3 w-3 fill-current" />
        {isRunning ? "Running..." : "Run Code"}
      </Button>
    </div>
  );
}
