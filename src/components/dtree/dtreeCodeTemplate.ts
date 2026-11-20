import { DTreeDataset } from "@/data/dtreeProblems";

export function getDTreeCodeTemplate(dataset: DTreeDataset, algo: string = "id3"): string {
  if (algo === "c45") {
    return `// C4.5 Decision Tree Induction (Gain Ratio)
function c45(examples, attributes, target) {
  function splitInfo(rows, attr) {
    const groups = {};
    rows.forEach(r => groups[r[attr]] = (groups[r[attr]] || 0) + 1);
    return Object.values(groups).reduce((acc, count) => {
      const p = count / rows.length;
      return acc - p * Math.log2(p);
    }, 0);
  }
  // Select attribute maximizing GainRatio = InfoGain(S, A) / SplitInfo(S, A)
  return attributes.map(a => ({ attribute: a, metric: "GainRatio" }));
}
`;
  }

  if (algo === "cart") {
    return `// CART Decision Tree Induction (Gini Impurity)
function cart(examples, attributes, target) {
  function gini(rows) {
    const counts = {};
    rows.forEach(r => counts[r[target]] = (counts[r[target]] || 0) + 1);
    const sumSq = Object.values(counts).reduce((acc, c) => acc + Math.pow(c / rows.length, 2), 0);
    return 1 - sumSq;
  }
  // Select attribute maximizing GiniReduction = Gini(S) - sum (|Sv|/|S|)*Gini(Sv)
  return attributes.map(a => ({ attribute: a, metric: "GiniReduction" }));
}
`;
  }

  return `// ID3 Decision Tree Induction
function id3(examples, attributes, target) {
  function entropy(rows) {
    const counts = {};
    rows.forEach(r => counts[r[target]] = (counts[r[target]] || 0) + 1);
    return Object.values(counts).reduce((ent, count) => {
      const p = count / rows.length;
      return ent - p * Math.log2(p);
    }, 0);
  }

  function infoGain(rows, attr) {
    const baseEnt = entropy(rows);
    const groups = {};
    rows.forEach(r => {
      groups[r[attr]] = groups[r[attr]] || [];
      groups[r[attr]].push(r);
    });
    const rem = Object.values(groups).reduce((acc, g) => acc + (g.length / rows.length) * entropy(g), 0);
    return baseEnt - rem;
  }

  // Calculate gains for each candidate feature
  const gains = attributes.map(a => ({ attribute: a, gain: infoGain(examples, a) }));
  gains.sort((a, b) => b.gain - a.gain);
  return gains;
}

const gains = id3(${JSON.stringify(dataset.examples)}, ${JSON.stringify(dataset.attributes)}, "${dataset.target}");
return JSON.stringify(gains, null, 2);
`;
}
