import { useState, useEffect } from "react";
import { DEDUCTION_KBS, DeductionKB } from "@/data/deductionProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { ProofNode, SubstitutionMap } from "./deductionTypes";
import { runDeductionProof } from "./deductionRunner";
import { useDeductionStepper } from "./useDeductionStepper";

export function useDeduction() {
  const [selectedKBId, setSelectedKBId] = useState<string>("elect");
  const currentKB: DeductionKB =
    DEDUCTION_KBS[selectedKBId] || DEDUCTION_KBS.elect;
  const tutorial = TOOL_TUTORIALS.deduction;

  const [kbCode, setKbCode] = useState<string>(currentKB.code);
  const [queryInput, setQueryInput] = useState<string>(
    currentKB.sampleQueries[0] || "lit(l1)",
  );
  const [proofTree, setProofTree] = useState<ProofNode | null>(null);
  const [answers, setAnswers] = useState<SubstitutionMap[]>([]);
  const [log, setLog] = useState<string>(
    'Ready to deduce. Select a query and click "Prove Query".',
  );
  const stepper = useDeductionStepper();

  useEffect(() => {
    setKbCode(currentKB.code);
    setQueryInput(currentKB.sampleQueries[0] || "");
    setProofTree(null);
    setAnswers([]);
    setLog(`Loaded knowledge base "${currentKB.name}".`);
  }, [selectedKBId, currentKB]);

  const runProof = () => {
    const res = runDeductionProof(queryInput, kbCode);
    setLog(res.log);
    setProofTree(res.root);
    setAnswers(res.answers);
  };

  const activeTree = stepper.currentStep ? stepper.currentStep.treeSnapshot : proofTree;
  const activeLog = stepper.currentStep ? stepper.currentStep.log : log;
  const activeAnswers = stepper.currentStep ? stepper.currentStep.answers : answers;

  return {
    selectedKBId,
    setSelectedKBId,
    currentKB,
    tutorial,
    kbCode,
    setKbCode,
    queryInput,
    setQueryInput,
    proofTree: activeTree,
    answers: activeAnswers,
    log: activeLog,
    runProof,
    stepper,
  };
}
