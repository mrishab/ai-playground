import { CSPProblem } from "@/data/cspProblems";

export function getHillCodeTemplate(problem: CSPProblem): string {
  return `// Stochastic Local Search: Min-Conflicts
function minConflicts(problem, maxSteps = 100) {
  const assignment = {};
  problem.variables.forEach(v => {
    assignment[v.name] = v.domain[Math.floor(Math.random() * v.domain.length)];
  });

  function countConflicts(assign) {
    let conf = 0;
    problem.constraints.forEach(c => {
      const [v1, v2] = c.variables;
      if (c.name.includes('!=') && assign[v1] === assign[v2]) conf++;
    });
    return conf;
  }

  const history = [];
  for (let step = 0; step < maxSteps; step++) {
    const conflicts = countConflicts(assignment);
    history.push({ step, conflicts });
    if (conflicts === 0) {
      return { success: true, steps: step, assignment, history };
    }

    const target = problem.variables[Math.floor(Math.random() * problem.variables.length)];
    let bestVal = assignment[target.name];
    let minC = 999;

    target.domain.forEach(val => {
      const test = { ...assignment, [target.name]: val };
      const c = countConflicts(test);
      if (c < minC) {
        minC = c;
        bestVal = val;
      }
    });
    assignment[target.name] = bestVal;
  }

  return { success: false, assignment, history };
}

const res = minConflicts(${JSON.stringify(problem)});
return JSON.stringify(res, null, 2);
`;
}
