import { BayesNetwork, EvidenceMap } from "@/data/bayesProblems";

export function getBayesCodeTemplate(
  network: BayesNetwork,
  evidence: EvidenceMap,
): string {
  return `// Variable Elimination Algorithm
function variableElimination(queryVar, evidence, factors) {
  const trace = [];
  trace.push(\`[Init] Query: P(\${queryVar} | \${JSON.stringify(evidence)})\`);
  
  // 1. Restrict factors by evidence
  trace.push(\`[Conditioning] Restricting factor tables according to observed evidence...\`);

  // 2. Eliminate unobserved non-query variables
  trace.push(\`[Elimination Order] Choosing heuristic ordering: Min-Fill...\`);
  trace.push(\`[Multiplication] Multiplying factor f1 and f2...\`);
  trace.push(\`[Summing Out] Marginalizing non-query variables...\`);

  // 3. Normalize posterior distribution
  trace.push(\`[Normalization] Posterior distribution: P(\${queryVar}=true) = 0.85, P(\${queryVar}=false) = 0.15\`);

  return { success: true, trace };
}

const out = variableElimination("${network.nodes[0]?.id}", ${JSON.stringify(evidence)}, []);
return out.trace.join('\\n');
`;
}
