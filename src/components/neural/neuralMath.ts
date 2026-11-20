export interface NeuralWeights {
  w1: number[][];
  b1: number[];
  w2: number[];
  b2: number;
  prev_dw1: number[][];
  prev_db1: number[];
  prev_dw2: number[];
  prev_db2: number;
}

const sigmoid = (x: number) =>
  1.0 / (1.0 + Math.exp(-Math.max(-15, Math.min(15, x))));
export const dSigmoid = (y: number) => y * (1.0 - y);

const rand4 = () => Array.from({ length: 4 }, () => Math.random() - 0.5);

export function createInitialWeights(): NeuralWeights {
  return {
    w1: [rand4(), rand4()],
    b1: [0, 0, 0, 0],
    w2: rand4(),
    b2: 0,
    prev_dw1: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    prev_db1: [0, 0, 0, 0],
    prev_dw2: [0, 0, 0, 0],
    prev_db2: 0,
  };
}

export function forwardPass(x: number, y: number, weights: NeuralWeights) {
  const { w1, b1, w2, b2 } = weights;
  const hidden: number[] = [];
  for (let j = 0; j < 4; j++) {
    const z = x * w1[0][j] + y * w1[1][j] + b1[j];
    hidden.push(sigmoid(z));
  }
  let outZ = b2;
  for (let j = 0; j < 4; j++) {
    outZ += hidden[j] * w2[j];
  }
  return { hidden, output: sigmoid(outZ) };
}
