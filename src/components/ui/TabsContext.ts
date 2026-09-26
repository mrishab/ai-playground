import { createContext } from "react";

export interface TabsContextType {
  activeTab: string;
  setActiveTab: (val: string) => void;
}

export const TabsContext = createContext<TabsContextType>({
  activeTab: "",
  setActiveTab: () => {},
});
