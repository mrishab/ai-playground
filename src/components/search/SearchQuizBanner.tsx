import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "../ui/Badge";
import { QuizScore } from "./searchTypes";

interface SearchQuizBannerProps {
  isQuizMode: boolean;
  quizScore: QuizScore;
  quizFeedback: string | null;
}

export function SearchQuizBanner({
  isQuizMode,
  quizScore,
  quizFeedback,
}: SearchQuizBannerProps) {
  if (!isQuizMode && !quizFeedback) return null;

  return (
    <>
      {isQuizMode && (
        <div className="bg-accent/30 border-b border-border px-4 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Badge variant="purple">Quiz Mode Active</Badge>
            <span className="text-foreground">
              Which node will be expanded next? Click on the node on the graph!
            </span>
          </div>
          <div className="font-semibold text-foreground">
            Score: {quizScore.correct} / {quizScore.total}
          </div>
        </div>
      )}

      {quizFeedback && (
        <div
          className={`px-4 py-2 text-xs border-b flex items-center gap-2 ${
            quizFeedback.startsWith("Correct")
              ? "bg-primary/10 border-primary/20 text-primary"
              : "bg-destructive/10 border-destructive/20 text-destructive"
          }`}
        >
          {quizFeedback.startsWith("Correct") ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <span>{quizFeedback}</span>
        </div>
      )}
    </>
  );
}
