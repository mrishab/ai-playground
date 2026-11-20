import confetti from "canvas-confetti";
import { executeSLDProof } from "./sldEngine";
import { ProofNode, SubstitutionMap } from "./deductionTypes";

export interface ProofExecutionResult {
  root: ProofNode;
  answers: SubstitutionMap[];
  log: string;
}

export function runDeductionProof(
  queryInput: string,
  kbCode: string,
): ProofExecutionResult {
  const { root, foundAnswers, cleanQuery } = executeSLDProof(
    queryInput,
    kbCode,
  );
  if (root.status === "failed") {
    return {
      root,
      answers: foundAnswers,
      log: `Query failed: "${cleanQuery}" could not be proven from current KB.`,
    };
  }

  confetti({ particleCount: 50, spread: 60 });
  return {
    root,
    answers: foundAnswers,
    log: `Query proven! Found ${foundAnswers.length} proof derivation(s).`,
  };
}
