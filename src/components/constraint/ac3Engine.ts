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

  const otherVar = arc.constraint.variables.find((v) => v !== varName) || arc.constraint.variables[0] || "";
  const constraintExpr = arc.constraint.name || (arc.constraint.variables.length === 2 ? `${arc.constraint.variables[0]} ≠ ${arc.constraint.variables[1]}` : otherVar);

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
      log: `Pruned {${pruned.join(", ")}} from ${varName} via ${constraintExpr}. Added ${newArcsToAdd.length} dependent arcs back to queue.`,
      isWipeout: false,
      done: false,
    };
  }

  return {
    updatedQueue: queueCopy,
    updatedDomains: domains,
    currentArc: arc,
    log: `Arc (${varName}, ${otherVar} [${constraintExpr}]) is consistent. No values pruned.`,
    isWipeout: false,
    done: false,
  };
}
