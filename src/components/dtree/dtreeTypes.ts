export interface ClassFrequencyMap {
  [className: string]: number;
}
export interface DTreeExample {
  [attributeName: string]: string;
}
export interface AttributeSubsets {
  [attributeValue: string]: DTreeExample[];
}

export interface TreeNode {
  id: string;
  attribute?: string;
  isLeaf: boolean;
  prediction?: string;
  classCounts: ClassFrequencyMap;
  entropy: number;
  children: { value: string; node: TreeNode }[];
  examples?: DTreeExample[];
  availableAttrs?: string[];
}

export interface CandidateGain {
  attr: string;
  gain: number;
}
