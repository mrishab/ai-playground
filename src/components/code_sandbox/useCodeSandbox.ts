import { useState, useEffect } from "react";
import { executeSandboxCode } from "./codeRunner";
import { useClipboardCopy } from "@/hooks/useClipboardCopy";

export function useCodeSandbox({
  initialCode,
  algorithmName,
  onRun,
  defaultOutput = '// Ready to run. Click "Run Code" to execute.',
}: {
  initialCode: string;
  algorithmName?: string;
  onRun?: (code: string) => void | { success: boolean; output: string };
  defaultOutput?: string;
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(defaultOutput);
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { isCopied, copy } = useClipboardCopy();

  // react-doctor-disable-next-line react-doctor/no-derived-state, react-doctor/no-derived-state-effect
  useEffect(() => setCode(initialCode), [initialCode]);

  const handleCopy = () => copy(code);

  const handleReset = () => {
    setCode(initialCode);
    setOutput("// Code reset.");
    setHasError(false);
  };

  const handleRun = () => {
    setIsRunning(true);
    const res = executeSandboxCode(code, onRun, algorithmName);
    setOutput(res.output);
    setHasError(res.hasError);
    setIsRunning(false);
  };

  return {
    code,
    setCode,
    output,
    isCopied,
    isRunning,
    hasError,
    handleCopy,
    handleReset,
    handleRun,
  };
}
