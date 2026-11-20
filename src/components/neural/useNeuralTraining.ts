import { useState, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import { DataPoint } from "@/data/neuralProblems";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";
import { NeuralWeights, createInitialWeights } from "./neuralMath";
import { trainEpochStep } from "./neuralTrainer";

export function useNeuralTraining(
  points: DataPoint[],
  learningRate: number,
  momentum: number,
) {
  const [epoch, setEpoch] = useState<number>(0);
  const [loss, setLoss] = useState<number>(0);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600);

  const [initialWeights] = useState(createInitialWeights);
  const weightsRef = useRef<NeuralWeights>(initialWeights);
  const convergedRef = useRef(false);

  const resetTraining = useCallback(() => {
    setIsPlaying(false);
    convergedRef.current = false;
    weightsRef.current = createInitialWeights();
    setEpoch(0);
    setLoss(0.5);
    setLossHistory([0.5]);
  }, []);

  const trainEpoch = useCallback(() => {
    const { mse } = trainEpochStep(points, weightsRef.current, learningRate, momentum);
    setLoss(mse);
    setEpoch((prev) => prev + 1);
    setLossHistory((prev) => [...prev.slice(-59), mse]);
    if (mse < 0.02 && !convergedRef.current) {
      if (isPlaying) setIsPlaying(false);
      convergedRef.current = true;
      confetti({ particleCount: 60, spread: 70 });
    }
  }, [points, learningRate, momentum, isPlaying]);

  useSimulationTimer(isPlaying, loss >= 0.02 || epoch === 0, trainEpoch, 1050 - speed);

  return {
    epoch,
    loss,
    lossHistory,
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    weightsRef,
    resetTraining,
    trainEpoch,
  };
}
