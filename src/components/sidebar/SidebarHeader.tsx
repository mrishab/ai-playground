import React from "react";
import { X } from "lucide-react";

export function SidebarHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-12 items-center justify-between px-4 border-b border-border lg:hidden shrink-0">
      <span className="font-bold text-sm tracking-tight text-foreground">
        Navigation
      </span>
      <button
        onClick={onClose}
        aria-label="Close navigation"
        className="p-1 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors duration-150"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
