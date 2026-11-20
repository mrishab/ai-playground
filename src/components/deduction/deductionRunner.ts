import confetti from "canvas-confetti";
import { executeSLDProof } from "./sldEngine";
import { executeBottomUp } from "./bottomUpRunner";
import { ProofNode, SubstitutionMap } from "./deductionTypes";

export interface ProofExecutionResult {
  root: ProofNode;
  answers: SubstitutionMap[];
  log: string;
}

export function runDeductionProof(queryInput: string, kbCode: string, algo = "sld"): ProofExecutionResult {
  const res = algo === "bottom_up" ? executeBottomUp(queryInput, kbCode) : executeSLDProof(queryInput, kbCode);
  const { root, foundAnswers, cleanQuery } = res;
  if (root.status === "failed") {
    return {
      root,
      answers: foundAnswers,
      log: res.log || `Query failed: "${cleanQuery}" could not be proven from current KB.`,
    };
  }
  confetti({ particleCount: 50, spread: 60 });
  return {
    root,
    answers: foundAnswers,
    log: res.log || `Query proven! Found ${foundAnswers.length} proof derivation(s).`,
  };
}
