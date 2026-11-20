import { useState, useEffect } from "react";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { ProofNode, SubstitutionMap } from "./deductionTypes";
import { runDeductionProof } from "./deductionRunner";
import { useDeductionStepper } from "./useDeductionStepper";
import { useDeductionKbState } from "./useDeductionKbState";
import { DeductionKB } from "@/data/deductionProblems";

export function useDeduction() {
  const kbState = useDeductionKbState();
  const [algo, setAlgo] = useState("sld");
  const [kbCode, setKbCode] = useState(kbState.currentKB.code);
  const [queryInput, setQueryInput] = useState(kbState.currentKB.sampleQueries[0] || "lit(l1)");
  const [proofTree, setProofTree] = useState<ProofNode | null>(null);
  const [answers, setAnswers] = useState<SubstitutionMap[]>([]);
  const [log, setLog] = useState('Ready to deduce. Select a query and click "Prove Query".');
  const stepper = useDeductionStepper();

  const clearProof = () => { setProofTree(null); setAnswers([]); stepper.resetStepper(); };

  const handleImportKB = (imported: DeductionKB) => {
    kbState.handleImportKB(imported);
    setKbCode(imported.code || "");
    setQueryInput(imported.sampleQueries?.[0] || "");
    clearProof();
    setLog(`Imported knowledge base "${imported.name || "Custom KB"}".`);
  };

  const handleResetKB = () => {
    kbState.handleResetKB();
    setKbCode(""); setQueryInput(""); clearProof();
    setLog("Knowledge base reset to empty.");
  };

  useEffect(() => {
    setKbCode(kbState.currentKB.code || "");
    setQueryInput(kbState.currentKB.sampleQueries?.[0] || "");
    clearProof();
    setLog(`Loaded knowledge base "${kbState.currentKB.name || "Knowledge Base"}".`);
  }, [kbState.selectedKBId, kbState.currentKB]);

  const handleQueryChange = (q: string) => { setQueryInput(q); clearProof(); };

  const runProof = () => {
    stepper.resetStepper();
    const res = runDeductionProof(queryInput, kbCode, algo);
    setLog(res.log); setProofTree(res.root); setAnswers(res.answers);
  };

  return {
    ...kbState, handleImportKB, handleResetKB, tutorial: TOOL_TUTORIALS.deduction,
    kbCode, setKbCode, queryInput, setQueryInput: handleQueryChange, algo, setAlgo,
    proofTree: stepper.currentStep ? stepper.currentStep.treeSnapshot : proofTree,
    answers: stepper.currentStep ? stepper.currentStep.answers : answers,
    log: stepper.currentStep ? stepper.currentStep.log : log,
    runProof, stepper,
  };
}
