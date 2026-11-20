import { ProofNode, HornRule, HornFact, SubstitutionMap } from "./deductionTypes";
import { matchRuleArgs } from "./sldMatcher";
import { proveRuleBody } from "./sldProveBody";

export function tryMatchRules(
  node: ProofNode,
  pred: string,
  args: string[],
  depth: number,
  rules: HornRule[],
  facts: HornFact[],
  foundAnswers: SubstitutionMap[],
  proveFn: (
    goal: string,
    depth: number,
    rules: HornRule[],
    facts: HornFact[],
    foundAnswers: SubstitutionMap[],
  ) => ProofNode,
): boolean {
  for (const rule of rules) {
    if (rule.headPred !== pred || rule.headArgs.length !== args.length) {
      continue;
    }
    const { matches, sub } = matchRuleArgs(rule.headArgs, args);
    if (!matches) continue;

    const { allSucceeded, childNodes } = proveRuleBody(
      rule.body,
      sub,
      depth,
      rules,
      facts,
      foundAnswers,
      proveFn,
    );
    node.children = childNodes;
    if (allSucceeded) {
      node.status = "success";
      node.ruleMatched = `${rule.head} <- ${rule.body.join(" & ")}`;
      node.substitution =
        Object.keys(sub).length > 0
          ? Object.entries(sub)
              .map(([k, v]) => `${k}=${v}`)
              .join(", ")
          : "Unified";
      if (depth === 0) foundAnswers.push(sub);
      return true;
    }
  }
  return false;
}
