import { CSPProblem } from "@/data/cspProblems";
import {
  ArcItem,
  SplitTreeNode,
  DomainBackup,
  VariableDomains,
} from "./constraintTypes";

export function createConstraintArcs(problem: CSPProblem): ArcItem[] {
  const arcs: ArcItem[] = [];
  for (const c of problem.constraints) {
    for (const v of c.variables) arcs.push({ varName: v, constraint: c });
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
  const val = domain[0];
  const newId = `split-${Date.now()}`;
  const backup: DomainBackup = { id: newId, domains: { ...domains } };
  const updatedDomains = { ...domains, [varName]: [val] };
  const newNode: SplitTreeNode = {
    id: newId,
    varName,
    value: val,
    parent: activeSplitId,
    status: "active",
  };
  return {
    backup,
    updatedDomains,
    newArcs: createConstraintArcs(problem),
    newNode,
    newId,
    log: `Split domain of ${varName}: Testing branch ${varName} = "${val}".`,
  };
}

export function executeBacktrack(
  domainBackups: DomainBackup[],
  problem: CSPProblem,
) {
  if (domainBackups.length === 0) return null;
  const last = domainBackups[domainBackups.length - 1];
  return {
    remainingBackups: domainBackups.slice(0, -1),
    restoredDomains: last.domains,
    newArcs: createConstraintArcs(problem),
    log: "Backtracked to previous domain state.",
  };
}
