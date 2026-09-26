import React from "react";
import { CodeSandbox } from "@/components/CodeSandbox";

export function PlanningSandboxTab({ problemId }: { problemId: string }) {
  const codeTemplate = `// STRIPS Forward Planner
function solveBlocksWorld(initial, goal) {
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

  return (
    <CodeSandbox
      title="STRIPS Planning Sandbox"
      algorithmName="STRIPS Forward / Backward Planner"
      initialCode={codeTemplate}
      notes="Actions use preconditions and effects to transform state propositions."
      onRun={(code) => {
        try {
          // react-doctor-disable-next-line react-doctor/no-eval
          const func = new Function(code);
          const out = func();
          return {
            success: true,
            output:
              typeof out === "string" ? out : JSON.stringify(out, null, 2),
          };
        } catch (e: any) {
          return { success: false, output: e.message };
        }
      }}
    />
  );
}
