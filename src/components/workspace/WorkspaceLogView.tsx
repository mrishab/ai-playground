import React from "react";
import { Terminal, Copy, Check } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { StatBadge } from "./workspaceTypes";

interface WorkspaceLogViewProps {
  log?: string;
  history?: string[];
  statsBadges?: StatBadge[];
}

export function WorkspaceLogView({ log, history, statsBadges }: WorkspaceLogViewProps) {
  const [copied, setCopied] = React.useState(false);
  const fullLog = history && history.length > 0 ? history.join("\n") : log || "No execution logs recorded yet.";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLog);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-5 border-border/80 shadow-md space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <h3 className="font-bold text-sm">Execution Trace & Output Log</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
            {copied ? "Copied" : "Copy Trace"}
          </Button>
        </div>
      </div>

      {statsBadges && statsBadges.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {statsBadges.map((s) => (
            <div key={s.label} className="p-2.5 rounded-lg border border-border bg-card/60">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</div>
              <div className="text-base font-bold text-foreground mt-0.5">{s.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-border bg-muted/40 p-4 font-mono text-xs text-foreground h-80 overflow-y-auto whitespace-pre-wrap leading-relaxed">
        {fullLog}
      </div>
    </Card>
  );
}
