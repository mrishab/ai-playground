export interface VeFactorRow {
  assignment: Record<string, string>;
  value: number;
}

export interface VeFactor {
  id: string;
  name: string;
  variables: string[];
  table: VeFactorRow[];
}

export interface VeStepSnapshot {
  stepIndex: number;
  action: string;
  targetVar?: string;
  factors: VeFactor[];
  description: string;
  intermediateFactor?: VeFactor;
  normalizedResult?: Record<string, number>;
}

export function getValidBayesQueryVar(
  network: import("@/data/bayesProblems").BayesNetwork,
  evidence: import("@/data/bayesProblems").EvidenceMap,
  current?: string,
): string {
  const valid = network.nodes.some((n) => n.id === current && n.type === "chance");
  if (valid && current) return current;
  return (
    network.nodes.find((n) => n.type === "chance" && !evidence[n.id])?.id ||
    network.nodes.find((n) => n.type === "chance")?.id ||
    network.nodes[0]?.id ||
    ""
  );
}
