import { useState, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import { DataPoint } from "@/data/neuralProblems";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";
import { NeuralWeights, createInitialWeights, computeDatasetMse } from "./neuralMath";
import { trainEpochStep } from "./neuralTrainer";

export function useNeuralTraining(
  points: DataPoint[], learningRate: number, momentum: number, algo: string = "mlp_sgd",
) {
  const [initialWeights] = useState(createInitialWeights);
  const weightsRef = useRef<NeuralWeights>(initialWeights);
  const initialMse = computeDatasetMse(points, weightsRef.current, algo);

  const [epoch, setEpoch] = useState<number>(0);
  const [loss, setLoss] = useState<number>(initialMse);
  const [lossHistory, setLossHistory] = useState<number[]>([initialMse]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600);
  const convergedRef = useRef(false);

  const resetTraining = useCallback(() => {
    setIsPlaying(false);
    convergedRef.current = false;
    weightsRef.current = createInitialWeights();
    const trueMse = computeDatasetMse(points, weightsRef.current, algo);
    setEpoch(0);
    setLoss(trueMse);
    setLossHistory([trueMse]);
  }, [points, algo]);

  const trainEpoch = useCallback(() => {
    if (points.length === 0) return;
    const { mse } = trainEpochStep(points, weightsRef.current, learningRate, momentum, algo);
    setLoss(mse);
    setEpoch((prev) => prev + 1);
    setLossHistory((prev) => [...prev.slice(-59), mse]);
    if (points.length > 0 && mse < 0.02 && !convergedRef.current) {
      if (isPlaying) setIsPlaying(false);
      convergedRef.current = true;
      confetti({ particleCount: 60, spread: 70 });
    }
  }, [points, learningRate, momentum, algo, isPlaying]);

  useSimulationTimer(isPlaying, points.length > 0 && (loss >= 0.02 || epoch === 0), trainEpoch, 1050 - speed);

  return { epoch, loss, lossHistory, isPlaying, setIsPlaying, speed, setSpeed, weightsRef, resetTraining, trainEpoch };
}
