import React from "react";
import { ProblemExportData } from "./workspaceTypes";
import { useWorkspaceProblemIO } from "./problem_io/useWorkspaceProblemIO";
import { ProblemExportModal } from "./problem_io/ProblemExportModal";
import { ProblemImportModal } from "./problem_io/ProblemImportModal";
import { ProblemIOActionButtons } from "./problem_io/ProblemIOActionButtons";

interface WorkspaceProblemIOProps {
  exportData?: ProblemExportData;
  onImportProblem?: (imported: { toolType?: string; problem: any; format: "json" | "xml" }) => void;
  onResetProblem?: () => void;
}

export function WorkspaceProblemIO({ exportData, onImportProblem, onResetProblem }: WorkspaceProblemIOProps) {
  const io = useWorkspaceProblemIO({ exportData, onImportProblem });
  if (!exportData && !onImportProblem && !onResetProblem) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        io.setImportText(text);
        io.setImportError(null);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleLoadLast = () => {
    if (typeof window !== "undefined" && (window as any).__lastExportedProblem) {
      io.setImportText((window as any).__lastExportedProblem);
      io.setImportError(null);
    }
  };

  return (
    <div className="flex items-center gap-1.5 relative">
      <ProblemIOActionButtons
        hasExport={Boolean(exportData)}
        hasReset={Boolean(onResetProblem)}
        hasImport={Boolean(onImportProblem)}
        onExport={io.handleExport}
        onReset={onResetProblem}
        onOpenImport={() => { io.setIsImportModalOpen(true); io.setImportError(null); }}
      />
      <input type="file" ref={io.fileInputRef} accept=".json,.xml,text/xml,application/json" onChange={handleFileUpload} data-testid="problem-file-input" className="hidden" />
      {io.exportedContent && <ProblemExportModal content={io.exportedContent} format={io.exportedFormat} copied={io.copied} onCopy={io.handleCopy} onClose={() => io.setExportedContent(null)} />}
      {io.isImportModalOpen && <ProblemImportModal text={io.importText} setText={io.setImportText} error={io.importError} onChooseFile={() => io.fileInputRef.current?.click()} onLoadLast={handleLoadLast} onApply={io.handleApplyImport} onClose={() => { io.setIsImportModalOpen(false); io.setImportError(null); }} />}
    </div>
  );
}
