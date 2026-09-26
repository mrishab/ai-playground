import React from "react";
import { CodeSandbox } from "../CodeSandbox";

interface HillSandboxTabProps {
  codeTemplate: string;
}

export function HillSandboxTab({ codeTemplate }: HillSandboxTabProps) {
  return (
    <CodeSandbox
      title="SLS & Min-Conflicts Sandbox"
      algorithmName="Min-Conflicts / Annealing"
      initialCode={codeTemplate}
      notes="Tune neighborhood evaluation, transition probability, or cooling schedule."
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
