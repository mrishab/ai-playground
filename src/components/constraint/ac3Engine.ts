import { CSPProblem } from "@/data/cspProblems";
import { ArcItem, FineStepResult, VariableDomains } from "./constraintTypes";
import { filterSupportedValues } from "./ac3Support";
import { getDependentArcs, makeWipeoutResult } from "./ac3DependentArcs";

export function executeFineStep(
  arcQueue: ArcItem[],
  domains: VariableDomains,
  problem: CSPProblem,
): FineStepResult {
  if (arcQueue.length === 0) {
    return {
      updatedQueue: [],
      updatedDomains: domains,
      currentArc: null,
      log: "Arc Consistency reached! No remaining arcs in queue.",
      isWipeout: false,
      done: true,
    };
  }

  const queueCopy = [...arcQueue];
  const arc = queueCopy.shift()!;
  const varName = arc.varName;
  const currentDomain = domains[varName] || [];
  const { remaining, pruned } = filterSupportedValues(
    currentDomain,
    varName,
    arc.constraint,
    domains,
  );

  if (pruned.length > 0) {
    const updatedDomains = { ...domains, [varName]: remaining };
    if (remaining.length === 0) {
      return makeWipeoutResult(updatedDomains, arc, varName);
    }
    const newArcsToAdd = getDependentArcs(varName, problem, queueCopy);
    return {
      updatedQueue: [...queueCopy, ...newArcsToAdd],
      updatedDomains,
      currentArc: arc,
      log: `Pruned {${pruned.join(", ")}} from ${varName}. Added ${newArcsToAdd.length} dependent arcs back to queue.`,
      isWipeout: false,
      done: false,
    };
  }

  return {
    updatedQueue: queueCopy,
    updatedDomains: domains,
    currentArc: arc,
    log: `Arc (${varName}, ${arc.constraint.name}) is consistent. No values pruned.`,
    isWipeout: false,
    done: false,
  };
}
