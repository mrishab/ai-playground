import { useState, useEffect } from "react";
import { SEARCH_GRAPHS } from "@/data/searchProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { AlgorithmType } from "./searchTypes";
import { getSearchCodeTemplate } from "./searchCodeTemplate";
import { useSimulationTimer } from "@/hooks/useSimulationTimer";
import { useSearchQuiz } from "./useSearchQuiz";
import { useSearchExecution } from "./useSearchExecution";

export function useSearchTool() {
  const [selectedGraphId, setSelectedGraphId] = useState("vancouver");
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("astar");
  const [speed, setSpeed] = useState(600);
  const [isPlaying, setIsPlaying] = useState(false);
  const graph = SEARCH_GRAPHS[selectedGraphId] || SEARCH_GRAPHS.vancouver;

  const exec = useSearchExecution(graph, algorithm);
  const quiz = useSearchQuiz(
    algorithm,
    exec.frontier,
    exec.isGoalReached,
    exec.stepSearch,
  );

  useEffect(() => {
    setIsPlaying(false);
    exec.initializeSearch();
    quiz.resetQuiz();
    // react-doctor-disable-next-line react-doctor/exhaustive-deps
  }, [graph, algorithm]);

  useSimulationTimer(
    isPlaying,
    !exec.isGoalReached && exec.frontier.length > 0,
    () => {
      if (!exec.stepSearch()) setIsPlaying(false);
    },
    1050 - speed,
  );

  return {
    selectedGraphId,
    setSelectedGraphId,
    algorithm,
    setAlgorithm,
    speed,
    setSpeed,
    isPlaying,
    setIsPlaying,
    ...quiz,
    ...exec,
    graph,
    tutorial: TOOL_TUTORIALS.search,
    codeTemplate: getSearchCodeTemplate(graph),
  };
}
