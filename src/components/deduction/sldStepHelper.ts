import { ProofNode, SLDStepSnapshot, SubstitutionMap } from "./deductionTypes";

export function cloneProofNode(node: ProofNode): ProofNode {
  return { ...node, children: node.children.map(cloneProofNode) };
}

export function bindGoalString(goal: string, sub: SubstitutionMap): string {
  let bound = goal;
  for (const [k, v] of Object.entries(sub)) {
    bound = bound.replace(new RegExp(`\\b${k}\\b`, "g"), v);
  }
  return bound;
}

export function pushStep(
  steps: SLDStepSnapshot[],
  root: ProofNode,
  answers: SubstitutionMap[],
  subgoal: string,
  action: string,
  log: string,
  ruleOrFact?: string,
  sub?: string,
) {
  steps.push({
    stepNumber: steps.length + 1,
    subgoal,
    action,
    ruleOrFact,
    substitution: sub,
    treeSnapshot: cloneProofNode(root),
    answers: [...answers],
    log,
  });
}
