import React from "react";
import { CodeSandbox } from "../CodeSandbox";

export function BayesSandboxTab({ codeTemplate }: { codeTemplate: string }) {
  return (
    <CodeSandbox
      title="Variable Elimination Sandbox"
      algorithmName="Exact Inference (VE)"
      initialCode={codeTemplate}
      notes="Multiplies distribution factors and marginalizes unobserved variables."
      onRun={(code) => {
        try {
          // react-doctor-disable-next-line react-doctor/no-eval
          const out = new Function(code)();
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
