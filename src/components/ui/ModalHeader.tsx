import React from "react";
import { X } from "lucide-react";

export function ModalHeader({
  title,
  onClose,
}: {
  title?: string;
  onClose: () => void;
}) {
  if (!title) return null;
  return (
    <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
      <h3 id="modal-title" className="text-lg font-semibold tracking-tight">
        {title}
      </h3>
      <button
        onClick={onClose}
        aria-label="Close dialog"
        className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors duration-150 active:scale-[0.95]"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
