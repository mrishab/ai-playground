import { useState, useEffect } from "react";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { ProofNode, SubstitutionMap } from "./deductionTypes";
import { runDeductionProof } from "./deductionRunner";
import { useDeductionStepper } from "./useDeductionStepper";
import { useDeductionKbState } from "./useDeductionKbState";
import { DeductionKB } from "@/data/deductionProblems";

export function useDeduction() {
  const kbState = useDeductionKbState();
  const [kbCode, setKbCode] = useState<string>(kbState.currentKB.code);
  const [queryInput, setQueryInput] = useState<string>(kbState.currentKB.sampleQueries[0] || "lit(l1)");
  const [proofTree, setProofTree] = useState<ProofNode | null>(null);
  const [answers, setAnswers] = useState<SubstitutionMap[]>([]);
  const [log, setLog] = useState<string>('Ready to deduce. Select a query and click "Prove Query".');
  const stepper = useDeductionStepper();

  const handleImportKB = (imported: DeductionKB) => {
    kbState.handleImportKB(imported);
    setKbCode(imported.code || "");
    setQueryInput(imported.sampleQueries?.[0] || "");
    setProofTree(null);
    setAnswers([]);
    stepper.resetStepper();
    setLog(`Imported knowledge base "${imported.name || "Custom KB"}".`);
  };

  const handleResetKB = () => {
    kbState.handleResetKB();
    setKbCode("");
    setQueryInput("");
    setProofTree(null);
    setAnswers([]);
    stepper.resetStepper();
    setLog("Knowledge base reset to empty.");
  };

  useEffect(() => {
    setKbCode(kbState.currentKB.code || "");
    setQueryInput(kbState.currentKB.sampleQueries?.[0] || "");
    setProofTree(null);
    setAnswers([]);
    stepper.resetStepper();
    setLog(`Loaded knowledge base "${kbState.currentKB.name || "Knowledge Base"}".`);
  }, [kbState.selectedKBId, kbState.currentKB]);

  const handleQueryChange = (q: string) => {
    setQueryInput(q);
    stepper.resetStepper();
    setProofTree(null);
    setAnswers([]);
  };

  const runProof = () => {
    stepper.resetStepper();
    const res = runDeductionProof(queryInput, kbCode);
    setLog(res.log);
    setProofTree(res.root);
    setAnswers(res.answers);
  };

  return {
    ...kbState,
    handleImportKB,
    handleResetKB,
    tutorial: TOOL_TUTORIALS.deduction,
    kbCode,
    setKbCode,
    queryInput,
    setQueryInput: handleQueryChange,
    proofTree: stepper.currentStep ? stepper.currentStep.treeSnapshot : proofTree,
    answers: stepper.currentStep ? stepper.currentStep.answers : answers,
    log: stepper.currentStep ? stepper.currentStep.log : log,
    runProof,
    stepper,
  };
}
