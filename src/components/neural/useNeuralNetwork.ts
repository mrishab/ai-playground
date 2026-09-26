import { useState, useEffect, useCallback } from "react";
import {
  NEURAL_DATASETS,
  NeuralDataset,
  DataPoint,
} from "@/data/neuralProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { useNeuralTraining } from "./useNeuralTraining";

export function useNeuralNetwork() {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>("xor");
  const initialDataset: NeuralDataset =
    NEURAL_DATASETS[selectedDatasetId] || NEURAL_DATASETS.xor;
  const tutorial = TOOL_TUTORIALS.neural;

  const [points, setPoints] = useState<DataPoint[]>([]);
  const [learningRate, setLearningRate] = useState<number>(0.3);
  const [momentum, setMomentum] = useState<number>(0.5);

  const training = useNeuralTraining(points, learningRate, momentum);

  const resetNetwork = useCallback(() => {
    training.resetTraining();
    setPoints([
      ...(NEURAL_DATASETS[selectedDatasetId]?.points ||
        NEURAL_DATASETS.xor.points),
    ]);
  }, [selectedDatasetId, training.resetTraining]);

  useEffect(() => {
    resetNetwork();
  }, [resetNetwork]);

  return {
    selectedDatasetId,
    setSelectedDatasetId,
    initialDataset,
    tutorial,
    points,
    setPoints,
    learningRate,
    setLearningRate,
    momentum,
    setMomentum,
    ...training,
    resetNetwork,
  };
}
