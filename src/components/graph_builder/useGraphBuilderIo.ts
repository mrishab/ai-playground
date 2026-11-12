import { useState, useRef } from "react";
import { useGraphBuilder } from "./useGraphBuilder";
import { exportProblemJson, exportProblemXml, importProblemAny, triggerFileDownload } from "@/lib/problemIO";

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
      const rawNodes = Array.isArray(imported?.nodes)
        ? imported.nodes
        : Array.isArray(imported?.nodes?.node)
        ? imported.nodes.node
        : imported?.nodes?.node
        ? [imported.nodes.node]
        : [];
      if (rawNodes.length === 0) throw new Error("Invalid graph format: missing nodes array");

      const rawEdges = Array.isArray(imported?.edges)
        ? imported.edges
        : Array.isArray(imported?.edges?.edge)
        ? imported.edges.edge
        : imported?.edges?.edge
        ? [imported.edges.edge]
        : [];

      const normalizedNodes = rawNodes.map((n: any, idx: number) => ({
        id: String(n.id || `node-${idx + 1}`),
        label: String(n.label || n.id || `Node ${idx + 1}`),
        x: typeof n.x === "number" ? n.x : Number(n.x) || 100 + (idx % 5) * 80,
        y: typeof n.y === "number" ? n.y : Number(n.y) || 100 + Math.floor(idx / 5) * 80,
        isStart: Boolean(n.isStart),
        isGoal: Boolean(n.isGoal),
        heuristic: typeof n.heuristic === "number" ? n.heuristic : Number(n.heuristic) || 0,
      }));

      const normalizedEdges = rawEdges.map((e: any, idx: number) => ({
        id: String(e.id || `${e.from || e.source}-${e.to || e.target}-${idx}`),
        from: String(e.from || e.source || ""),
        to: String(e.to || e.target || ""),
        cost: typeof e.cost === "number" ? e.cost : Number(e.cost) || 1,
      }));

      gb.setGraph({
        id: imported.id || "custom",
        name: imported.name || "Custom Graph",
        description: imported.description || "Imported graph",
        startNode: imported.startNode || (normalizedNodes.find((n: any) => n.isStart)?.id || normalizedNodes[0]?.id || ""),
        goalNodes: Array.isArray(imported.goalNodes)
          ? imported.goalNodes
          : normalizedNodes.filter((n: any) => n.isGoal).map((n: any) => n.id),
        nodes: normalizedNodes,
        edges: normalizedEdges,
      });
      setIsImportModalOpen(false);
      setImportText("");
    } catch (err: any) { setImportError(err.message || "Failed to parse graph data."); }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { if (ev.target?.result) { setImportText(ev.target.result as string); setImportError(null); } };
    reader.readAsText(file);
    e.target.value = "";
  };

  return {
    isImportModalOpen, setIsImportModalOpen, importText, setImportText,
    importError, setImportError, fileInputRef, handleExport, handleApplyImport, handleFileUpload,
  };
}
