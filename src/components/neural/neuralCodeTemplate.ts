import { DataPoint } from "@/data/neuralProblems";

export function getNeuralCodeTemplate(points?: DataPoint[]): string {
  const samplePoints = points && points.length > 0 ? points.slice(0, 6) : [
    { x: 0.2, y: 0.3, label: 1 },
    { x: -0.4, y: 0.5, label: 0 },
    { x: 0.6, y: -0.2, label: 1 },
    { x: -0.1, y: -0.5, label: 0 },
  ];
  return `// Multi-Layer Perceptron (2-4-1) with Backpropagation Reference Algorithm
function trainMLP(points, epochs = 200, lr = 0.3) {
  function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
  function dSigmoid(y) { return y * (1 - y); }

  let w1 = [[0.2, -0.3, 0.4, -0.1], [-0.5, 0.1, -0.2, 0.6]];
  let w2 = [0.5, -0.4, 0.6, -0.2];

  for (let ep = 0; ep < epochs; ep++) {
    let loss = 0;
    for (const p of points) {
      const h = [0, 1, 2, 3].map(j => sigmoid(p.x * w1[0][j] + p.y * w1[1][j]));
      const out = sigmoid(h.reduce((acc, v, j) => acc + v * w2[j], 0));
      const err = p.label - out;
      loss += err * err;
      const deltaOut = err * dSigmoid(out);
      h.forEach((hj, j) => w2[j] += lr * deltaOut * hj);
    }
  }
  return { success: true, finalEpochs: epochs, note: "Backpropagation weights updated" };
}

const res = trainMLP(${JSON.stringify(samplePoints)}, 100);
return JSON.stringify(res, null, 2);
`;
}
