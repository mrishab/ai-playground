import { DataPoint } from "@/data/neuralProblems";
import { NeuralWeights, forwardPass, dSigmoid } from "./neuralMath";

export function trainEpochStep(
  points: DataPoint[],
  weights: NeuralWeights,
  learningRate: number,
  momentum: number,
): { mse: number } {
  if (points.length === 0) return { mse: 0 };
  let totalError = 0;

  for (const p of points) {
    const { hidden, output } = forwardPass(p.x, p.y, weights);
    const error = p.label - output;
    totalError += error * error;

    const deltaOut = error * dSigmoid(output);
    const deltaHidden: number[] = [];
    for (let j = 0; j < 4; j++) {
      deltaHidden.push(deltaOut * weights.w2[j] * dSigmoid(hidden[j]));
    }

    for (let j = 0; j < 4; j++) {
      const dw =
        learningRate * deltaOut * hidden[j] + momentum * weights.prev_dw2[j];
      weights.w2[j] += dw;
      weights.prev_dw2[j] = dw;
    }
    const db2 = learningRate * deltaOut + momentum * weights.prev_db2;
    weights.b2 += db2;
    weights.prev_db2 = db2;

    for (let j = 0; j < 4; j++) {
      const dw0 =
        learningRate * deltaHidden[j] * p.x + momentum * weights.prev_dw1[0][j];
      const dw1 =
        learningRate * deltaHidden[j] * p.y + momentum * weights.prev_dw1[1][j];
      weights.w1[0][j] += dw0;
      weights.w1[1][j] += dw1;
      weights.prev_dw1[0][j] = dw0;
      weights.prev_dw1[1][j] = dw1;

      const db = learningRate * deltaHidden[j] + momentum * weights.prev_db1[j];
      weights.b1[j] += db;
      weights.prev_db1[j] = db;
    }
  }

  return { mse: totalError / points.length };
}
