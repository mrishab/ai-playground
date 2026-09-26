import React from "react";
import { CodeSandbox } from "../CodeSandbox";

export function DTreeSandboxTab({ codeTemplate }: { codeTemplate: string }) {
  return (
    <CodeSandbox
      title="Decision Tree Induction Sandbox"
      algorithmName="ID3 Algorithm"
      initialCode={codeTemplate}
      notes="Information gain measures entropy reduction from attribute splits."
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
