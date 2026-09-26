import React from "react";
import { CodeSandbox } from "@/components/CodeSandbox";
import { StripsProblem } from "@/data/stripsProblems";
import { getStripsCodeTemplate } from "./stripsCodeTemplate";

export function StripsSandboxTab({
  problem,
  horizonK,
}: {
  problem: StripsProblem;
  horizonK: number;
}) {
  return (
    <CodeSandbox
      title="STRIPS to CSP Compiler Sandbox"
      algorithmName="STRIPS-to-CSP Compiler"
      initialCode={getStripsCodeTemplate(problem, horizonK)}
      notes="Unfolding temporal horizons compiles planning into arc consistency constraints."
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
