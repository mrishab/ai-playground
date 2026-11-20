import { ProofNode, SubstitutionMap } from "./deductionTypes";
import { parseHornClauses, parseAtom } from "./sldParser";
import { walk } from "./sldMatcher";
import { solveSLD } from "./sldDfs";

export function executeSLDProof(queryInput: string, kbCode: string) {
  const cleanQuery = queryInput.trim().replace(/^(\?-|\?)\s*/, "").replace(/\.$/, "").trim();
  const { clauses } = parseHornClauses(kbCode);
  const queryAtom = parseAtom(cleanQuery);
  const queryVars = Array.from(new Set(cleanQuery.match(/\b[A-Z_][a-zA-Z0-9_]*\b/g) || []));

  const foundAnswers: SubstitutionMap[] = [];
  const seenKeys = new Set<string>();
  const branches: ProofNode[] = [];

  solveSLD([queryAtom], clauses, {}, [], { current: 0 }, 0, 35, (sub, trace) => {
    const ans: SubstitutionMap = {};
    for (const v of queryVars) ans[v] = walk(v, sub);
    const key = JSON.stringify(ans);
    if (!seenKeys.has(key)) {
      seenKeys.add(key);
      foundAnswers.push(ans);
      if (trace.length > 0) {
        const top = trace[0];
        const subText = Object.entries(ans).map(([k, v]) => `${k}=${v}`).join(", ") || top.substitution;
        branches.push({ ...top, substitution: subText });
      }
    }
  });

  const root: ProofNode = {
    id: `0-${cleanQuery}`,
    goal: cleanQuery,
    ruleMatched: branches[0]?.ruleMatched,
    substitution: branches[0]?.substitution,
    children: branches,
    status: foundAnswers.length > 0 ? "success" : "failed",
  };

  return { root, foundAnswers, cleanQuery, log: undefined as string | undefined };
}
