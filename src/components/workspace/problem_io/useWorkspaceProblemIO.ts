import { useState, useRef } from "react";
import { ProblemExportData } from "../workspaceTypes";
import { exportProblemJson, exportProblemXml, importProblemAny, triggerFileDownload } from "@/lib/problemIO";

export interface UseProblemIOProps {
  exportData?: ProblemExportData;
  onImportProblem?: (imported: { toolType?: string; problem: any; format: "json" | "xml" }) => void;
}

export function useWorkspaceProblemIO({ exportData, onImportProblem }: UseProblemIOProps) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [exportedContent, setExportedContent] = useState<string | null>(null);
  const [exportedFormat, setExportedFormat] = useState<"json" | "xml">("json");
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = (format: "json" | "xml") => {
    if (!exportData) return;
    const baseName = exportData.filename || `${exportData.toolType}-problem`;
    const isJson = format === "json";
    const content = isJson ? exportProblemJson(exportData.problem, exportData.toolType) : exportProblemXml(exportData.problem, exportData.toolType);
    triggerFileDownload(content, `${baseName}.${format}`, isJson ? "application/json" : "application/xml");
    setExportedContent(content);
    setExportedFormat(format);
    if (typeof window !== "undefined") {
      (window as any).__lastExportedProblem = content;
      (window as any).__lastExportedFormat = format;
    }
  };

  const handleCopy = () => {
    if (!exportedContent) return;
    navigator.clipboard?.writeText(exportedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyImport = () => {
    if (!importText.trim()) return setImportError("Please paste or upload XML or JSON problem data.");
    try {
      setImportError(null);
      const parsed = importProblemAny(importText);
      if (exportData?.toolType && parsed.toolType && parsed.toolType !== "generic" && parsed.toolType !== exportData.toolType) {
        throw new Error(`Imported data is for "${parsed.toolType}", but this workspace expects a "${exportData.toolType}" problem.`);
      }
      onImportProblem?.(parsed);
      setIsImportModalOpen(false);
      setImportText("");
    } catch (err: any) { setImportError(err.message || "Failed to parse problem data."); }
  };

  return {
    isImportModalOpen, setIsImportModalOpen, exportedContent, setExportedContent,
    exportedFormat, importText, setImportText, importError, setImportError,
    copied, fileInputRef, handleExport, handleCopy, handleApplyImport,
  };
}
