import { DataPoint } from "@/data/neuralProblems";

export interface NeuralWeights {
  w1: number[][]; b1: number[]; w2: number[]; b2: number;
  prev_dw1: number[][]; prev_db1: number[]; prev_dw2: number[]; prev_db2: number;
  w_p: [number, number]; b_p: number; prev_dw_p: [number, number]; prev_db_p: number;
}

export const sigmoid = (x: number) => 1.0 / (1.0 + Math.exp(-Math.max(-15, Math.min(15, x))));
export const dSigmoid = (y: number) => y * (1.0 - y);

const rx1 = () => (Math.random() * 2 - 1) * 1.0;
const rx2 = () => (Math.random() * 2 - 1) * 1.095;
const rb = () => (Math.random() * 2 - 1) * 0.1;
const rp = () => (Math.random() * 2 - 1) * 0.5;

export function createInitialWeights(): NeuralWeights {
  return {
    w1: [[rx1(), rx1(), rx1(), rx1()], [rx1(), rx1(), rx1(), rx1()]],
    b1: [rb(), rb(), rb(), rb()],
    w2: [rx2(), rx2(), rx2(), rx2()],
    b2: rb(),
    prev_dw1: [[0, 0, 0, 0], [0, 0, 0, 0]],
    prev_db1: [0, 0, 0, 0],
    prev_dw2: [0, 0, 0, 0],
    prev_db2: 0,
    w_p: [rp(), rp()],
    b_p: 0,
    prev_dw_p: [0, 0],
    prev_db_p: 0,
  };
}

export function forwardPass(x: number, y: number, weights: NeuralWeights, algo: string = "mlp_sgd") {
  if (algo === "perceptron") {
    return { hidden: [], output: sigmoid(x * weights.w_p[0] + y * weights.w_p[1] + weights.b_p) };
  }
  const { w1, b1, w2, b2 } = weights;
  const hidden: number[] = [];
  for (let j = 0; j < 4; j++) hidden.push(sigmoid(x * w1[0][j] + y * w1[1][j] + b1[j]));
  let outZ = b2;
  for (let j = 0; j < 4; j++) outZ += hidden[j] * w2[j];
  return { hidden, output: sigmoid(outZ) };
}

export function computeDatasetMse(points: DataPoint[], weights: NeuralWeights, algo: string = "mlp_sgd"): number {
  if (points.length === 0) return 0;
  let totalError = 0;
  for (const p of points) {
    const { output } = forwardPass(p.x, p.y, weights, algo);
    const err = p.label - output;
    totalError += err * err;
  }
  return totalError / points.length;
}
