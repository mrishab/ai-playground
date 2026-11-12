import React from "react";
import { Upload, X } from "lucide-react";
import { Button } from "../../ui/Button";

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
  return (
    <div data-testid="import-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-card border border-border rounded-xl shadow-xl max-w-xl w-full p-4 flex flex-col gap-3 transition-[opacity,transform] animate-in zoom-in-95 slide-in-from-bottom-2 duration-200 ease-out">
        <div className="flex items-center justify-between border-b border-border pb-2.5">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Import Problem (XML / JSON)</h3>
          </div>
          <Button variant="ghost" size="sm" data-testid="import-cancel-btn" onClick={onClose} className="h-7 w-7 p-0 transition-colors duration-150">
            <X className="w-4 h-4" />
          </Button>
        </div>
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
        <div className="flex items-center justify-end gap-2 pt-1 border-t border-border">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-xs transition-colors duration-150">Cancel</Button>
          <Button variant="default" size="sm" data-testid="problem-import-submit" onClick={onApply} disabled={!text.trim()} className="text-xs transition-colors duration-150">Apply Import</Button>
        </div>
      </div>
    </div>
  );
}
