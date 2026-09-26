import { useState, useCallback } from "react";
import { AlgorithmType, SearchPath, QuizScore } from "./searchTypes";

export function useSearchQuiz(
  algorithm: AlgorithmType,
  frontier: SearchPath[],
  isGoalReached: boolean,
  stepSearch: () => boolean,
) {
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizScore, setQuizScore] = useState<QuizScore>({
    correct: 0,
    total: 0,
  });
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const resetQuiz = useCallback(() => {
    setQuizScore({ correct: 0, total: 0 });
    setQuizFeedback(null);
  }, []);

  const handleNodeQuizClick = (nodeId: string) => {
    if (!isQuizMode || isGoalReached || frontier.length === 0) return;
    const exp = frontier[0].nodes[frontier[0].nodes.length - 1];
    const ok = nodeId === exp;
    setQuizScore((s) => ({
      correct: s.correct + (ok ? 1 : 0),
      total: s.total + 1,
    }));
    setQuizFeedback(
      ok
        ? `Correct! "${nodeId}" has priority in ${algorithm.toUpperCase()}.`
        : `Incorrect. Clicked "${nodeId}", expected "${exp}".`,
    );
    if (ok) stepSearch();
  };

  return {
    isQuizMode,
    setIsQuizMode,
    quizScore,
    quizFeedback,
    setQuizFeedback,
    resetQuiz,
    handleNodeQuizClick,
  };
}
