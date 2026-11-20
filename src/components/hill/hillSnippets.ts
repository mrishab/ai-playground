import { CSPProblem } from "@/data/cspProblems";

export function getTabuSnippet(problem: CSPProblem): string {
  return `// Stochastic Local Search: Tabu Search Reference Implementation
function tabuSearch(problem, maxSteps = 100, tenure = 3) {
  let current = {};
  problem.variables.forEach(v => current[v.name] = v.domain[0]);
  const tabuList = []; // Array of { varName, value, expiry }

  for (let step = 0; step < maxSteps; step++) {
    const isTabu = (v, val) => tabuList.some(t => t.varName === v && t.value === val && t.expiry > step);
    // Select best non-tabu variable assignment move
    // Update tabu list: tabuList.push({ varName, value: oldVal, expiry: step + tenure });
  }
  return { problem: "${problem.name}", algorithm: "Tabu Search", tenure };
}
`;
}

export function getAnnealingSnippet(problem: CSPProblem): string {
  return `// Stochastic Local Search: Simulated Annealing Reference Implementation
function simulatedAnnealing(problem, maxSteps = 100, initialTemp = 10.0, coolingRate = 0.95) {
  let temp = initialTemp;
  let current = {};
  for (let step = 0; step < maxSteps; step++) {
    // If delta < 0: accept improvement
    // Else: accept with probability Math.exp(-delta / temp)
    temp *= coolingRate;
  }
  return { problem: "${problem.name}", algorithm: "Simulated Annealing" };
}
`;
}
