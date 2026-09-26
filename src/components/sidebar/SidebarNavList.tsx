import React from "react";
import { NAV_ITEMS } from "./sidebarData";
import { SidebarNavItem } from "./SidebarNavItem";

const CATEGORIES = ["General", "Main Tools", "Prototype Tools"];

export function SidebarNavList({
  currentView,
  onSelectView,
  onClose,
}: {
  currentView: string;
  onSelectView: (view: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-5">
      {CATEGORIES.map((cat) => (
        <div key={cat} className="space-y-1">
          <div className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
            {cat}
          </div>
          <div className="space-y-0.5">
            {NAV_ITEMS.filter((i) => i.category === cat).map((item) => (
              <SidebarNavItem
                key={item.id}
                item={item}
                isActive={currentView === item.id}
                onSelect={() => {
                  onSelectView(item.id);
                  if (window.innerWidth < 1024) onClose();
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
