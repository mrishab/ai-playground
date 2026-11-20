import { HornRule, HornFact, GoalAtom, HornClause } from "./deductionTypes";

export function parseAtom(raw: string): GoalAtom {
  const t = raw.trim().replace(/\.$/, "");
  const m = t.match(/^(\w+)(?:\((.*)\))?$/);
  if (!m) return { pred: t, args: [], raw: t };
  return { pred: m[1], args: m[2] ? m[2].split(",").map((s) => s.trim()).filter(Boolean) : [], raw: t };
}

export function formatAtom(a: GoalAtom): string {
  return a.args.length > 0 ? `${a.pred}(${a.args.join(", ")})` : a.pred;
}

function splitBody(body: string): string[] {
  if (body.includes("&")) return body.split("&").map((a) => a.trim()).filter(Boolean);
  const atoms: string[] = [];
  let d = 0; let cur = "";
  for (const ch of body) {
    if (ch === "(") d++; else if (ch === ")") d--;
    if (ch === "," && d === 0) { if (cur.trim()) atoms.push(cur.trim()); cur = ""; }
    else cur += ch;
  }
  if (cur.trim()) atoms.push(cur.trim());
  return atoms;
}

export function parseHornClauses(kbCode: string): { rules: HornRule[]; facts: HornFact[]; clauses: HornClause[] } {
  const rules: HornRule[] = [];
  const facts: HornFact[] = [];
  const clauses: HornClause[] = [];

  for (let line of kbCode.split("\n")) {
    line = line.trim();
    if (!line || line.startsWith("%")) continue;
    line = line.replace(/\.$/, "");
    const sep = line.includes("<-") ? "<-" : line.includes(":-") ? ":-" : null;
    if (sep) {
      const [headPart, bodyPart] = line.split(sep);
      const headAtom = parseAtom(headPart);
      const bodyStrings = splitBody(bodyPart);
      rules.push({ head: headPart.trim(), headPred: headAtom.pred, headArgs: headAtom.args, body: bodyStrings });
      clauses.push({ head: headAtom, body: bodyStrings.map(parseAtom), rawText: line });
    } else {
      const factAtom = parseAtom(line);
      facts.push({ pred: factAtom.pred, args: factAtom.args });
      clauses.push({ head: factAtom, body: [], rawText: line });
    }
  }
  return { rules, facts, clauses };
}
