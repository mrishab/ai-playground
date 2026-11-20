import { ProofNode, SubstitutionMap, SLDStepSnapshot, GoalAtom } from "./deductionTypes";
import { parseHornClauses, parseAtom, formatAtom } from "./sldParser";
import { checkDifConstraints, evaluateDif, standardizeApart, unifyAtoms, walk } from "./sldMatcher";
import { pushStep, StepContext } from "./sldStepHelper";

function stepDFS(goals: GoalAtom[], sub: SubstitutionMap, constrs: [string, string][], depth: number, ctx: StepContext): boolean {
  if (depth > 25) return false;
  if (goals.length === 0) {
    if (!checkDifConstraints(constrs, sub)) return false;
    const ans: SubstitutionMap = {};
    for (const v of ctx.qVars) ans[v] = walk(v, sub);
    const key = JSON.stringify(ans);
    if (!ctx.seen.has(key)) {
      ctx.seen.add(key);
      ctx.answers.push(ans);
      ctx.root.status = "success";
      pushStep(ctx.steps, ctx.root, ctx.answers, ctx.query, "Goal proved", `Proved: ${ctx.query}`);
    }
    return true;
  }
  const [curr, ...rest] = goals;
  if (curr.pred === "dif" && curr.args.length === 2) {
    const res = evaluateDif(curr.args[0], curr.args[1], sub);
    if (!res.ok) return false;
    return stepDFS(rest, sub, res.deferred ? [...constrs, res.deferred] : constrs, depth + 1, ctx);
  }
  let anySol = false;
  for (const cl of ctx.clauses) {
    if (cl.head.pred !== curr.pred || cl.head.args.length !== curr.args.length) continue;
    const ren = standardizeApart(cl, ctx.vIdx.current++);
    const uni = unifyAtoms(curr, ren.head, sub);
    if (!uni || !checkDifConstraints(constrs, uni)) continue;
    const action = ren.body.length === 0 ? "Matched fact" : "Unify rule";
    pushStep(ctx.steps, ctx.root, ctx.answers, formatAtom(curr), action, `${action}: ${ren.rawText}`, ren.rawText);
    const ok = stepDFS([...ren.body, ...rest], uni, constrs, depth + 1, ctx);
    if (ok) anySol = true;
    else pushStep(ctx.steps, ctx.root, ctx.answers, formatAtom(curr), "Backtrack", `Branch failed for ${formatAtom(curr)}. Backtracking to choice point...`);
  }
  return anySol;
}

export function generateSLDSteps(queryInput: string, kbCode: string): SLDStepSnapshot[] {
  const cleanQuery = queryInput.trim().replace(/^(\?-|\?)\s*/, "").replace(/\.$/, "").trim();
  const { clauses } = parseHornClauses(kbCode);
  const qAtom = parseAtom(cleanQuery);
  const qVars = Array.from(new Set(cleanQuery.match(/\b[A-Z_][a-zA-Z0-9_]*\b/g) || []));
  const root: ProofNode = { id: `0-${cleanQuery}`, goal: cleanQuery, children: [], status: "active" };
  const ctx: StepContext = { clauses, steps: [], answers: [], seen: new Set(), root, query: cleanQuery, qVars, vIdx: { current: 0 } };

  pushStep(ctx.steps, root, ctx.answers, cleanQuery, "Select goal", `Selected query goal: ${cleanQuery}`);
  stepDFS([qAtom], {}, [], 0, ctx);
  const ok = ctx.answers.length > 0;
  root.status = ok ? "success" : "failed";
  const finalAction = ok ? "Resolution complete" : "Resolution failed";
  const finalMsg = ok ? `Proved: ${cleanQuery}. Found ${ctx.answers.length} answer(s).` : `Query failed: "${cleanQuery}" could not be proven from current KB.`;
  pushStep(ctx.steps, root, ctx.answers, cleanQuery, finalAction, finalMsg);
  return ctx.steps;
}
