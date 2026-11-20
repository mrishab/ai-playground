import { useState, useEffect, useRef } from "react";

export function useWorkspaceLogHistory(
  activeLogMessage?: string,
  selectedPrebuiltId?: string,
) {
  const [history, setHistory] = useState<string[]>([]);
  const prevMsgRef = useRef<string | undefined>(undefined);
  const prevPrebuiltRef = useRef<string | undefined>(undefined);
  const stepRef = useRef<number>(0);

  useEffect(() => {
    if (!activeLogMessage) return;

    const time = new Date().toLocaleTimeString();
    if (prevPrebuiltRef.current !== selectedPrebuiltId) {
      prevPrebuiltRef.current = selectedPrebuiltId;
      prevMsgRef.current = activeLogMessage;
      stepRef.current = 1;
      setHistory([`[Step 1] [${time}] ${activeLogMessage}`]);
      return;
    }

    if (activeLogMessage !== prevMsgRef.current) {
      prevMsgRef.current = activeLogMessage;
      stepRef.current += 1;
      const entry = `[Step ${stepRef.current}] [${time}] ${activeLogMessage}`;
      setHistory((prev) => [...prev, entry]);
    }
  }, [activeLogMessage, selectedPrebuiltId]);

  return history;
}
