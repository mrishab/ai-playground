import { ProofNode, SLDStepSnapshot, SubstitutionMap, HornClause } from "./deductionTypes";

export function cloneProofNode(node: ProofNode): ProofNode {
  return { ...node, children: node.children.map(cloneProofNode) };
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

export interface StepContext {
  clauses: HornClause[];
  steps: SLDStepSnapshot[];
  answers: SubstitutionMap[];
  seen: Set<string>;
  root: ProofNode;
  query: string;
  qVars: string[];
  vIdx: { current: number };
}
