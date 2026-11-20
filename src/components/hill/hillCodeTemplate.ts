import { CSPProblem } from "@/data/cspProblems";
import { getTabuSnippet, getAnnealingSnippet } from "./hillSnippets";

export function getHillCodeTemplate(problem: CSPProblem, algorithm: string = "min_conflicts"): string {
  if (algorithm === "tabu") return getTabuSnippet(problem);
  if (algorithm === "annealing") return getAnnealingSnippet(problem);

  return `// Stochastic Local Search: ${algorithm === "greedy" ? "Greedy Descent" : "Min-Conflicts"}
function slsSearch(problem, maxSteps = 100) {
  const assignment = {};
  problem.variables.forEach(v => {
    assignment[v.name] = v.domain[Math.floor(Math.random() * v.domain.length)];
  });

  function countConflicts(assign) {
    let conf = 0;
    problem.constraints.forEach(c => {
      const [v1, v2] = c.variables;
      if ((c.name.includes('!=') || c.name.includes('≠')) && assign[v1] === assign[v2]) conf++;
    });
    return conf;
  }

  for (let step = 0; step < maxSteps; step++) {
    const conflicts = countConflicts(assignment);
    if (conflicts === 0) return { success: true, steps: step, assignment };

    const target = problem.variables[Math.floor(Math.random() * problem.variables.length)];
    let bestVal = assignment[target.name], minC = 999;
    target.domain.forEach(val => {
      const c = countConflicts({ ...assignment, [target.name]: val });
      if (c < minC) { minC = c; bestVal = val; }
    });
    assignment[target.name] = bestVal;
  }
  return { success: false, assignment };
}
`;
}
