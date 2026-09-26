export interface VeFactorRow {
  assignment: Record<string, string>;
  value: number;
}

export interface VeFactor {
  id: string;
  name: string;
  variables: string[];
  table: VeFactorRow[];
}

export interface VeStepSnapshot {
  stepIndex: number;
  action: string;
  targetVar?: string;
  factors: VeFactor[];
  description: string;
  intermediateFactor?: VeFactor;
  normalizedResult?: Record<string, number>;
}
