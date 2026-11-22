import React, { useState, useCallback, useRef, useEffect } from "react";
import { Bug, Check } from "lucide-react";
import { triggerBugReport } from "@/lib/bugReport";
import { cn } from "@/lib/utils";

export function BugReportBubble() {
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = useCallback(async () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsCopied(true);
    await triggerBugReport();
    timerRef.current = setTimeout(() => {
      setIsCopied(false);
      timerRef.current = null;
    }, 2800);
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Report bug on GitHub with diagnostic logs"
      title="Report bug (copies state & logs to GitHub issue)"
      className={cn(
        "group fixed bottom-16 sm:bottom-20 right-4 sm:right-6 z-40 flex items-center gap-1.5 rounded-full border border-border/80 bg-background/90 px-2.5 py-2 sm:px-3 sm:py-2 text-xs font-medium shadow-md backdrop-blur-sm",
        "transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-out active:scale-95 hover:border-primary/50 hover:bg-background hover:shadow-lg",
        isCopied &&
          "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      )}
    >
      {isCopied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-500 animate-in zoom-in-75 duration-150" />
          <span className="font-medium text-[11px] sm:text-xs">
            Diagnostics Copied!
          </span>
        </>
      ) : (
        <>
          <Bug className="h-3.5 w-3.5 text-muted-foreground transition-colors duration-150 group-hover:text-primary" />
          <span className="hidden sm:inline text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
            Report Bug
          </span>
        </>
      )}
    </button>
  );
}

export default BugReportBubble;
