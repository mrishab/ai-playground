import { useClipboardCopy } from "@/hooks/useClipboardCopy";
import { DEFAULT_ALGO_SNIPPETS } from "./codeSandboxSnippets";

export function useCodeSandbox({
  initialCode,
  algorithmName,
}: {
  initialCode: string;
  algorithmName?: string;
  onRun?: (code: string) => void | { success: boolean; output: string };
  defaultOutput?: string;
}) {
  const { isCopied, copy } = useClipboardCopy();
  const key = (algorithmName || "").toLowerCase().replace(/[^a-z]/g, "");
  const code = (!initialCode && key && DEFAULT_ALGO_SNIPPETS[key])
    ? DEFAULT_ALGO_SNIPPETS[key]
    : initialCode;

  const handleCopy = () => copy(code);

  return {
    code,
    setCode: () => {},
    output: "AI Playground is a visual builder app. Code writing is not supported.",
    isCopied,
    isRunning: false,
    hasError: false,
    handleCopy,
    handleReset: () => {},
    handleRun: () => {},
  };
}
