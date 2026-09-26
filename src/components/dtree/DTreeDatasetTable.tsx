import React from "react";
import { Table } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { DTreeDataset } from "@/data/dtreeProblems";

export function DTreeDatasetTable({ dataset }: { dataset: DTreeDataset }) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
          <Table className="h-4 w-4 text-primary" />
          Training Examples ({dataset.examples.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-1">
        <div className="max-h-56 overflow-y-auto border border-border/40 rounded-lg">
          <table className="w-full text-[11px] text-left">
            <thead className="bg-secondary/50 font-semibold border-b border-border/40 text-muted-foreground sticky top-0">
              <tr>
                {dataset.attributes.map((a) => (
                  <th key={a} className="p-1.5">
                    {a}
                  </th>
                ))}
                <th className="p-1.5 text-primary">{dataset.target}</th>
              </tr>
            </thead>
            <tbody>
              {dataset.examples.map((ex) => (
                <tr
                  key={Object.values(ex).join("-")}
                  className="border-b border-border/20 hover:bg-secondary/20 font-mono"
                >
                  {dataset.attributes.map((a) => (
                    <td key={a} className="p-1.5 text-muted-foreground">
                      {ex[a]}
                    </td>
                  ))}
                  <td className="p-1.5 font-bold text-foreground">
                    {ex[dataset.target]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
