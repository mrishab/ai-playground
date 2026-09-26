import { CSPConstraint, CSPProblem } from "@/data/cspProblems";

export interface ArcItem {
  varName: string;
  constraint: CSPConstraint;
}

export interface SplitTreeNode {
  id: string;
  varName: string;
  value: string;
  parent: string | null;
  status: "active" | "solved" | "failed";
}

export interface VariableDomains {
  [variableName: string]: string[];
}

export interface DomainBackup {
  id: string;
  domains: VariableDomains;
}

export interface ConstraintStepButtonsProps {
  arcQueueLength: number;
  isPlaying: boolean;
  hasBackups: boolean;
  onFineStep: () => void;
  onToggleAutoAC: () => void;
  onBacktrack: () => void;
  onReset: () => void;
}

export interface ConstraintGraphSvgProps {
  problem: CSPProblem;
  domains: VariableDomains;
  currentArc: ArcItem | null;
  arcQueueLength: number;
  activeSplitId: string | null;
  log: string;
  hasDomainWipeout: boolean;
  isCSPFullySolved: boolean;
}

export interface FineStepResult {
  updatedQueue: ArcItem[];
  updatedDomains: VariableDomains;
  currentArc: ArcItem | null;
  log: string;
  isWipeout: boolean;
  done: boolean;
}
