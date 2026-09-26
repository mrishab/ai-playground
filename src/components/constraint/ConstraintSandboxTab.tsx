import React from "react";
import { CodeSandbox } from "../CodeSandbox";

interface ConstraintSandboxTabProps {
  codeTemplate: string;
}

export function ConstraintSandboxTab({
  codeTemplate,
}: ConstraintSandboxTabProps) {
  return (
    <CodeSandbox
      title="AC-3 Propagation Sandbox"
      algorithmName="AC-3 Engine"
      initialCode={codeTemplate}
      notes="Supports unary, binary, and n-ary consistency constraints."
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
