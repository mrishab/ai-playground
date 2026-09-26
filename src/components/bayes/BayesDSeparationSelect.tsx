import React from "react";
import { BayesNode } from "@/data/bayesProblems";

interface BayesDSeparationSelectProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  nodes: BayesNode[];
}

export function BayesDSeparationSelect({
  label,
  value,
  onChange,
  nodes,
}: BayesDSeparationSelectProps) {
  return (
    <div>
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-8 mt-1 px-2 text-xs rounded border border-input bg-card text-foreground"
      >
        {nodes.map((n) => (
          <option key={n.id} value={n.id}>
            {n.id}
          </option>
        ))}
      </select>
    </div>
  );
}
