import React from "react";
import { Eye } from "lucide-react";
import { CardHeader, CardTitle } from "../ui/Card";

export function BayesDSeparationHeader() {
  return (
    <CardHeader className="p-4 pb-2">
      <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
        <Eye className="h-4 w-4 text-primary" />
        D-Separation Independence Tester
      </CardTitle>
    </CardHeader>
  );
}
