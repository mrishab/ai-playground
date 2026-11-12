import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "purple"
    | "cyan";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground shadow",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    destructive:
      "border-transparent bg-destructive text-destructive-foreground",
    outline: "text-foreground border-border",
    success:
      "border-transparent bg-primary/15 text-primary border border-primary/25",
    warning:
      "border-transparent bg-destructive/15 text-destructive border border-destructive/25",
    purple:
      "border-transparent bg-accent text-accent-foreground border border-border",
    cyan: "border-transparent bg-secondary text-secondary-foreground border border-border",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
