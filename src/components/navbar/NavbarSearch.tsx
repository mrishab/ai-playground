import React from "react";
import { Search } from "lucide-react";

export function NavbarSearch({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex-1 max-w-md mx-4 hidden md:block">
      <button
        onClick={onOpen}
        className="w-full flex items-center justify-between h-9 px-3 text-xs rounded-xl border border-input bg-background/50 text-muted-foreground hover:bg-secondary/40 transition-colors duration-150 active:scale-[0.99] shadow-sm"
      >
        <div className="flex items-center gap-2">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <span>Search algorithms, tools, exercises...</span>
        </div>
        <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-secondary text-muted-foreground font-mono border border-border">
          ⌘K
        </kbd>
      </button>
    </div>
  );
}
