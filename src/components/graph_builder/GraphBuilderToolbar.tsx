import React from "react";
import { Download, Upload, RotateCcw, FileCode } from "lucide-react";
import { Button } from "../ui/Button";
import { useGraphBuilder } from "./useGraphBuilder";
import { BLANK_GRAPH } from "./graphBuilderPresets";
import { GraphBuilderModeControls } from "./GraphBuilderModeControls";
import { GraphBuilderPresetSelect } from "./GraphBuilderPresetSelect";
import { GraphBuilderIoModal } from "./GraphBuilderIoModal";
import { useGraphBuilderIo } from "./useGraphBuilderIo";

export function GraphBuilderToolbar({ gb, onSolveGraph }: { gb: ReturnType<typeof useGraphBuilder>; onSolveGraph?: () => void }) {
  const io = useGraphBuilderIo(gb);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-card border-b border-border text-xs">
      <GraphBuilderModeControls mode={gb.mode} setMode={gb.setMode} />
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 border-l border-r border-border px-2">
          <Button size="sm" variant="outline" data-testid="gb-export-json" onClick={() => io.handleExport("json")} className="gap-1 h-8 px-2"><Download className="w-3 h-3 text-primary" /><span>JSON</span></Button>
          <Button size="sm" variant="outline" data-testid="gb-export-xml" onClick={() => io.handleExport("xml")} className="gap-1 h-8 px-2"><FileCode className="w-3 h-3 text-primary" /><span>XML</span></Button>
          <Button size="sm" variant="outline" data-testid="gb-reset-btn" onClick={() => gb.setGraph(BLANK_GRAPH)} className="gap-1 h-8 px-2"><RotateCcw className="w-3 h-3 text-muted-foreground" /><span>Reset</span></Button>
          <Button size="sm" variant="outline" data-testid="gb-import-btn" onClick={() => { io.setIsImportModalOpen(true); io.setImportError(null); }} className="gap-1 h-8 px-2"><Upload className="w-3 h-3 text-primary" /><span>Import</span></Button>
        </div>
        <GraphBuilderPresetSelect onSetGraph={gb.setGraph} onSolveGraph={onSolveGraph} />
      </div>
      <input type="file" ref={io.fileInputRef} accept=".json,.xml,text/xml,application/json" onChange={io.handleFileUpload} data-testid="gb-file-input" className="hidden" />
      <GraphBuilderIoModal isOpen={io.isImportModalOpen} onClose={() => io.setIsImportModalOpen(false)} importText={io.importText} setImportText={io.setImportText} importError={io.importError} onChooseFile={() => io.fileInputRef.current?.click()} onLoadLast={() => { if (typeof window !== "undefined" && (window as any).__lastExportedProblem) { io.setImportText((window as any).__lastExportedProblem); io.setImportError(null); } }} onApply={io.handleApplyImport} />
    </div>
  );
}
