import { useState, useRef } from "react";
import { useGraphBuilder } from "./useGraphBuilder";
import { exportProblemJson, exportProblemXml, importProblemAny, triggerFileDownload } from "@/lib/problemIO";
import { normalizeImportedGraphData } from "./graphBuilderImportNormalize";

export function useGraphBuilderIo(gb: ReturnType<typeof useGraphBuilder>) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = (format: "json" | "xml") => {
    const isJson = format === "json";
    const content = isJson ? exportProblemJson(gb.graph, "search") : exportProblemXml(gb.graph, "search");
    triggerFileDownload(content, `${gb.graph.id || "custom-graph"}.${format}`, isJson ? "application/json" : "application/xml");
    if (typeof window !== "undefined") {
      (window as any).__lastExportedProblem = content;
      (window as any).__lastExportedFormat = format;
    }
  };

  const handleApplyImport = () => {
    if (!importText.trim()) return setImportError("Please provide XML or JSON graph content.");
    try {
      setImportError(null);
      const imported = importProblemAny(importText).problem;
      const normalizedGraph = normalizeImportedGraphData(imported);
      gb.setGraph(normalizedGraph);
      setIsImportModalOpen(false);
      setImportText("");
    } catch (err: any) {
      setImportError(err.message || "Failed to parse graph data.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setImportText(ev.target.result as string);
        setImportError(null);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return {
    isImportModalOpen, setIsImportModalOpen, importText, setImportText,
    importError, setImportError, fileInputRef, handleExport,
    handleApplyImport, handleFileUpload,
  };
}
