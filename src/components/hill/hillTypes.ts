import { CSPProblem } from "@/data/cspProblems";

export type SLSAlgorithm =
  "greedy" | "min_conflicts" | "random_walk" | "annealing" | "tabu";

export interface BatchResult {
  trials: number;
  successes: number;
  avgSteps: number;
  stepDistribution: number[];
}

export interface TabuItem {
  varName: string;
  val: string;
}

export interface HillAlgorithmSpecificSlidersProps {
  algorithm: SLSAlgorithm;
  randomWalkProb: number;
  setRandomWalkProb: (v: number) => void;
  temperature: number;
  setTemperature: (v: number) => void;
  tabuTenure: number;
  setTabuTenure: (v: number) => void;
}

export interface VariableAssignment {
  [variableName: string]: string;
}

export interface HillStepperArgs {
  problem: CSPProblem;
  assignment: VariableAssignment;
  conflicts: number;
  tabuList: TabuItem[];
  algorithm: SLSAlgorithm;
  randomWalkProb: number;
  temperature: number;
  tabuTenure: number;
  setIsPlaying: (v: boolean) => void;
  applyStepResult: (res: any) => void;
}

export interface SLSStepContext {
  problem: CSPProblem;
  assignment: VariableAssignment;
  conflicts: number;
  algorithm: SLSAlgorithm;
  randomWalkProb: number;
  temperature: number;
  tabuList: TabuItem[];
  tabuTenure: number;
}
