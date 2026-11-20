import { BayesNetwork, EvidenceMap } from "@/data/bayesProblems";
import { getEvidenceDescendants, isTrailActive } from "./dSeparationTrails";

export function testDSeparationEngine(
  network: BayesNetwork,
  evidence: EvidenceMap,
  dsepNodeA: string,
  dsepNodeB: string,
): string {
  if (!dsepNodeA || !dsepNodeB || dsepNodeA === dsepNodeB) {
    return "Please choose two distinct variables.";
  }
  const evidenceSet = new Set(
    Object.entries(evidence)
      .filter(([_, val]) => val !== null)
      .map(([id]) => id),
  );
  const evidenceAndDescendants = getEvidenceDescendants(network, evidenceSet);

  const connected = isTrailActive(
    network,
    dsepNodeA,
    dsepNodeB,
    evidenceSet,
    evidenceAndDescendants,
  );

  return connected
    ? `DEPENDENT: Active trail exists between ${dsepNodeA} and ${dsepNodeB} given evidence.`
    : `D-SEPARATED: ${dsepNodeA} ⊥ ${dsepNodeB} | Evidence. All trails are blocked.`;
}
