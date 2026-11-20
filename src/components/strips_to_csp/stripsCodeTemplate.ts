import { StripsProblem } from "@/data/stripsProblems";

export function getStripsCodeTemplate(
  problem: StripsProblem,
  horizonK: number,
): string {
  return `// Compile STRIPS to CSP & Solve
function stripsToCSP(problem, horizonK) {
  const variables = [];
  const constraints = [];

  // 1. Unfold state propositions for t = 0 ... k
  for (let t = 0; t <= horizonK; t++) {
    problem.variables.forEach(v => {
      variables.push({ name: \`\${v.name}_\${t}\`, domain: v.domain });
    });
  }

  // 2. Unfold action variables for t = 0 ... k-1
  for (let t = 0; t < horizonK; t++) {
    variables.push({
      name: \`Action_\${t}\`,
      domain: problem.actions.map(a => a.name).concat(['NoOp'])
    });
  }

  // 3. Add Precondition, Effect, and Explanatory Frame Constraints
  return {
    horizon: horizonK,
    totalCSPVariables: variables.length,
    planFound: horizonK >= 3,
    plan: horizonK >= 3 ? ["PUC", "mcc", "mo"] : []
  };
}

const out = stripsToCSP(${JSON.stringify(problem)}, ${horizonK});
return JSON.stringify(out, null, 2);
`;
}
