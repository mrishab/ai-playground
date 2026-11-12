import React from "react";
import { useCodeSandbox } from "./code_sandbox/useCodeSandbox";
import { CodeSandboxHeader } from "./code_sandbox/CodeSandboxHeader";
import { CodeSandboxOutput } from "./code_sandbox/CodeSandboxOutput";
import { SyntaxHighlightEditor } from "./ui/SyntaxHighlightEditor";

export interface CodeSandboxProps {
  title: string;
  initialCode: string;
  algorithmName?: string;
  notes?: string;
  language?: string;
}

export function CodeSandbox({
  title,
  initialCode,
  algorithmName,
  notes,
  language = "javascript",
}: CodeSandboxProps) {
  const { code, isCopied, handleCopy } = useCodeSandbox({
    initialCode,
    algorithmName,
  });

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg transition-colors">
      <CodeSandboxHeader
        title={title}
        algorithmName={algorithmName}
        isCopied={isCopied}
        onCopy={handleCopy}
      />
      <SyntaxHighlightEditor
        value={code}
        language={language}
        readOnly
        className="h-56"
      />
      <CodeSandboxOutput notes={notes} />
    </div>
  );
}
