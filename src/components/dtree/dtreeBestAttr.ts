import { computeCandidateMetric } from "./dtreeMath";
import { DTreeExample, DTreeAlgorithm } from "./dtreeTypes";

export function findBestSplitAttr(
  examples: DTreeExample[],
  availableAttrs: string[],
  target: string,
  algo: DTreeAlgorithm = "id3",
) {
  let bestAttr = availableAttrs[0];
  let maxGain = -1;
  for (const attr of availableAttrs) {
    const g = computeCandidateMetric(examples, attr, target, algo);
    if (g > maxGain) {
      maxGain = g;
      bestAttr = attr;
    }
  }
  return { bestAttr, maxGain };
}
