import React from "react";

export function ExerciseObjectives({ goals }: { goals: string[] }) {
  return (
    <div className="p-3 rounded-xl bg-secondary/30 border border-border/40 space-y-1.5">
      <span className="font-semibold text-primary uppercase text-[10px] tracking-wider">
        Learning Objectives:
      </span>
      <ul className="space-y-1 text-foreground/80">
        {goals.map((g) => (
          <li key={g} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span>{g}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
