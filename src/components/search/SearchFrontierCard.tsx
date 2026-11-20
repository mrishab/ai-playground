import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import { Badge } from "../ui/Badge";
import { AlgorithmType, SearchPath } from "./searchTypes";
import { SearchFrontierItem } from "./SearchFrontierItem";

interface SearchFrontierCardProps {
  frontier: SearchPath[];
  algorithm: AlgorithmType;
  isQuizMode?: boolean;
}

export function SearchFrontierCard({
  frontier,
  algorithm,
  isQuizMode = false,
}: SearchFrontierCardProps) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2.5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">
            Frontier Queue
          </CardTitle>
          <Badge variant="outline" className="text-[10px]">
            {isQuizMode ? "Quiz Active" : `Priority: ${algorithm.toUpperCase()}`}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          {isQuizMode ? "Next expansion hidden for quiz" : "Active paths waiting to be expanded"}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-1">
        {frontier.length === 0 ? (
          <div className="text-center py-6 text-xs text-muted-foreground">
            Frontier is empty.
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
            {frontier.map((path, idx) => (
              <SearchFrontierItem
                key={path.nodes.join("->")}
                path={path}
                isNext={idx === 0 && !isQuizMode}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
