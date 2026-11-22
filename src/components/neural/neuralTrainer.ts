import { DataPoint } from "@/data/neuralProblems";
import { NeuralWeights, forwardPass, dSigmoid } from "./neuralMath";

function trainPerceptron(points: DataPoint[], weights: NeuralWeights, lr: number, mom: number) {
  let totalError = 0;
  for (const p of points) {
    const { output } = forwardPass(p.x, p.y, weights, "perceptron");
    const err = p.label - output;
    totalError += err * err;
    const delta = err * dSigmoid(output);
    const dw0 = lr * delta * p.x + mom * weights.prev_dw_p[0];
    const dw1 = lr * delta * p.y + mom * weights.prev_dw_p[1];
    const db = lr * delta + mom * weights.prev_db_p;
    weights.w_p[0] += dw0; weights.w_p[1] += dw1; weights.b_p += db;
    weights.prev_dw_p[0] = dw0; weights.prev_dw_p[1] = dw1; weights.prev_db_p = db;
  }
  return { mse: totalError / points.length };
}

export function trainEpochStep(
  points: DataPoint[], weights: NeuralWeights, lr: number, mom: number, algo: string = "mlp_sgd",
): { mse: number } {
  if (points.length === 0) return { mse: 0 };
  if (algo === "perceptron") return trainPerceptron(points, weights, lr, mom);
  let totalError = 0;
  for (const p of points) {
    const { hidden, output } = forwardPass(p.x, p.y, weights, "mlp_sgd");
    const err = p.label - output;
    totalError += err * err;
    const deltaOut = err * dSigmoid(output);
    const deltaHidden = [0, 1, 2, 3].map((j) => deltaOut * weights.w2[j] * dSigmoid(hidden[j]));
    for (let j = 0; j < 4; j++) {
      const dw = lr * deltaOut * hidden[j] + mom * weights.prev_dw2[j];
      weights.w2[j] += dw; weights.prev_dw2[j] = dw;
    }
    const db2 = lr * deltaOut + mom * weights.prev_db2;
    weights.b2 += db2; weights.prev_db2 = db2;
    for (let j = 0; j < 4; j++) {
      const dw0 = lr * deltaHidden[j] * p.x + mom * weights.prev_dw1[0][j];
      const dw1 = lr * deltaHidden[j] * p.y + mom * weights.prev_dw1[1][j];
      const db = lr * deltaHidden[j] + mom * weights.prev_db1[j];
      weights.w1[0][j] += dw0; weights.w1[1][j] += dw1; weights.b1[j] += db;
      weights.prev_dw1[0][j] = dw0; weights.prev_dw1[1][j] = dw1; weights.prev_db1[j] = db;
    }
  }
  return { mse: totalError / points.length };
}

export function checkNeuralConvergence(
  mse: number,
  pointsLength: number,
  convergedRef: { current: boolean },
  setIsPlaying: (p: boolean) => void,
): void {
  if (pointsLength > 0 && mse < 0.02 && !convergedRef.current) {
    setIsPlaying(false);
    convergedRef.current = true;
    import("canvas-confetti").then(({ default: confetti }) => confetti({ particleCount: 60, spread: 70 }));
  }
}
