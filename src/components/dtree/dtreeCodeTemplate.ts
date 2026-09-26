import { DTreeDataset } from "@/data/dtreeProblems";

export function getDTreeCodeTemplate(dataset: DTreeDataset): string {
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
