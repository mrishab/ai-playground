export interface SubstitutionMap {
  [variableName: string]: string;
}

export interface ProofNode {
  id: string;
  goal: string;
  ruleMatched?: string;
  substitution?: string;
  children: ProofNode[];
  status: "active" | "success" | "failed";
}

export interface HornRule {
  head: string;
  headPred: string;
  headArgs: string[];
  body: string[];
}

export interface HornFact {
  pred: string;
  args: string[];
}

export interface GoalAtom {
  pred: string;
  args: string[];
  raw?: string;
}

export interface HornClause {
  head: GoalAtom;
  body: GoalAtom[];
  rawText: string;
}

export interface SLDStepSnapshot {
  stepNumber: number;
  subgoal: string;
  action: string;
  ruleOrFact?: string;
  substitution?: string;
  treeSnapshot: ProofNode;
  answers: SubstitutionMap[];
  log: string;
}
