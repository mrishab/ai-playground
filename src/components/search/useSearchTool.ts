import { useState, useEffect } from "react";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { AlgorithmType } from "./searchTypes";
import { WorkspacePane } from "../workspace/workspaceTypes";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";
import { useSearchQuiz } from "./useSearchQuiz";
import { useSearchExecution } from "./useSearchExecution";
import { useSearchCustomGraph } from "./useSearchCustomGraph";

export function useSearchTool() {
  const g = useSearchCustomGraph();
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("astar");
  const [speed, setSpeed] = useState(600);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePane, setActivePane] = useState<WorkspacePane>("animation");

  const exec = useSearchExecution(g.graph, algorithm);
  const quiz = useSearchQuiz(algorithm, exec.frontier, exec.isGoalReached, exec.stepSearch);

  useEffect(() => {
    setIsPlaying(false);
    exec.initializeSearch();
    quiz.resetQuiz();
    // react-doctor-disable-next-line react-doctor/exhaustive-deps
  }, [g.graph, algorithm]);

  useSimulationTimer(
    isPlaying,
    !exec.isGoalReached && exec.frontier.length > 0,
    () => {
      if (!exec.stepSearch()) setIsPlaying(false);
    },
    1050 - speed,
  );

  return {
    ...g,
    algorithm,
    setAlgorithm,
    speed,
    setSpeed,
    isPlaying,
    setIsPlaying,
    activePane,
    setActivePane,
    ...quiz,
    ...exec,
    tutorial: TOOL_TUTORIALS.search,
  };
}
