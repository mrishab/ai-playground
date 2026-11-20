import React from "react";
import { Copy, Check, FileJson, FileCode, X } from "lucide-react";
import { Button } from "../../ui/Button";

interface Props {
  content: string;
  format: "json" | "xml";
  copied: boolean;
  onCopy: () => void;
  onClose: () => void;
}

export function ProblemExportModal({ content, format, copied, onCopy, onClose }: Props) {
  return (
    <div data-testid="exported-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-card border border-border rounded-xl shadow-xl max-w-xl w-full p-4 flex flex-col gap-3 transition-[opacity,transform] animate-in zoom-in-95 slide-in-from-bottom-2 duration-200 ease-out">
        <div className="flex items-center justify-between border-b border-border pb-2.5">
          <div className="flex items-center gap-2">
            {format === "json" ? <FileJson className="w-4 h-4 text-primary" /> : <FileCode className="w-4 h-4 text-primary" />}
            <h3 className="text-sm font-semibold text-foreground">Exported {format.toUpperCase()} Problem</h3>
          </div>
          <Button variant="ghost" size="sm" data-testid="close-exported-modal" onClick={onClose} className="h-7 w-7 p-0 transition-colors duration-150">
            <X className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">File exported. Copy or review data below:</p>
        <textarea
          readOnly
          aria-label="Exported problem content"
          data-testid="last-exported-output"
          value={content}
          rows={8}
          className="w-full text-xs font-mono bg-muted/40 p-2.5 rounded-lg border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors duration-150 resize-y"
        />
        <div className="flex items-center justify-end gap-2 pt-1">
          <Button variant="outline" size="sm" data-testid="copy-exported-btn" onClick={onCopy} className="gap-1.5 text-xs transition-colors duration-150">
            {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy to Clipboard"}</span>
          </Button>
          <Button variant="default" size="sm" onClick={onClose} className="text-xs transition-colors duration-150">Done</Button>
        </div>
      </div>
    </div>
  );
}
