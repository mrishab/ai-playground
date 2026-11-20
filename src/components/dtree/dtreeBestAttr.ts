import { calculateInformationGain } from "./dtreeMath";
import { DTreeExample } from "./dtreeTypes";

export function findBestSplitAttr(
  examples: DTreeExample[],
  availableAttrs: string[],
  target: string,
) {
  let bestAttr = availableAttrs[0];
  let maxGain = -1;
  for (const attr of availableAttrs) {
    const g = calculateInformationGain(examples, attr, target);
    if (g > maxGain) {
      maxGain = g;
      bestAttr = attr;
    }
  }
  return { bestAttr, maxGain };
}
