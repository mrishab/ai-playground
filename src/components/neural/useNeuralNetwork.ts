import { useState, useCallback } from "react";
import { NEURAL_DATASETS, NeuralDataset, DataPoint } from "@/data/neuralProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { useNeuralTraining } from "./useNeuralTraining";

export function useNeuralNetwork() {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>("xor");
  const [customDataset, setCustomDataset] = useState<NeuralDataset | null>(null);

  const initialDataset: NeuralDataset =
    selectedDatasetId === "custom" && customDataset ? customDataset : NEURAL_DATASETS[selectedDatasetId] || NEURAL_DATASETS.xor;
  const tutorial = TOOL_TUTORIALS.neural;

  const [points, setPoints] = useState<DataPoint[]>(() => [...NEURAL_DATASETS.xor.points]);
  const [learningRate, setLearningRate] = useState<number>(0.3);
  const [momentum, setMomentum] = useState<number>(0.5);

  const training = useNeuralTraining(points, learningRate, momentum);

  const handleImportDataset = (imported: NeuralDataset) => {
    setCustomDataset(imported);
    setSelectedDatasetId("custom");
    training.resetTraining();
    setPoints(imported.points || []);
  };

  const handleResetDataset = () => {
    setCustomDataset({ id: "blank", name: "Empty", description: "Reset", points: [] });
    setSelectedDatasetId("custom");
    training.resetTraining();
    setPoints([]);
  };

  const handleSelectDatasetId = (id: string) => {
    setSelectedDatasetId(id);
    training.resetTraining();
    if (id !== "custom" && NEURAL_DATASETS[id]) {
      setCustomDataset(NEURAL_DATASETS[id]);
      setPoints([...NEURAL_DATASETS[id].points]);
    }
  };

  const resetNetwork = useCallback(() => {
    training.resetTraining();
    const ds = selectedDatasetId === "custom" && customDataset ? customDataset : NEURAL_DATASETS[selectedDatasetId] || NEURAL_DATASETS.xor;
    setPoints([...(ds.points || [])]);
  }, [selectedDatasetId, customDataset, training.resetTraining]);

  return {
    selectedDatasetId, setSelectedDatasetId: handleSelectDatasetId,
    handleImportDataset, handleResetDataset, dataset: initialDataset, initialDataset,
    tutorial, points, setPoints, learningRate, setLearningRate,
    momentum, setMomentum, ...training, resetNetwork,
  };
}
