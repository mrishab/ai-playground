export interface DataPoint {
  x: number;
  y: number;
  label: number;
}

export interface NeuralDataset {
  id: string;
  name: string;
  description: string;
  points: DataPoint[];
}

export interface NeuralDatasetMap {
  [datasetId: string]: NeuralDataset;
}

export const NEURAL_DATASETS: NeuralDatasetMap = {
  xor: {
    id: "xor",
    name: "Boolean XOR Problem",
    description:
      "Classic non-linearly separable benchmark requiring hidden layers.",
    points: [
      {
        x: -0.8,
        y: -0.8,
        label: 0,
      },
      {
        x: -0.8,
        y: 0.8,
        label: 1,
      },
      {
        x: 0.8,
        y: -0.8,
        label: 1,
      },
      {
        x: 0.8,
        y: 0.8,
        label: 0,
      },
      {
        x: -0.7,
        y: -0.7,
        label: 0,
      },
      {
        x: -0.7,
        y: 0.7,
        label: 1,
      },
      {
        x: 0.7,
        y: -0.7,
        label: 1,
      },
      {
        x: 0.7,
        y: 0.7,
        label: 0,
      },
    ],
  },
  twoMoons: {
    id: "twoMoons",
    name: "Two Interlocking Moons",
    description:
      "Two interleaving crescent moons testing complex non-linear decision boundary warping.",
    points: [
      {
        x: -0.8,
        y: 0.2,
        label: 0,
      },
      {
        x: -0.6,
        y: 0.5,
        label: 0,
      },
      {
        x: -0.3,
        y: 0.6,
        label: 0,
      },
      {
        x: 0.0,
        y: 0.5,
        label: 0,
      },
      {
        x: 0.2,
        y: 0.2,
        label: 0,
      },
      {
        x: -0.4,
        y: 0.3,
        label: 0,
      },
      {
        x: -0.1,
        y: 0.4,
        label: 0,
      },
      {
        x: -0.1,
        y: -0.2,
        label: 1,
      },
      {
        x: 0.1,
        y: -0.5,
        label: 1,
      },
      {
        x: 0.4,
        y: -0.6,
        label: 1,
      },
      {
        x: 0.7,
        y: -0.5,
        label: 1,
      },
      {
        x: 0.9,
        y: -0.2,
        label: 1,
      },
      {
        x: 0.3,
        y: -0.3,
        label: 1,
      },
      {
        x: 0.6,
        y: -0.4,
        label: 1,
      },
    ],
  },
  circles: {
    id: "circles",
    name: "Concentric Circles",
    description:
      "An inner dense ring of class 1 surrounded by an outer ring of class 0.",
    points: [
      {
        x: 0.0,
        y: 0.0,
        label: 1,
      },
      {
        x: 0.2,
        y: 0.1,
        label: 1,
      },
      {
        x: -0.2,
        y: 0.2,
        label: 1,
      },
      {
        x: 0.1,
        y: -0.2,
        label: 1,
      },
      {
        x: -0.15,
        y: -0.15,
        label: 1,
      },
      {
        x: 0.8,
        y: 0.0,
        label: 0,
      },
      {
        x: -0.8,
        y: 0.0,
        label: 0,
      },
      {
        x: 0.0,
        y: 0.8,
        label: 0,
      },
      {
        x: 0.0,
        y: -0.8,
        label: 0,
      },
      {
        x: 0.6,
        y: 0.6,
        label: 0,
      },
      {
        x: -0.6,
        y: 0.6,
        label: 0,
      },
      {
        x: 0.6,
        y: -0.6,
        label: 0,
      },
      {
        x: -0.6,
        y: -0.6,
        label: 0,
      },
    ],
  },
  linear: {
    id: "linear",
    name: "Linearly Separable",
    description:
      "Two linearly separable clusters solvable by a single-layer perceptron.",
    points: [
      {
        x: -0.8,
        y: -0.5,
        label: 0,
      },
      {
        x: -0.6,
        y: -0.7,
        label: 0,
      },
      {
        x: -0.5,
        y: -0.3,
        label: 0,
      },
      {
        x: -0.7,
        y: -0.2,
        label: 0,
      },
      {
        x: -0.3,
        y: -0.6,
        label: 0,
      },
      {
        x: 0.5,
        y: 0.5,
        label: 1,
      },
      {
        x: 0.7,
        y: 0.3,
        label: 1,
      },
      {
        x: 0.4,
        y: 0.8,
        label: 1,
      },
      {
        x: 0.8,
        y: 0.6,
        label: 1,
      },
      {
        x: 0.6,
        y: 0.4,
        label: 1,
      },
    ],
  },
};
