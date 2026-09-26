import React, { useRef, useMemo } from "react";
import { getPrismTokens } from "./syntaxTokenizer";
import { SyntaxHighlightTokens } from "./SyntaxHighlightTokens";

interface SyntaxHighlightEditorProps {
  value: string;
  onChange: (val: string) => void;
  language?: string;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

export function SyntaxHighlightEditor({
  value,
  onChange,
  language = "javascript",
  placeholder,
  ariaLabel = "Code editor",
  className = "h-56",
}: SyntaxHighlightEditorProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const tokens = useMemo(() => getPrismTokens(value, language), [value, language]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  return (
    <div className={`relative w-full ${className} bg-slate-50 dark:bg-[#0b0f19] overflow-hidden`}>
      <pre
        ref={preRef}
        aria-hidden="true"
        className="absolute inset-0 m-0 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words overflow-auto pointer-events-none select-none text-slate-800 dark:text-[#e2e8f0]"
      >
        <SyntaxHighlightTokens tokens={tokens} />
        {value.endsWith("\n") && "\n"}
      </pre>
      <textarea
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        spellCheck={false}
        placeholder={placeholder}
        className="absolute inset-0 w-full h-full m-0 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words bg-transparent text-transparent caret-foreground resize-none focus:outline-none selection:bg-primary/30"
      />
    </div>
  );
}
