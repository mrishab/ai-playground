import { ProofNode, SubstitutionMap, SLDStepSnapshot } from "./deductionTypes";
import { parseHornClauses } from "./sldParser";
import { matchFact, matchRuleArgs } from "./sldMatcher";
import { cloneProofNode, bindGoalString, pushStep } from "./sldStepHelper";

export function generateSLDSteps(queryInput: string, kbCode: string): SLDStepSnapshot[] {
  const cleanQuery = queryInput.trim().replace(/\.$/, "");
  const { rules, facts } = parseHornClauses(kbCode);
  const steps: SLDStepSnapshot[] = [];
  const foundAnswers: SubstitutionMap[] = [];
  const root: ProofNode = { id: `0-${cleanQuery}`, goal: cleanQuery, children: [], status: "active" };

  pushStep(steps, root, foundAnswers, cleanQuery, "Select goal", `Selected query goal: ${cleanQuery}`);

  function resolve(node: ProofNode, depth: number): boolean {
    const [pred, argsStr] = node.goal.match(/^(\w+)(?:\((.*)\))?$/)?.slice(1) || [node.goal, ""];
    const args = argsStr ? argsStr.split(",").map((s) => s.trim()) : [];
    const factRes = matchFact(pred, args, facts);
    if (factRes.matched && factRes.fact) {
      node.status = "success";
      node.ruleMatched = `${factRes.fact.pred}(${factRes.fact.args.join(", ")})`;
      const subStr = Object.entries(factRes.sub).map(([k, v]) => `${k}=${v}`).join(", ") || "Direct Match";
      node.substitution = subStr;
      if (depth === 0) foundAnswers.push(factRes.sub);
      pushStep(steps, root, foundAnswers, node.goal, "Matched fact", `Fact match: ${node.ruleMatched}`, node.ruleMatched, subStr);
      return true;
    }
    for (const rule of rules) {
      if (rule.headPred !== pred || rule.headArgs.length !== args.length) continue;
      const { matches, sub } = matchRuleArgs(rule.headArgs, args);
      if (!matches) continue;
      const subStr = Object.entries(sub).map(([k, v]) => `${k}=${v}`).join(", ");
      pushStep(steps, root, foundAnswers, node.goal, "Unify rule", `Rule matched: ${rule.head}`, rule.head, subStr);
      node.children = rule.body.map((b, i) => ({
        id: `${depth + 1}-${bindGoalString(b, sub)}-${i}`, goal: bindGoalString(b, sub), children: [], status: "active" as const
      }));
      pushStep(steps, root, foundAnswers, node.goal, "Derive subgoals", `Derived: ${rule.body.join(", ")}`, rule.head);
      if (node.children.every((child) => resolve(child, depth + 1))) {
        node.status = "success";
        node.ruleMatched = `${rule.head} <- ${rule.body.join(" & ")}`;
        node.substitution = subStr || "true";
        if (depth === 0) foundAnswers.push(sub);
        pushStep(steps, root, foundAnswers, node.goal, "Goal proved", `Proved: ${node.goal}`, rule.head, subStr);
        return true;
      }
    }
    node.status = "failed";
    pushStep(steps, root, foundAnswers, node.goal, "Resolution failed", `Failed: ${node.goal}`);
    return false;
  }

  resolve(root, 0);
  return steps;
}
