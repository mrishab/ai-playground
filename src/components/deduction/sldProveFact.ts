import { ProofNode, HornFact, SubstitutionMap } from "./deductionTypes";
import { matchFact } from "./sldMatcher";

export function tryMatchFact(
  node: ProofNode,
  pred: string,
  args: string[],
  facts: HornFact[],
  depth: number,
  foundAnswers: SubstitutionMap[],
): boolean {
  const factRes = matchFact(pred, args, facts);
  if (!factRes.matched || !factRes.fact) return false;

  node.status = "success";
  node.substitution =
    Object.keys(factRes.sub).length > 0
      ? Object.entries(factRes.sub)
          .map(([k, v]) => `${k}=${v}`)
          .join(", ")
      : "Direct Match";
  node.ruleMatched = `${factRes.fact.pred}(${factRes.fact.args.join(", ")})`;
  if (depth === 0) foundAnswers.push(factRes.sub);
  return true;
}
