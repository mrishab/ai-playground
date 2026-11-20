import { ProofNode, HornRule, HornFact, SubstitutionMap } from "./deductionTypes";
import { parseHornClauses } from "./sldParser";
import { tryMatchFact } from "./sldProveFact";
import { tryMatchRules } from "./sldProveRules";

function prove(
  goal: string,
  depth: number,
  rules: HornRule[],
  facts: HornFact[],
  foundAnswers: SubstitutionMap[],
): ProofNode {
  const [pred, argsStr] = goal.match(/^(\w+)(?:\((.*)\))?$/)?.slice(1) || [
    goal,
    "",
  ];
  const args = argsStr ? argsStr.split(",").map((s) => s.trim()) : [];
  const node: ProofNode = {
    id: `${depth}-${goal}`,
    goal,
    children: [],
    status: "failed",
  };

  if (tryMatchFact(node, pred, args, facts, depth, foundAnswers)) {
    return node;
  }

  tryMatchRules(node, pred, args, depth, rules, facts, foundAnswers, prove);
  return node;
}

export function executeSLDProof(queryInput: string, kbCode: string) {
  const cleanQuery = queryInput.trim().replace(/^(\?-|\?)\s*/, "").replace(/\.$/, "").trim();
  const { rules, facts } = parseHornClauses(kbCode);
  const foundAnswers: SubstitutionMap[] = [];
  return {
    root: prove(cleanQuery, 0, rules, facts, foundAnswers),
    foundAnswers,
    cleanQuery,
  };
}
