import { GoalAtom, HornClause, SubstitutionMap } from "./deductionTypes";
import { formatAtom, parseAtom } from "./sldParser";
import { evaluateDif, isVariable, substituteAtom, unifyAtoms, walk } from "./sldMatcher";

export interface BottomUpRound { round: number; newConsequences: string[]; totalConsequences: string[]; }

function matchBody(body: GoalAtom[], sub: SubstitutionMap, cSet: Set<string>): SubstitutionMap[] {
  if (body.length === 0) return [sub];
  const [curr, ...rest] = body;
  if (curr.pred === "dif" && curr.args.length === 2) {
    const res = evaluateDif(curr.args[0], curr.args[1], sub);
    return res.ok ? matchBody(rest, sub, cSet) : [];
  }
  const results: SubstitutionMap[] = [];
  for (const cStr of cSet) {
    const uni = unifyAtoms(curr, parseAtom(cStr), sub);
    if (uni) results.push(...matchBody(rest, uni, cSet));
  }
  return results;
}

export function computeBottomUpConsequences(clauses: HornClause[]): { consequences: Set<string>; rounds: BottomUpRound[] } {
  const cSet = new Set<string>();
  const rounds: BottomUpRound[] = [];
  const base = clauses.filter((c) => c.body.length === 0 && c.head.args.every((a) => !isVariable(a))).map((c) => formatAtom(c.head));
  base.forEach((f) => cSet.add(f));
  rounds.push({ round: 1, newConsequences: base, totalConsequences: Array.from(cSet) });
  let rNum = 2;
  const rules = clauses.filter((c) => c.body.length > 0);
  while (rNum <= 20) {
    const added: string[] = [];
    for (const rule of rules) {
      for (const s of matchBody(rule.body, {}, cSet)) {
        const h = substituteAtom(rule.head, s);
        if (h.args.every((a) => !isVariable(a))) {
          const str = formatAtom(h);
          if (!cSet.has(str)) { cSet.add(str); added.push(str); }
        }
      }
    }
    if (added.length === 0) break;
    rounds.push({ round: rNum++, newConsequences: added, totalConsequences: Array.from(cSet) });
  }
  return { consequences: cSet, rounds };
}

export function matchQueryInConsequences(qAtom: GoalAtom, qVars: string[], cSet: Iterable<string>): SubstitutionMap[] {
  const answers: SubstitutionMap[] = [];
  const seen = new Set<string>();
  for (const c of cSet) {
    const uni = unifyAtoms(qAtom, parseAtom(c), {});
    if (!uni) continue;
    const ans: SubstitutionMap = {};
    for (const v of qVars) ans[v] = walk(v, uni);
    const k = JSON.stringify(ans);
    if (!seen.has(k)) { seen.add(k); answers.push(ans); }
  }
  return answers;
}
