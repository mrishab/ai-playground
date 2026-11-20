import { ProofNode, SLDStepSnapshot } from "./deductionTypes";
import { parseAtom, parseHornClauses } from "./sldParser";
import { pushStep } from "./sldStepHelper";
import { computeBottomUpConsequences, matchQueryInConsequences } from "./bottomUpEngine";

export function executeBottomUp(queryInput: string, kbCode: string) {
  const cleanQuery = queryInput.trim().replace(/^(\?-|\?)\s*/, "").replace(/\.$/, "").trim();
  const { clauses } = parseHornClauses(kbCode);
  const { consequences, rounds } = computeBottomUpConsequences(clauses);
  const qAtom = parseAtom(cleanQuery);
  const qVars = Array.from(new Set(cleanQuery.match(/\b[A-Z_][a-zA-Z0-9_]*\b/g) || []));
  const foundAnswers = matchQueryInConsequences(qAtom, qVars, consequences);
  const branches: ProofNode[] = foundAnswers.map((ans, i) => ({
    id: `bu-${i}`,
    goal: cleanQuery,
    ruleMatched: "Bottom-Up Consequence",
    substitution: Object.entries(ans).map(([k, v]) => `${k}=${v}`).join(", ") || "Direct Match",
    children: [],
    status: "success",
  }));
  const ok = foundAnswers.length > 0;
  const root: ProofNode = { id: `0-${cleanQuery}`, goal: cleanQuery, children: branches, status: ok ? "success" : "failed" };
  const log = ok
    ? `Query proven! Found ${foundAnswers.length} answer(s) in saturated consequence set (${consequences.size} total).`
    : `Query failed: "${cleanQuery}" not found in consequence set (${consequences.size} saturated).`;
  return { root, foundAnswers, cleanQuery, consequences: Array.from(consequences), rounds, log };
}

export function generateBottomUpSteps(queryInput: string, kbCode: string): SLDStepSnapshot[] {
  const cleanQuery = queryInput.trim().replace(/^(\?-|\?)\s*/, "").replace(/\.$/, "").trim();
  const { clauses } = parseHornClauses(kbCode);
  const { consequences, rounds } = computeBottomUpConsequences(clauses);
  const qAtom = parseAtom(cleanQuery);
  const qVars = Array.from(new Set(cleanQuery.match(/\b[A-Z_][a-zA-Z0-9_]*\b/g) || []));
  const steps: SLDStepSnapshot[] = [];
  const root: ProofNode = { id: `0-${cleanQuery}`, goal: cleanQuery, children: [], status: "active" };

  pushStep(steps, root, [], cleanQuery, "Initialize consequences", "Initialized consequence set C = ∅");
  for (const r of rounds) {
    root.children = r.totalConsequences.map((c) => ({ id: `bu-${c}`, goal: c, children: [], status: "success" }));
    pushStep(steps, root, [], cleanQuery, `Round ${r.round}`, `Round ${r.round}: Derived ${r.newConsequences.length} consequence(s): ${r.newConsequences.slice(0, 3).join(", ")}${r.newConsequences.length > 3 ? "..." : ""}`);
  }
  const answers = matchQueryInConsequences(qAtom, qVars, consequences);
  const ok = answers.length > 0;
  root.status = ok ? "success" : "failed";
  const msg = ok ? `Proved: ${cleanQuery}. Found ${answers.length} answer(s) in consequence set.` : `Query failed: "${cleanQuery}" could not be derived.`;
  pushStep(steps, root, answers, cleanQuery, ok ? "Fixed point verified" : "Saturation completed", msg);
  return steps;
}
