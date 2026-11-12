import React from "react";

export type WorkspacePane = "animation" | "graph_builder" | "coding" | "log" | "theory";

export interface PrebuiltItem { id: string; label: string; description?: string; badge?: string; }
export interface AlgorithmItem { id: string; label: string; description?: string; badge?: string; }
export interface StatBadge { label: string; value: string | number; variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "purple" | "cyan"; }
export interface ProblemExportData { toolType: string; problem: any; filename?: string; }

export interface WorkspaceControlsConfig {
  onStep?: () => void;
  stepLabel?: string;
  onStepBack?: () => void;
  hasStepBack?: boolean;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onReset?: () => void;
  speed?: number;
  setSpeed?: (s: number) => void;
  isDone?: boolean;
  canStep?: boolean;
  extraActions?: React.ReactNode;
}

export interface StudioWorkspaceProps {
  title: string;
  category: string;
  description?: string;
  prebuiltLabel?: string;
  prebuiltItems: PrebuiltItem[];
  selectedPrebuiltId: string;
  onSelectPrebuiltId: (id: string) => void;
  algorithmItems?: AlgorithmItem[];
  selectedAlgorithmId?: string;
  onSelectAlgorithmId?: (id: string) => void;
  controls?: WorkspaceControlsConfig;
  animationSlot: React.ReactNode;
  graphBuilderSlot?: React.ReactNode;
  codingSlot?: React.ReactNode;
  logSlot?: React.ReactNode;
  theorySlot?: React.ReactNode;
  inspectorSlot?: React.ReactNode;
  stateSlot?: React.ReactNode;
  activeLogMessage?: string;
  statsBadges?: StatBadge[];
  activePane?: WorkspacePane;
  onPaneChange?: (p: WorkspacePane) => void;
  onOpenGraphBuilder?: () => void;
  exportData?: ProblemExportData;
  onImportProblem?: (imported: { toolType?: string; problem: any; format: "json" | "xml" }) => void;
  onResetProblem?: () => void;
}
