import { HornFact, SubstitutionMap } from "./deductionTypes";

export function matchFact(pred: string, args: string[], facts: HornFact[]) {
  for (const fact of facts) {
    if (fact.pred !== pred || fact.args.length !== args.length) continue;
    let matches = true;
    const sub: SubstitutionMap = {};
    for (let i = 0; i < args.length; i++) {
      if (!args[i]) continue;
      if (args[i][0] === args[i][0].toUpperCase() && args[i].length > 0) {
        sub[args[i]] = fact.args[i];
      } else if (args[i] !== fact.args[i]) {
        matches = false;
        break;
      }
    }
    if (matches) return { matched: true, sub, fact };
  }
  return { matched: false, sub: {}, fact: null };
}

export function matchRuleArgs(headArgs: string[], args: string[]) {
  let matches = true;
  const sub: SubstitutionMap = {};
  for (let i = 0; i < args.length; i++) {
    if (!args[i] || !headArgs[i]) continue;
    if (args[i][0] === args[i][0].toUpperCase() && args[i].length > 0)
      sub[args[i]] = headArgs[i];
    else if (headArgs[i][0] === headArgs[i][0].toUpperCase())
      sub[headArgs[i]] = args[i];
    else if (args[i] !== headArgs[i]) {
      matches = false;
      break;
    }
  }
  return { matches, sub };
}
