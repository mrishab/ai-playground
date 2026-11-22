import { useState, useCallback, useEffect } from "react";
import { BayesNetwork, EvidenceMap } from "@/data/bayesProblems";
import { testDSeparationEngine } from "./dSeparation";

export function useBayesDSep(
  network: BayesNetwork,
  evidence: EvidenceMap,
) {
  const [dsepNodeA, setDsepNodeA] = useState<string>("");
  const [dsepNodeB, setDsepNodeB] = useState<string>("");
  const [dsepResult, setDsepResult] = useState<string | null>(null);

  const resetDSep = useCallback((net: BayesNetwork) => {
    setDsepNodeA(net.nodes[0]?.id || "");
    setDsepNodeB(net.nodes[1]?.id || "");
    setDsepResult(null);
  }, []);

  const testDSeparation = useCallback(() => {
    setDsepResult(
      testDSeparationEngine(network, evidence, dsepNodeA, dsepNodeB),
    );
  }, [network, evidence, dsepNodeA, dsepNodeB]);

  useEffect(() => {
    if (dsepResult !== null && dsepNodeA && dsepNodeB) {
      setDsepResult(testDSeparationEngine(network, evidence, dsepNodeA, dsepNodeB));
    }
  }, [network, evidence, dsepNodeA, dsepNodeB]);

  return {
    dsepNodeA,
    setDsepNodeA,
    dsepNodeB,
    setDsepNodeB,
    dsepResult,
    resetDSep,
    testDSeparation,
  };
}
