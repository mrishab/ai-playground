import {
  CandidateGain,
  ClassFrequencyMap,
  DTreeExample,
  AttributeSubsets,
} from "./dtreeTypes";

export function calculateEntropy(
  examples: DTreeExample[],
  target: string,
): number {
  if (examples.length === 0) return 0;
  const counts: ClassFrequencyMap = {};
  for (const ex of examples) counts[ex[target]] = (counts[ex[target]] || 0) + 1;
  let entropy = 0;
  for (const count of Object.values(counts)) {
    const p = count / examples.length;
    if (p > 0) entropy -= p * Math.log2(p);
  }
  return entropy;
}

export function calculateInformationGain(
  examples: DTreeExample[],
  attr: string,
  target: string,
): number {
  const baseEntropy = calculateEntropy(examples, target);
  const subsets: AttributeSubsets = {};
  for (const ex of examples) {
    const val = ex[attr];
    if (!subsets[val]) subsets[val] = [];
    subsets[val].push(ex);
  }
  let remainder = 0;
  for (const subset of Object.values(subsets)) {
    remainder +=
      (subset.length / examples.length) * calculateEntropy(subset, target);
  }
  return Math.max(0, baseEntropy - remainder);
}

export function computeCandidateGains(
  examples: DTreeExample[],
  usedAttrs: string[],
  attributes: string[],
  target: string,
): CandidateGain[] {
  const usedSet = new Set(usedAttrs);
  const candidates = attributes.filter((a) => !usedSet.has(a));
  const gains = candidates.map((a) => ({
    attr: a,
    gain: calculateInformationGain(examples, a, target),
  }));
  return gains.sort((a, b) => b.gain - a.gain);
}
