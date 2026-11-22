import React from "react";
import { ArrowRight } from "lucide-react";
import { NavItem } from "@/components/Sidebar";

export function NavResultList({
  items,
  selectedIndex = -1,
  onSelect,
}: {
  items: NavItem[];
  selectedIndex?: number;
  onSelect: (id: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-1">
      <span className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
        AI Tools & Visualizers
      </span>
      <div className="space-y-0.5">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-colors text-left ${
                isSelected ? "bg-secondary/90 ring-1 ring-primary/40" : "hover:bg-secondary/70"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">
                  {item.title}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  ({item.category})
                </span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
