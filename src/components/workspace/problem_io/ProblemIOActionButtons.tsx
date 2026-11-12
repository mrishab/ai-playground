import React from "react";
import { Download, Upload, RotateCcw, FileCode } from "lucide-react";
import { Button } from "../../ui/Button";

interface Props {
  hasExport: boolean;
  hasReset: boolean;
  hasImport: boolean;
  onExport: (format: "json" | "xml") => void;
  onReset?: () => void;
  onOpenImport: () => void;
}

export function ProblemIOActionButtons({ hasExport, hasReset, hasImport, onExport, onReset, onOpenImport }: Props) {
  return (
    <>
      {hasExport && (
        <div className="relative">
          <div className="flex items-center rounded-lg border border-border bg-card shadow-xs">
            <Button variant="outline" size="sm" onClick={() => onExport("json")} data-testid="export-json-btn" title="Export Problem as JSON" className="rounded-r-none border-r-0 text-xs px-2.5 h-8 font-medium gap-1">
              <Download className="w-3.5 h-3.5 text-primary" /><span>Export JSON</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => onExport("xml")} data-testid="export-xml-btn" title="Export Problem as XML" className="rounded-l-none text-xs px-2.5 h-8 font-medium gap-1">
              <FileCode className="w-3.5 h-3.5 text-secondary-foreground" /><span>XML</span>
            </Button>
          </div>
        </div>
      )}
      {hasReset && (
        <Button variant="outline" size="sm" onClick={onReset} data-testid="reset-problem-btn" title="Reset / Clear Problem" className="text-xs px-2.5 h-8 font-medium gap-1">
          <RotateCcw className="w-3.5 h-3.5 text-amber-500" /><span>Reset Problem</span>
        </Button>
      )}
      {hasImport && (
        <Button variant="outline" size="sm" onClick={onOpenImport} data-testid="import-problem-btn" title="Import Problem (JSON or XML)" className="text-xs px-2.5 h-8 font-medium gap-1">
          <Upload className="w-3.5 h-3.5 text-emerald-500" /><span>Import</span>
        </Button>
      )}
    </>
  );
}
