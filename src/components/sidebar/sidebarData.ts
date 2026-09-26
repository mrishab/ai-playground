import { Home, BookOpen, Bot, Box } from "lucide-react";
import { NavItem } from "./sidebarItemTypes";
import { NAV_MAIN_ITEMS } from "./sidebarMainItems";

export type { NavItem };

export const NAV_ITEMS: NavItem[] = [
  { id: "overview", title: "Studio Overview", icon: Home, category: "General" },
  {
    id: "exercises",
    title: "Practice Exercises",
    icon: BookOpen,
    category: "General",
    badge: "16",
  },
  ...NAV_MAIN_ITEMS,
  {
    id: "robot",
    title: "Robot Control",
    icon: Bot,
    category: "Prototype Tools",
  },
  {
    id: "planning",
    title: "STRIPS Planning",
    icon: Box,
    category: "Prototype Tools",
  },
];
