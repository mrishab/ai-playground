import React from "react";
import { useCodeSandbox } from "./code_sandbox/useCodeSandbox";
import { CodeSandboxHeader } from "./code_sandbox/CodeSandboxHeader";
import { CodeSandboxOutput } from "./code_sandbox/CodeSandboxOutput";
import { SyntaxHighlightEditor } from "./ui/SyntaxHighlightEditor";

export interface CodeSandboxProps {
  title: string;
  initialCode: string;
  algorithmName?: string;
  onRun?: (code: string) => void | { success: boolean; output: string };
  defaultOutput?: string;
  notes?: string;
  language?: string;
}

export function CodeSandbox({
  title,
  initialCode,
  algorithmName,
  onRun,
  defaultOutput,
  notes,
  language = "javascript",
}: CodeSandboxProps) {
  const {
    code,
    setCode,
    output,
    isCopied,
    isRunning,
    hasError,
    handleCopy,
    handleReset,
    handleRun,
  } = useCodeSandbox({ initialCode, algorithmName, onRun, defaultOutput });

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg transition-colors">
      <CodeSandboxHeader
        title={title}
        algorithmName={algorithmName}
        isCopied={isCopied}
        isRunning={isRunning}
        onReset={handleReset}
        onCopy={handleCopy}
        onRun={handleRun}
      />
      <SyntaxHighlightEditor
        value={code}
        onChange={setCode}
        language={language}
        placeholder="Write or edit algorithm code here..."
        className="h-56"
      />
      <CodeSandboxOutput output={output} hasError={hasError} notes={notes} />
    </div>
  );
}
