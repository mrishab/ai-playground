import React from "react";
import { Upload, X } from "lucide-react";
import { Button } from "../ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  importText: string;
  setImportText: (t: string) => void;
  importError: string | null;
  onChooseFile: () => void;
  onLoadLast: () => void;
  onApply: () => void;
}

export function GraphBuilderIoModal({ isOpen, onClose, importText, setImportText, importError, onChooseFile, onLoadLast, onApply }: Props) {
  if (!isOpen) return null;
  return (
    <div data-testid="gb-import-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-card border border-border rounded-xl shadow-xl max-w-lg w-full p-4 flex flex-col gap-3 transition-[opacity,transform] animate-in zoom-in-95 slide-in-from-bottom-2 duration-200 ease-out">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">Import Graph (XML / JSON)</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0 transition-colors duration-150"><X className="w-4 h-4" /></Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onChooseFile} className="text-xs gap-1 transition-colors duration-150">
            <Upload className="w-3.5 h-3.5" /><span>Upload File (.json / .xml)</span>
          </Button>
          <Button variant="ghost" size="sm" data-testid="gb-load-last-exported-btn" onClick={onLoadLast} className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150">
            Paste Last Export
          </Button>
        </div>
        <textarea
          aria-label="Paste XML or JSON graph data"
          data-testid="gb-import-textarea"
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder="Paste XML or JSON graph data..."
          rows={8}
          className="w-full text-xs font-mono bg-muted/40 p-2.5 rounded-lg border border-border text-foreground focus:ring-1 focus:ring-primary focus:outline-none transition-colors duration-150 resize-y"
        />
        {importError && <div className="text-xs text-destructive bg-destructive/10 border border-destructive/20 p-2 rounded-lg">{importError}</div>}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
          <Button variant="ghost" size="sm" onClick={onClose} className="transition-colors duration-150">Cancel</Button>
          <Button variant="default" size="sm" data-testid="gb-import-submit" onClick={onApply} disabled={!importText.trim()} className="transition-colors duration-150">Apply Import</Button>
        </div>
      </div>
    </div>
  );
}
