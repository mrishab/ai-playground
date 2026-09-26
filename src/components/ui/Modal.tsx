import React from "react";
import { cn } from "@/lib/utils";
import { useModalLock } from "./useModalLock";
import { ModalHeader } from "./ModalHeader";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  useModalLock(isOpen, onClose);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        role="presentation"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onMouseDown={onClose}
      />
      {/* react-doctor-disable-next-line react-doctor/prefer-html-dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(e) => e.stopPropagation()}
        className={cn(
          "relative z-50 w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto",
          className,
        )}
      >
        <ModalHeader title={title} onClose={onClose} />
        {children}
      </div>
    </div>
  );
}
