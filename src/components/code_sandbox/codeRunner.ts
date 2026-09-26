export function executeSandboxCode(
  code: string,
  onRun?: (code: string) => void | { success: boolean; output: string },
  algorithmName?: string,
): { output: string; hasError: boolean } {
  try {
    if (onRun) {
      const res = onRun(code);
      if (res && typeof res === "object") {
        return { output: res.output, hasError: !res.success };
      }
      return {
        output: `[Success] Executed ${algorithmName || "algorithm"} successfully.`,
        hasError: false,
      };
    }
    return {
      output: `[Output]:\n${code.substring(0, 150)}...`,
      hasError: false,
    };
  } catch (err: any) {
    return {
      output: `[Error]: ${err?.message || String(err)}`,
      hasError: true,
    };
  }
}
