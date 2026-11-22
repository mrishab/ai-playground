import React from "react";
import { CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { AlgorithmType } from "./searchTypes";

interface SearchFrontierHeaderProps {
  algorithm: AlgorithmType;
  isQuizMode: boolean;
}

export function SearchFrontierHeader({ algorithm, isQuizMode }: SearchFrontierHeaderProps) {
  return (
    <CardHeader className="p-4 pb-2.5">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-semibold">Frontier Queue</CardTitle>
        <Badge variant="outline" className="text-[10px]">
          {isQuizMode ? "Quiz Active" : `Priority: ${algorithm.toUpperCase()}`}
        </Badge>
      </div>
      <CardDescription className="text-xs">
        {isQuizMode ? "Next expansion hidden for quiz" : "Active paths waiting to be expanded"}
      </CardDescription>
    </CardHeader>
  );
}
