import React from "react";
import { Upload, X } from "lucide-react";
import { Button } from "../../ui/Button";

export function ProblemImportModalHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-border p-4 pb-3 shrink-0">
      <div className="flex items-center gap-2">
        <Upload className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Import Problem (XML / JSON)</h3>
      </div>
      <Button variant="ghost" size="sm" data-testid="import-cancel-btn" onClick={onClose} className="h-7 w-7 p-0 transition-colors duration-150">
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}
