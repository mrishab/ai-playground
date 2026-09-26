import React from "react";
import { Card } from "@/components/ui/Card";
import { SyntaxHighlightEditor } from "@/components/ui/SyntaxHighlightEditor";

export function DeductionKbEditor({
  kbCode,
  onChange,
}: {
  kbCode: string;
  onChange: (code: string) => void;
}) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/40 border-b border-border text-xs">
        <span className="font-semibold text-foreground">
          Knowledge Base (Definite Clauses)
        </span>
        <span className="text-[10px] text-muted-foreground font-mono">
          Prolog / CILog
        </span>
      </div>
      <SyntaxHighlightEditor
        value={kbCode}
        onChange={onChange}
        language="prolog"
        ariaLabel="Knowledge Base Code"
        className="h-80"
      />
    </Card>
  );
}
