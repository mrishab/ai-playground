import React from "react";
import { OverviewView } from "./overview/OverviewView";
import { ExercisesView } from "./exercises/ExercisesView";
import { SearchTool } from "./search/SearchTool";
import { ConstraintTool } from "./constraint/ConstraintTool";
import { HillTool } from "./hill/HillTool";
import { DeductionTool } from "./deduction/DeductionTool";
import { BayesTool } from "./bayes/BayesTool";
import { DTreeTool } from "./dtree/DTreeTool";
import { NeuralTool } from "./neural/NeuralTool";
import { StripsToCspTool } from "./strips_to_csp/StripsToCspTool";
import { RobotTool } from "./robot/RobotTool";
import { PlanningTool } from "./planning/PlanningTool";

export function ToolViewRouter({
  currentView,
  onOpenTool,
}: {
  currentView: string;
  onOpenTool: (id: string) => void;
}) {
  const baseView = currentView.split("?")[0];
  switch (baseView) {
    case "overview":
      return <OverviewView onSelectTool={onOpenTool} />;
    case "exercises":
      return <ExercisesView onOpenTool={onOpenTool} />;
    case "search":
      return <SearchTool />;
    case "constraint":
      return <ConstraintTool />;
    case "hill":
      return <HillTool />;
    case "deduction":
      return <DeductionTool />;
    case "bayes":
      return <BayesTool />;
    case "dtree":
      return <DTreeTool />;
    case "neural":
      return <NeuralTool />;
    case "strips_to_csp":
      return <StripsToCspTool />;
    case "robot":
      return <RobotTool />;
    case "planning":
      return <PlanningTool />;
    default:
      return <OverviewView onSelectTool={onOpenTool} />;
  }
}
