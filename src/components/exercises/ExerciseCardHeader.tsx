import React from "react";
import { ExternalLink, BookOpen } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ExerciseItem } from "@/data/exercisesData";

export function ExerciseCardHeader({
  exercise,
  onOpenTool,
}: {
  exercise: ExerciseItem;
  onOpenTool: (toolId: string, sampleId?: string) => void;
}) {
  return (
    <CardHeader className="p-5 pb-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="purple" className="font-mono text-xs">
            Exercise {exercise.id}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {exercise.chapter}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onOpenTool(exercise.toolId, exercise.sampleId)}
          className="gap-1.5 h-8 text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Try in Interactive Tool
        </Button>
      </div>
      <CardTitle className="text-base sm:text-lg mt-2 font-bold text-foreground">
        {exercise.title}
      </CardTitle>
      <CardDescription className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
        <BookOpen className="h-3.5 w-3.5 text-primary" />
        Reading: {exercise.reading}
      </CardDescription>
    </CardHeader>
  );
}
