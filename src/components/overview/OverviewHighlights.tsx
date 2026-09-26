import React from "react";
import { CheckCircle2 } from "lucide-react";

const HIGHLIGHTS = [
  { label: "Interactive Studio", desc: "Step-by-step state space execution." },
  { label: "Code Sandbox", desc: "Run and modify algorithm code live." },
  { label: "Benchmark Problems", desc: "Classic problem graphs and domains." },
  { label: "Self-Assessment", desc: "Curated questions with solutions." },
];

export function OverviewHighlights() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border/50 text-xs">
      {HIGHLIGHTS.map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="font-bold text-foreground flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            {item.label}
          </div>
          <p className="text-muted-foreground text-[11px]">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
