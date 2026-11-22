import React from "react";
import { Upload } from "lucide-react";
import { Button } from "../../ui/Button";
import { ProblemImportModalHeader } from "./ProblemImportModalHeader";

interface Props {
  text: string;
  setText: (v: string) => void;
  error: string | null;
  onChooseFile: () => void;
  onLoadLast: () => void;
  onApply: () => void;
  onClose: () => void;
}

export function ProblemImportModal({ text, setText, error, onChooseFile, onLoadLast, onApply, onClose }: Props) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div data-testid="import-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-card border border-border rounded-xl shadow-xl max-w-xl w-full flex flex-col my-auto max-h-[90vh] overflow-hidden transition-[opacity,transform] animate-in zoom-in-95 slide-in-from-bottom-2 duration-200 ease-out">
        <ProblemImportModalHeader onClose={onClose} />
        <div className="p-4 flex flex-col gap-3 overflow-y-auto">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" data-testid="choose-file-btn" onClick={onChooseFile} className="gap-1.5 text-xs transition-colors duration-150">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload File (.json / .xml)</span>
            </Button>
            <Button variant="ghost" size="sm" data-testid="load-last-exported-btn" onClick={onLoadLast} className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">
              Paste Last Export
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="problem-import-textarea" className="text-[11px] font-medium text-muted-foreground">JSON or XML data:</label>
            <textarea
              id="problem-import-textarea"
              aria-label="Paste XML or JSON problem data"
              data-testid="problem-import-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste XML or JSON problem data..."
              rows={9}
              className="w-full text-xs font-mono bg-muted/40 p-2.5 rounded-lg border border-border text-foreground focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-150 resize-y"
            />
          </div>
          {error && <div data-testid="import-error-msg" className="text-xs text-destructive bg-destructive/10 border border-destructive/20 p-2 rounded-lg">{error}</div>}
        </div>
        <div className="flex items-center justify-end gap-2 p-4 pt-3 border-t border-border shrink-0 bg-secondary/20">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-xs transition-colors duration-150">Cancel</Button>
          <Button variant="default" size="sm" data-testid="problem-import-submit" onClick={onApply} disabled={!text.trim()} className="text-xs transition-colors duration-150">Apply Import</Button>
        </div>
      </div>
    </div>
  );
}
