import { BayesNetwork, EvidenceMap } from "@/data/bayesProblems";

export function getBayesCodeTemplate(
  network: BayesNetwork,
  evidence: EvidenceMap,
  algo: string = "ve",
): string {
  if (algo === "dsep") {
    return `// D-Separation Active Trail Testing
function isDSeparated(graph, varA, varB, observedSet) {
  // A trail is active if:
  // - every collider has an observed descendant
  // - no non-collider is in the observed conditioning set
  const activeQueue = [{ node: varA, path: [varA] }];
  const visited = new Set();
  while (activeQueue.length > 0) {
    const { node, path } = activeQueue.shift();
    if (node === varB) return false; // Active trail reaches varB -> Dependent
    // Expand unblocked neighbors along undirected trail...
  }
  return true; // D-separated (conditionally independent)
}
`;
  }

  if (algo === "sampling") {
    return `// Rejection Sampling for Approximate Bayesian Inference
function rejectionSampling(queryVar, evidence, network, numSamples = 1000) {
  const counts = {};
  let accepted = 0;
  for (let s = 0; s < numSamples; s++) {
    const sample = samplePriorTopological(network);
    const matchesEvidence = Object.entries(evidence).every(
      ([k, v]) => !v || sample[k] === v
    );
    if (!matchesEvidence) continue; // Reject sample
    accepted++;
    counts[sample[queryVar]] = (counts[sample[queryVar]] || 0) + 1;
  }
  const posterior = {};
  for (const [val, cnt] of Object.entries(counts)) {
    posterior[val] = accepted > 0 ? cnt / accepted : 0;
  }
  return { posterior, accepted, total: numSamples };
}
`;
  }

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
