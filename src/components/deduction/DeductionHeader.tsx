import React from "react";
import { DEDUCTION_KBS, DeductionKB } from "@/data/deductionProblems";
import { Badge } from "@/components/ui/Badge";

export function DeductionHeader({
  currentKB,
  selectedKBId,
  onSelectKBId,
  badgeText,
}: {
  currentKB: DeductionKB;
  selectedKBId: string;
  onSelectKBId: (id: string) => void;
  badgeText: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold tracking-tight">
            Definite Clause Deduction
          </span>
          <Badge variant="cyan">{badgeText}</Badge>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
          {currentKB.description}
        </p>
      </div>

      <select
        aria-label="Select Knowledge Base"
        value={selectedKBId}
        onChange={(e) => onSelectKBId(e.target.value)}
        className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {Object.values(DEDUCTION_KBS).map((kb) => (
          <option key={kb.id} value={kb.id}>
            {kb.name}
          </option>
        ))}
      </select>
    </div>
  );
}
