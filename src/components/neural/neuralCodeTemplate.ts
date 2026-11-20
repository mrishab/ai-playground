import { DataPoint } from "@/data/neuralProblems";

export function getNeuralCodeTemplate(points?: DataPoint[], algorithm: string = "mlp_sgd"): string {
  if (algorithm === "perceptron") {
    return `// Single-Layer Perceptron (SLP) Reference Algorithm
function trainPerceptron(points, lr = 0.1, epochs = 50) {
  let w = [0.0, 0.0], b = 0.0;
  for (let ep = 0; ep < epochs; ep++) {
    for (const p of points) {
      const pred = (p.x * w[0] + p.y * w[1] + b) >= 0 ? 1 : 0;
      const err = p.label - pred;
      w[0] += lr * err * p.x;
      w[1] += lr * err * p.y;
      b += lr * err;
    }
  }
  return { weights: w, bias: b, algorithm: "Perceptron" };
}
`;
  }

  return `// Multi-Layer Perceptron (2-4-1) with Backpropagation Reference Algorithm
function trainMLP(points, epochs = 200, lr = 0.3) {
  function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
  function dSigmoid(y) { return y * (1 - y); }
  let w1 = [[0.2, -0.3, 0.4, -0.1], [-0.5, 0.1, -0.2, 0.6]], w2 = [0.5, -0.4, 0.6, -0.2];

  for (let ep = 0; ep < epochs; ep++) {
    for (const p of points) {
      const h = [0, 1, 2, 3].map(j => sigmoid(p.x * w1[0][j] + p.y * w1[1][j]));
      const out = sigmoid(h.reduce((acc, v, j) => acc + v * w2[j], 0));
      const deltaOut = (p.label - out) * dSigmoid(out);
      h.forEach((hj, j) => w2[j] += lr * deltaOut * hj);
    }
  }
  return { success: true, algorithm: "MLP (Backprop)" };
}
`;
}
