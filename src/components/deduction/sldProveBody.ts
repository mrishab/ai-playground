import { ProofNode, HornRule, HornFact, SubstitutionMap } from "./deductionTypes";

export function proveRuleBody(
  body: string[],
  sub: SubstitutionMap,
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
): { allSucceeded: boolean; childNodes: ProofNode[] } {
  let allSucceeded = true;
  const childNodes: ProofNode[] = [];

  for (const bAtom of body) {
    let subbed = bAtom;
    for (const [k, v] of Object.entries(sub)) {
      subbed = subbed.replace(new RegExp(`\\b${k}\\b`, "g"), v);
    }
    const child = proveFn(subbed, depth + 1, rules, facts, foundAnswers);
    childNodes.push(child);
    if (child.status === "failed") {
      allSucceeded = false;
      break;
    }
    if (
      child.substitution &&
      !["Direct Match", "Unified"].includes(child.substitution)
    ) {
      for (const b of child.substitution.split(", ")) {
        const [k, v] = b.split("=");
        if (k && v) sub[k] = v;
      }
    }
  }

  return { allSucceeded, childNodes };
}
