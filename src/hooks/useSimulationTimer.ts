import { useEffect } from "react";

export function useSimulationTimer(
  isActive: boolean,
  canContinue: boolean,
  onTick: () => void,
  intervalMs: number,
) {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isActive && canContinue) {
      timer = setTimeout(onTick, intervalMs);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isActive, canContinue, onTick, intervalMs]);
}
