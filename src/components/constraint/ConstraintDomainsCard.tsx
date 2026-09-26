import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import { CSPProblem } from "@/data/cspProblems";
import { VariableDomains } from "./constraintTypes";
import { ConstraintVariableDomainRow } from "./ConstraintVariableDomainRow";

interface ConstraintDomainsCardProps {
  problem: CSPProblem;
  domains: VariableDomains;
}

export function ConstraintDomainsCard({
  problem,
  domains,
}: ConstraintDomainsCardProps) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">
          Variable Domains
        </CardTitle>
        <CardDescription className="text-xs">
          Active remaining candidate values
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-2.5">
        {problem.variables.map((v) => (
          <ConstraintVariableDomainRow
            key={v.name}
            variable={v}
            currentVals={domains[v.name] || []}
          />
        ))}
      </CardContent>
    </Card>
  );
}
