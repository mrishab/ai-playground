import React from "react";
import { CSPProblem, CSPVariable } from "@/data/cspProblems";
import { ArcItem } from "./constraintTypes";
import { ConstraintEdgeLine } from "./ConstraintEdgeLine";

interface ConstraintGraphEdgesProps {
  problem: CSPProblem;
  currentArc: ArcItem | null;
}

export function ConstraintGraphEdges({
  problem,
  currentArc,
}: ConstraintGraphEdgesProps) {
  return (
    <>
      {problem.constraints.map((c, cIdx) => {
        const vars = c.variables
          .map((vName) => problem.variables.find((pv) => pv.name === vName))
          .filter(Boolean) as CSPVariable[];
        if (vars.length < 2) return null;
        return (
          <ConstraintEdgeLine
            key={cIdx}
            v1={vars[0]}
            v2={vars[1]}
            constraint={c}
            isCur={currentArc?.constraint === c}
          />
        );
      })}
    </>
  );
}
