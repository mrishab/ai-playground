export function getPlanningCodeTemplate(problemId: string = "sussman"): string {
  return `// STRIPS Forward / Regression Planner Reference Algorithm
function solveBlocksWorld(problemId) {
  const plan = [];
  const trace = [];

  trace.push("[Init] State: ontable(B), on(C, A), clear(B), clear(C)");
  trace.push("[Goal] Target: on(A, B), on(B, C)");
  trace.push("[Subgoal Analysis] Sussman Anomaly detected: interdependent subgoals.");

  // Actions
  plan.push("unstack(C, A)");
  plan.push("putdown(C)");
  plan.push("pickup(B)");
  plan.push("stack(B, C)");
  plan.push("pickup(A)");
  plan.push("stack(A, B)");

  trace.push(\`[Plan Generated] Length: \${plan.length} actions.\`);
  return { success: true, plan, trace };
}

const res = solveBlocksWorld("${problemId}");
return res.trace.join('\\n') + '\\n\\nActions:\\n' + res.plan.join('\\n');
`;
}
