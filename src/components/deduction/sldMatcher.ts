import { GoalAtom, HornClause, SubstitutionMap } from "./deductionTypes";

export const isVariable = (t: string): boolean => /^[A-Z_]/.test(t);

export function walk(term: string, sub: SubstitutionMap): string {
  let curr = term;
  while (isVariable(curr) && sub[curr] !== undefined) curr = sub[curr];
  return curr;
}

export function unifyTerms(t1: string, t2: string, sub: SubstitutionMap): SubstitutionMap | null {
  const u = walk(t1, sub);
  const v = walk(t2, sub);
  if (u === v) return sub;
  if (isVariable(u)) return { ...sub, [u]: v };
  if (isVariable(v)) return { ...sub, [v]: u };
  return null;
}

export function unifyAtoms(a1: GoalAtom, a2: GoalAtom, sub: SubstitutionMap): SubstitutionMap | null {
  if (a1.pred !== a2.pred || a1.args.length !== a2.args.length) return null;
  let s: SubstitutionMap | null = { ...sub };
  for (let i = 0; i < a1.args.length; i++) {
    s = unifyTerms(a1.args[i], a2.args[i], s);
    if (!s) return null;
  }
  return s;
}

export function substituteAtom(atom: GoalAtom, sub: SubstitutionMap): GoalAtom {
  return { pred: atom.pred, args: atom.args.map((a) => walk(a, sub)) };
}

export function standardizeApart(clause: HornClause, idx: number): HornClause {
  const ren = (t: string) => (isVariable(t) ? `${t}_${idx}` : t);
  const renAtom = (a: GoalAtom): GoalAtom => ({
    pred: a.pred,
    args: a.args.map(ren),
    raw: a.args.length > 0 ? `${a.pred}(${a.args.map(ren).join(", ")})` : a.pred,
  });
  return { head: renAtom(clause.head), body: clause.body.map(renAtom), rawText: clause.rawText };
}

export function evaluateDif(a: string, b: string, sub: SubstitutionMap): { ok: boolean; deferred?: [string, string] } {
  const u = walk(a, sub);
  const v = walk(b, sub);
  if (!isVariable(u) && !isVariable(v)) return { ok: u !== v };
  if (isVariable(u) && isVariable(v) && u === v) return { ok: false };
  return { ok: true, deferred: [u, v] };
}

export function checkDifConstraints(constrs: [string, string][], sub: SubstitutionMap): boolean {
  return constrs.every(([a, b]) => {
    const u = walk(a, sub);
    const v = walk(b, sub);
    return !((!isVariable(u) && !isVariable(v) && u === v) || (isVariable(u) && isVariable(v) && u === v));
  });
}
