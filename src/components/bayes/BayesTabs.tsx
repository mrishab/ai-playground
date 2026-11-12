import React from "react";
import { BookOpen, Settings2, GitFork } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { ToolTutorialData } from "@/data/toolTutorials";
import { BayesNetwork, EvidenceMap } from "@/data/bayesProblems";
import { BayesVeCard } from "./BayesVeCard";
import { TutorialTheoryCards } from "../shared/TutorialTheoryCards";
import { TutorialWalkthroughCards } from "../shared/TutorialWalkthroughCards";

interface BayesTabsProps {
  codeTemplate?: string;
  tutorial: ToolTutorialData;
  network: BayesNetwork;
  evidence: EvidenceMap;
}

export function BayesTabs({ tutorial, network, evidence }: BayesTabsProps) {
  return (
    <Tabs defaultValue="ve-trace" className="mt-8">
      {/* react-doctor-disable-next-line react-doctor/duplicate-jsx-subtree */}
      <TabsList className="grid grid-cols-3 max-w-md">
        <TabsTrigger value="ve-trace" className="gap-1.5">
          <GitFork className="h-3.5 w-3.5" />
          Step-by-Step VE
        </TabsTrigger>
        <TabsTrigger value="concepts" className="gap-1.5">
          <BookOpen className="h-3.5 w-3.5" />
          Concepts
        </TabsTrigger>
        <TabsTrigger value="walkthrough" className="gap-1.5">
          <Settings2 className="h-3.5 w-3.5" />
          How To Use
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ve-trace">
        <BayesVeCard network={network} evidence={evidence} />
      </TabsContent>
      <TabsContent value="concepts">
        <TutorialTheoryCards tutorial={tutorial} />
      </TabsContent>
      <TabsContent value="walkthrough">
        <TutorialWalkthroughCards tutorial={tutorial} />
      </TabsContent>
    </Tabs>
  );
}
