import { HornRule, HornFact } from "./deductionTypes";

export function parseHornClauses(kbCode: string): {
  rules: HornRule[];
  facts: HornFact[];
} {
  const rules: HornRule[] = [];
  const facts: HornFact[] = [];

  const lines = kbCode.split("\n");
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("%")) continue;
    line = line.replace(/\.$/, "");

    if (line.includes("<-")) {
      const [headPart, bodyPart] = line.split("<-");
      const head = headPart.trim();
      const bodyAtoms = bodyPart.split("&").map((a) => a.trim());
      const m = head.match(/(\w+)(?:\((.*)\))?/);
      if (m) {
        const pred = m[1];
        const args = m[2] ? m[2].split(",").map((a) => a.trim()) : [];
        rules.push({ head, headPred: pred, headArgs: args, body: bodyAtoms });
      }
    } else {
      const m = line.match(/(\w+)(?:\((.*)\))?/);
      if (m) {
        const pred = m[1];
        const args = m[2] ? m[2].split(",").map((a) => a.trim()) : [];
        facts.push({ pred, args });
      }
    }
  }
  return { rules, facts };
}
