import { useClipboardCopy } from "@/hooks/useClipboardCopy";

export function useCodeSandbox({
  initialCode,
}: {
  initialCode: string;
  algorithmName?: string;
  onRun?: (code: string) => void | { success: boolean; output: string };
  defaultOutput?: string;
}) {
  const { isCopied, copy } = useClipboardCopy();

  const handleCopy = () => copy(initialCode);

  return {
    code: initialCode,
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
