import { useState, useCallback } from "react";
import { CSPProblem } from "@/data/cspProblems";
import { ArcItem, VariableDomains } from "./constraintTypes";
import { createConstraintArcs } from "./ac3Splitter";
import { useConstraintSplitting } from "./useConstraintSplitting";

export function useConstraintState(problem: CSPProblem) {
  const [domains, setDomains] = useState<VariableDomains>({});
  const [arcQueue, setArcQueue] = useState<ArcItem[]>([]);
  const [currentArc, setCurrentArc] = useState<ArcItem | null>(null);
  const [log, setLog] = useState("CSP loaded.");
  const [selectedVarToSplit, setSelectedVarToSplit] = useState("");

  const splitting = useConstraintSplitting(
    problem,
    domains,
    setDomains,
    setArcQueue,
    setLog,
  );

  const initializeCSP = useCallback(() => {
    const initD: VariableDomains = {};
    for (const v of problem.variables) initD[v.name] = [...v.domain];
    setDomains(initD);
    setArcQueue(createConstraintArcs(problem));
    setCurrentArc(null);
    splitting.resetSplits();
    setSelectedVarToSplit(problem.variables[0]?.name || "");
    setLog(
      `Initialized CSP "${problem.name}" with ${problem.variables.length} vars and ${problem.constraints.length} constraints.`,
    );
  }, [problem, splitting.resetSplits]);

  return {
    domains,
    setDomains,
    arcQueue,
    setArcQueue,
    currentArc,
    setCurrentArc,
    log,
    setLog,
    selectedVarToSplit,
    setSelectedVarToSplit,
    initializeCSP,
    ...splitting,
  };
}
