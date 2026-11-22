import { useState, useCallback } from "react";
import { CSPProblem } from "@/data/cspProblems";
import { SplitTreeNode, DomainBackup, ArcItem, VariableDomains } from "./constraintTypes";
import { executeDomainSplit, executeBacktrack, updateSplitHistoryOnBacktrack } from "./ac3Splitter";

export function useConstraintSplitting(
  problem: CSPProblem,
  domains: VariableDomains,
  setDomains: (d: VariableDomains) => void,
  setArcQueue: (a: ArcItem[]) => void,
  setLog: (l: string) => void,
) {
  const [splitHistory, setSplitHistory] = useState<SplitTreeNode[]>([]);
  const [activeSplitId, setActiveSplitId] = useState<string | null>(null);
  const [domainBackups, setDomainBackups] = useState<DomainBackup[]>([]);

  const performDomainSplit = (varName: string) => {
    const res = executeDomainSplit(varName, domains, activeSplitId, problem);
    if (!res) return;
    setDomainBackups((prev) => [...prev, res.backup]);
    setDomains(res.updatedDomains);
    setArcQueue(res.newArcs);
    setSplitHistory((prev) => [...prev, res.newNode]);
    setActiveSplitId(res.newId);
    setLog(res.log);
  };

  const backtrack = () => {
    const res = executeBacktrack(domainBackups, problem);
    if (!res) return;
    setDomainBackups(res.remainingBackups);
    setDomains(res.restoredDomains);
    setArcQueue(res.newArcs);
    setLog(res.log);
    setSplitHistory((prev) => updateSplitHistoryOnBacktrack(prev, res));
    if (!res.exploredAlternate || !res.alternateValue) {
      setActiveSplitId(res.remainingBackups.length > 0 ? res.remainingBackups[res.remainingBackups.length - 1].id : null);
    }
  };

  const markCurrentSplitFailed = useCallback(() => {
    setSplitHistory((prev) => prev.length === 0 ? prev : prev.map((s, idx) => idx === prev.length - 1 ? { ...s, status: "failed" } : s));
  }, []);

  const markSplitsSolved = useCallback(() => {
    setSplitHistory((prev) => prev.map((s) => ({ ...s, status: "solved" })));
  }, []);

  const resetSplits = useCallback(() => {
    setSplitHistory([]);
    setActiveSplitId(null);
    setDomainBackups([]);
  }, []);

  return { splitHistory, activeSplitId, domainBackups, performDomainSplit, backtrack, resetSplits, markCurrentSplitFailed, markSplitsSolved };
}
