import { CSPProblem } from "@/data/cspProblems";

export function getConstraintCodeTemplate(problem: CSPProblem): string {
  return `// AC-3 Constraint Propagation
function ac3(variables, constraints) {
  const domains = {};
  variables.forEach(v => domains[v.name] = [...v.domain]);
  
  const queue = [];
  constraints.forEach(c => {
    c.variables.forEach(v => queue.push({ varName: v, constraint: c }));
  });

  const trace = [];

  while (queue.length > 0) {
    const { varName, constraint } = queue.shift();
    const otherVar = constraint.variables.find(v => v !== varName);
    const initialSize = domains[varName].length;

    domains[varName] = domains[varName].filter(x => {
      if (!otherVar) return true;
      if (constraint.name.includes('!=')) {
        return domains[otherVar].some(y => y !== x);
      }
      return true;
    });

    if (domains[varName].length < initialSize) {
      trace.push(\`Pruned values from \${varName}. Remaining: [\${domains[varName]}]\`);
      if (domains[varName].length === 0) {
        return { success: false, reason: \`Wipeout on \${varName}\`, trace };
      }
      constraints.filter(c => c.variables.includes(varName)).forEach(c => {
        c.variables.filter(v => v !== varName).forEach(other => {
          queue.push({ varName: other, constraint: c });
        });
      });
    }
  }

  return { success: true, domains, trace };
}

const result = ac3(${JSON.stringify(problem.variables)}, ${JSON.stringify(problem.constraints)});
return JSON.stringify(result, null, 2);
`;
}
