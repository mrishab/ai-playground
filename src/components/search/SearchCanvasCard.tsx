import React from "react";
import { Card } from "../ui/Card";
import { useSearchTool } from "./useSearchTool";
import { SearchToolbar } from "./SearchToolbar";
import { SearchQuizBanner } from "./SearchQuizBanner";
import { SearchGraphSvg } from "./SearchGraphSvg";

interface SearchCanvasCardProps {
  t: ReturnType<typeof useSearchTool>;
}

export function SearchCanvasCard({ t }: SearchCanvasCardProps) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <SearchToolbar
        isPlaying={t.isPlaying}
        isGoalReached={t.isGoalReached}
        isFrontierEmpty={t.frontier.length === 0}
        isQuizMode={t.isQuizMode}
        hasHistory={t.history.length > 0}
        speed={t.speed}
        setSpeed={t.setSpeed}
        onTogglePlay={() => t.setIsPlaying(!t.isPlaying)}
        onStep={t.stepSearch}
        onStepBack={t.stepBack}
        onReset={t.initializeSearch}
        onToggleQuiz={() => {
          t.setIsQuizMode(!t.isQuizMode);
          t.setQuizFeedback(null);
        }}
      />
      <SearchQuizBanner
        isQuizMode={t.isQuizMode}
        quizScore={t.quizScore}
        quizFeedback={t.quizFeedback}
      />
      <SearchGraphSvg
        graph={t.graph}
        currentPath={t.currentPath}
        currentNode={t.currentNode}
        expanded={t.expanded}
        frontier={t.frontier}
        isGoalReached={t.isGoalReached}
        log={t.log}
        onNodeClick={(n) =>
          t.isQuizMode ? t.handleNodeQuizClick(n.id) : t.setInspectedNode(n)
        }
      />
    </Card>
  );
}
