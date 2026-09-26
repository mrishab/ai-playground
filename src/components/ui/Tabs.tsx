import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { TabsContext } from "./TabsContext";

export { TabsList } from "./TabsList";
export { TabsTrigger } from "./TabsTrigger";
export { TabsContent } from "./TabsContent";

export function Tabs({
  value,
  defaultValue = "",
  onValueChange,
  className,
  children,
  ...props
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  const [tab, setTab] = useState(defaultValue);
  const currentTab = value !== undefined ? value : tab;

  const handleTabChange = React.useCallback(
    (val: string) => {
      setTab(val);
      if (onValueChange) onValueChange(val);
    },
    [onValueChange],
  );

  const ctxValue = React.useMemo(
    () => ({ activeTab: currentTab, setActiveTab: handleTabChange }),
    [currentTab, handleTabChange],
  );

  return (
    <TabsContext.Provider value={ctxValue}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}
