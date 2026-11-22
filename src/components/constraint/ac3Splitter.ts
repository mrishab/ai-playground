import { CSPProblem } from "@/data/cspProblems";
import {
  ArcItem,
  SplitTreeNode,
  DomainBackup,
  VariableDomains,
} from "./constraintTypes";

export function createConstraintArcs(problem: CSPProblem): ArcItem[] {
  const arcs: ArcItem[] = [];
  if (!problem?.constraints) return arcs;
  for (const c of problem.constraints) {
    if (c?.variables) {
      for (const v of c.variables) arcs.push({ varName: v, constraint: c });
    }
  }
  return arcs;
}

export function executeDomainSplit(
  varName: string,
  domains: VariableDomains,
  activeSplitId: string | null,
  problem: CSPProblem,
) {
  const domain = domains[varName];
  if (!domain || domain.length <= 1) return null;
  const half = Math.ceil(domain.length / 2);
  const d1 = domain.slice(0, half);
  const d2 = domain.slice(half);
  const branchVal = d1.length === 1 ? d1[0] : `{${d1.join(", ")}}`;
  const altBranchVal = d2.length === 1 ? d2[0] : `{${d2.join(", ")}}`;
  const newId = `split-${Date.now()}`;
  const backup: DomainBackup = {
    id: newId,
    domains: { ...domains },
    alternateBranch: { ...domains, [varName]: d2 },
    altValue: altBranchVal,
  };
  const updatedDomains = { ...domains, [varName]: d1 };
  const newNode: SplitTreeNode = {
    id: newId,
    varName,
    value: branchVal,
    parent: activeSplitId,
    status: "active",
  };
  return {
    backup,
    updatedDomains,
    newArcs: createConstraintArcs(problem),
    newNode,
    newId,
    log: `Split domain of ${varName}: Testing branch ${varName} ∈ ${branchVal} (alt: {${d2.join(", ")}}).`,
  };
}

export function executeBacktrack(
  domainBackups: DomainBackup[],
  problem: CSPProblem,
) {
  if (domainBackups.length === 0) return null;
  const last = domainBackups[domainBackups.length - 1];
  const restored = last.alternateBranch || last.domains;
  return {
    remainingBackups: domainBackups.slice(0, -1),
    restoredDomains: restored,
    newArcs: createConstraintArcs(problem),
    log: `Backtracked to ${last.alternateBranch ? "alternate domain branch" : "previous domain state"}.`,
    exploredAlternate: Boolean(last.alternateBranch),
    alternateValue: last.altValue,
  };
}

export function updateSplitHistoryOnBacktrack(
  prev: SplitTreeNode[],
  res: NonNullable<ReturnType<typeof executeBacktrack>>,
): SplitTreeNode[] {
  if (res.exploredAlternate && res.alternateValue) {
    if (prev.length === 0) return prev;
    const updated = [...prev];
    const lastIdx = updated.length - 1;
    updated[lastIdx] = { ...updated[lastIdx], value: res.alternateValue, status: "active" };
    return updated;
  }
  return prev.slice(0, res.remainingBackups.length);
}
