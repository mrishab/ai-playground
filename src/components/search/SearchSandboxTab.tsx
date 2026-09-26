import React from "react";
import { SearchGraph } from "@/data/searchProblems";
import { CodeSandbox } from "../CodeSandbox";

interface SearchSandboxTabProps {
  codeTemplate: string;
  graph: SearchGraph;
}

export function SearchSandboxTab({
  codeTemplate,
  graph,
}: SearchSandboxTabProps) {
  return (
    <CodeSandbox
      title="Live Search Algorithm Sandbox"
      algorithmName="A* / Dijkstra Runner"
      initialCode={codeTemplate}
      notes="Adjust heuristic weighting f = g + w*h, tie-breaking, or pruning logic."
      onRun={(code) => {
        try {
          // react-doctor-disable-next-line react-doctor/no-eval
          const out = new Function("graph", code)(graph);
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
