import React from "react";

interface BayesCptTableHeadProps {
  parents: string[];
  isUtility: boolean;
  outcomes: string[];
  nodeId: string;
}

export function BayesCptTableHead({ parents, isUtility, outcomes, nodeId }: BayesCptTableHeadProps) {
  return (
    <thead className="bg-muted/80 text-muted-foreground font-semibold">
      <tr>
        {parents.map((p) => (
          <th key={p} className="p-2 border-b border-r border-border">{p}</th>
        ))}
        {isUtility ? (
          <th className="p-2 border-b border-border text-primary font-bold">Utility U({parents.join(", ")})</th>
        ) : (
          outcomes.map((out) => (
            <th key={out} className="p-2 border-b border-r last:border-r-0 border-border text-primary">
              P({nodeId} = {out} | Parents)
            </th>
          ))
        )}
      </tr>
    </thead>
  );
}
