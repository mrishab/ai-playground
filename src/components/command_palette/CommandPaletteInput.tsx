import React, { useRef, useEffect } from "react";
import { Search } from "lucide-react";

interface CommandPaletteInputProps {
  query: string;
  onChange: (val: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function CommandPaletteInput({
  query,
  onChange,
  onKeyDown,
}: CommandPaletteInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <div className="flex items-center px-4 border-b border-border bg-card">
      <Search className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
      <input
        ref={inputRef}
        aria-label="Search tools and exercises"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type to search tools, algorithms, exercises..."
        className="w-full h-12 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground transition-colors duration-150"
      />
      <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-secondary text-muted-foreground font-mono border border-border">
        ESC
      </kbd>
    </div>
  );
}
