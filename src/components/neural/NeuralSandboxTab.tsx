import React from "react";
import { CodeSandbox } from "@/components/CodeSandbox";
import { DataPoint } from "@/data/neuralProblems";

export function NeuralSandboxTab({ points }: { points: DataPoint[] }) {
  const codeTemplate = `// Multi-Layer Perceptron (2-4-1) with Backpropagation
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

const res = trainMLP(${JSON.stringify(points.slice(0, 6))}, 100);
return JSON.stringify(res, null, 2);
`;

  return (
    <CodeSandbox
      title="Backpropagation Sandbox"
      algorithmName="Backpropagation (SGD)"
      initialCode={codeTemplate}
      notes="Backpropagation computes gradient updates across layer weights."
      onRun={(code) => {
        try {
          // react-doctor-disable-next-line react-doctor/no-eval
          const func = new Function(code);
          const out = func();
          return {
            success: true,
            output:
              typeof out === "string" ? out : JSON.stringify(out, null, 2),
          };
        } catch (e: any) {
          return { success: false, output: e.message };
        }
      }}
    />
  );
}
