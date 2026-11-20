import { DTreeExample, ClassFrequencyMap, AttributeSubsets, DTreeAlgorithm } from "./dtreeTypes";
import { calculateEntropy, calculateInformationGain } from "./dtreeMath";

export function calculateSplitInfo(examples: DTreeExample[], attr: string): number {
  if (examples.length === 0) return 0;
  const subsets: AttributeSubsets = {};
  for (const ex of examples) {
    const val = ex[attr];
    if (!subsets[val]) subsets[val] = [];
    subsets[val].push(ex);
  }
  let splitInfo = 0;
  for (const subset of Object.values(subsets)) {
    const p = subset.length / examples.length;
    if (p > 0) splitInfo -= p * Math.log2(p);
  }
  return splitInfo;
}

export function calculateGainRatio(examples: DTreeExample[], attr: string, target: string): number {
  const gain = calculateInformationGain(examples, attr, target);
  const splitInfo = calculateSplitInfo(examples, attr);
  return splitInfo <= 1e-9 ? 0 : gain / splitInfo;
}

export function calculateGini(examples: DTreeExample[], target: string): number {
  if (examples.length === 0) return 0;
  const counts: ClassFrequencyMap = {};
  for (const ex of examples) counts[ex[target]] = (counts[ex[target]] || 0) + 1;
  let sumSq = 0;
  for (const count of Object.values(counts)) {
    const p = count / examples.length;
    sumSq += p * p;
  }
  return Math.max(0, 1 - sumSq);
}

export function calculateGiniReduction(examples: DTreeExample[], attr: string, target: string): number {
  const baseGini = calculateGini(examples, target);
  const subsets: AttributeSubsets = {};
  for (const ex of examples) {
    const val = ex[attr];
    if (!subsets[val]) subsets[val] = [];
    subsets[val].push(ex);
  }
  let remainder = 0;
  for (const subset of Object.values(subsets)) {
    remainder += (subset.length / examples.length) * calculateGini(subset, target);
  }
  return Math.max(0, baseGini - remainder);
}

export function getMetricLabel(algo: string = "id3") {
  if (algo === "c45") return { fullName: "Gain Ratio", shortName: "Gain Ratio" };
  if (algo === "cart") return { fullName: "Gini Reduction", shortName: "Gini Red." };
  return { fullName: "Information Gain", shortName: "Gain" };
}
