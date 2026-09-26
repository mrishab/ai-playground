import React, { useContext } from "react";
import { cn } from "@/lib/utils";
import { TabsContext } from "./TabsContext";

export function TabsContent({
  value,
  className,
  children,
  ...props
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      className={cn(
        "mt-3 ring-offset-background focus-visible:outline-none animate-in fade-in-50 duration-200",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
