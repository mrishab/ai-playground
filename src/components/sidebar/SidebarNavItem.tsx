import React from "react";
import { NavItem } from "./sidebarData";

export function SidebarNavItem({
  item,
  isActive,
  onSelect,
}: {
  item: NavItem;
  isActive: boolean;
  onSelect: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      onClick={onSelect}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors duration-150 ease-out ${
        isActive
          ? "bg-primary text-primary-foreground font-semibold shadow-sm"
          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Icon
          className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-primary/70"}`}
        />
        <span>{item.title}</span>
      </div>
      {item.badge && (
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
            isActive
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}
