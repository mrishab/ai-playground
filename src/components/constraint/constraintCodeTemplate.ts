import { CSPProblem } from "@/data/cspProblems";

export function getConstraintCodeTemplate(problem: CSPProblem, algorithm: string = "ac3"): string {
  if (algorithm === "mac") {
    return `// Maintaining Arc Consistency (MAC) Search
function macSearch(variables, constraints) {
  // 1. Establish initial arc consistency using AC-3
  // 2. Select unassigned variable with smallest domain (MRV)
  // 3. For each value in domain, assign and run AC-3 on dependent arcs
  // 4. Backtrack if wipeout occurs
  return { problem: "${problem.name}", algorithm: "MAC Search" };
}
`;
  }

  if (algorithm === "split") {
    return `// Backtracking Search with Domain Splitting
function domainSplitting(variables, constraints, domains) {
  // Split variable domain D(V) into D1 and D2
  // Recursively search left branch D1, backtrack to D2 on failure
  return { problem: "${problem.name}", algorithm: "Domain Splitting" };
}
`;
  }

  return `// AC-3 Constraint Propagation
function ac3(variables, constraints) {
  const domains = {};
  variables.forEach(v => domains[v.name] = [...v.domain]);
  const queue = [];
  constraints.forEach(c => c.variables.forEach(v => queue.push({ varName: v, constraint: c })));

  while (queue.length > 0) {
    const { varName, constraint } = queue.shift();
    const otherVar = constraint.variables.find(v => v !== varName);
    const initialSize = domains[varName].length;

    domains[varName] = domains[varName].filter(x => {
      if (!otherVar) return true;
      if (constraint.name.includes('!=')) return domains[otherVar].some(y => y !== x);
      return true;
    });

    if (domains[varName].length < initialSize) {
      if (domains[varName].length === 0) return { success: false, reason: \`Wipeout on \${varName}\` };
      constraints.filter(c => c.variables.includes(varName)).forEach(c => {
        c.variables.filter(v => v !== varName).forEach(other => queue.push({ varName: other, constraint: c }));
      });
    }
  }
  return { success: true, domains };
}
`;
}
