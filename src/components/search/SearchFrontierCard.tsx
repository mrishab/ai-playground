import React from "react";
import { Card, CardContent } from "../ui/Card";
import { AlgorithmType, SearchPath } from "./searchTypes";
import { SearchFrontierItem } from "./SearchFrontierItem";
import { SearchFrontierHeader } from "./SearchFrontierHeader";

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
  const displayFrontier = React.useMemo(() => {
    if (!isQuizMode || frontier.length <= 1) return frontier;
    return [...frontier].sort((a, b) =>
      a.nodes[a.nodes.length - 1].localeCompare(b.nodes[b.nodes.length - 1]),
    );
  }, [frontier, isQuizMode]);

  return (
    <Card className="border-border/80 shadow-sm">
      <SearchFrontierHeader algorithm={algorithm} isQuizMode={isQuizMode} />
      <CardContent className="p-4 pt-1">
        {displayFrontier.length === 0 ? (
          <div className="text-center py-6 text-xs text-muted-foreground">
            Frontier is empty.
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
            {displayFrontier.map((path, idx) => (
              <SearchFrontierItem
                key={path.nodes.join("->")}
                path={path}
                isNext={idx === 0 && !isQuizMode}
                algorithm={algorithm}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
