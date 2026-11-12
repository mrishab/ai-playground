import React, { useRef, useMemo } from "react";
import { getPrismTokens } from "./syntaxTokenizer";
import { SyntaxHighlightTokens } from "./SyntaxHighlightTokens";

interface Props {
  value: string;
  onChange?: (val: string) => void;
  language?: string;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  readOnly?: boolean;
}

export function SyntaxHighlightEditor({
  value,
  onChange,
  language = "javascript",
  placeholder,
  ariaLabel = "Read-only code reference",
  className = "h-56",
  readOnly = true,
}: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const tokens = useMemo(() => getPrismTokens(value, language), [value, language]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  return (
    <div className={`relative w-full ${className} bg-muted/40 overflow-hidden`}>
      <pre ref={preRef} aria-hidden="true" className="absolute inset-0 m-0 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words overflow-auto pointer-events-none select-none text-foreground">
        <SyntaxHighlightTokens tokens={tokens} />
        {value.endsWith("\n") && "\n"}
      </pre>
      <textarea
        aria-label={ariaLabel}
        value={value}
        readOnly={readOnly}
        aria-readonly={readOnly ? "true" : undefined}
        tabIndex={0}
        onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)}
        onKeyDown={(e) => { if (readOnly && !e.ctrlKey && !e.metaKey && e.key.length === 1) e.preventDefault(); }}
        onScroll={handleScroll}
        spellCheck={false}
        placeholder={readOnly ? undefined : placeholder}
        className={`absolute inset-0 w-full h-full m-0 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words bg-transparent text-transparent resize-none focus:outline-none selection:bg-primary/30 transition-colors duration-150 ${
          readOnly ? "cursor-default caret-transparent" : "caret-foreground"
        }`}
      />
    </div>
  );
}
