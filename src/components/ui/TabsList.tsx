import React from "react";
import { cn } from "@/lib/utils";

export function TabsList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg bg-secondary/50 p-1 text-muted-foreground border border-border/40 backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
