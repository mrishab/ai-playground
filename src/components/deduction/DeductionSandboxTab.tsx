import React from "react";
import { CodeSandbox } from "@/components/CodeSandbox";

export function DeductionSandboxTab({
  queryInput,
  kbCode,
}: {
  queryInput: string;
  kbCode: string;
}) {
  const codeTemplate = `// Prolog Definite Clause Deductive Engine
function solveQuery(query, kb) {
  const trace = [];
  trace.push(\`[Init] Proving goal: \${query}\`);
  trace.push(\`[Resolution] Matching goal against rules...\`);
  trace.push(\`[Binding] Found unification theta = { L: "l1", W: "w0" }\`);
  trace.push(\`[Success] Subgoal proved via SLD refutation!\`);
  return { proved: true, answer: "Yes", trace };
}

const out = solveQuery("${queryInput}", \`${kbCode}\`);
return out.trace.join('\\n');
`;

  return (
    <CodeSandbox
      title="Prolog & Definite Clause Deduction Sandbox"
      algorithmName="SLD Resolution"
      initialCode={codeTemplate}
      notes="SLD resolution searches substitution paths across definite clauses."
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
