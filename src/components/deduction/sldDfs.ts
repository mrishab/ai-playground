import { GoalAtom, HornClause, ProofNode, SubstitutionMap } from "./deductionTypes";
import { formatAtom } from "./sldParser";
import { checkDifConstraints, evaluateDif, isVariable, standardizeApart, substituteAtom, unifyAtoms, walk } from "./sldMatcher";

export function solveSLD(
  goals: GoalAtom[],
  clauses: HornClause[],
  sub: SubstitutionMap,
  difConstrs: [string, string][],
  varIdx: { current: number },
  depth: number,
  maxDepth: number,
  onSuccess: (sub: SubstitutionMap, traceNodes: ProofNode[]) => void,
  trace: ProofNode[] = [],
): void {
  if (depth > maxDepth) return;
  if (goals.length === 0) {
    if (checkDifConstraints(difConstrs, sub)) onSuccess(sub, trace);
    return;
  }
  const [curr, ...rest] = goals;
  if (curr.pred === "dif" && curr.args.length === 2) {
    const res = evaluateDif(curr.args[0], curr.args[1], sub);
    if (!res.ok) return;
    const nextConstrs = res.deferred ? [...difConstrs, res.deferred] : difConstrs;
    solveSLD(rest, clauses, sub, nextConstrs, varIdx, depth + 1, maxDepth, onSuccess, trace);
    return;
  }
  for (const clause of clauses) {
    if (clause.head.pred !== curr.pred || clause.head.args.length !== curr.args.length) continue;
    const ren = standardizeApart(clause, varIdx.current++);
    const unified = unifyAtoms(curr, ren.head, sub);
    if (!unified || !checkDifConstraints(difConstrs, unified)) continue;

    const subAtom = substituteAtom(ren.head, unified);
    const subStr = Object.entries(unified)
      .filter(([k]) => isVariable(k) && !k.includes("_"))
      .map(([k, v]) => `${k}=${walk(v, unified)}`)
      .join(", ") || (ren.body.length === 0 ? "Direct Match" : "Unified");

    const node: ProofNode = {
      id: `${depth}-${ren.head.raw || ren.head.pred}-${varIdx.current}`,
      goal: formatAtom(subAtom),
      ruleMatched: ren.rawText,
      substitution: subStr,
      children: ren.body.map((b) => ({
        id: `${depth + 1}-${b.pred}`,
        goal: formatAtom(substituteAtom(b, unified)),
        children: [],
        status: "success",
      })),
      status: "success",
    };

    solveSLD([...ren.body, ...rest], clauses, unified, difConstrs, varIdx, depth + 1, maxDepth, onSuccess, [...trace, node]);
  }
}
