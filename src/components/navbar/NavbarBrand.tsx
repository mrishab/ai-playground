import React from "react";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function NavbarBrand({
  onToggleSidebar,
  onSelectOverview,
}: {
  onToggleSidebar: () => void;
  onSelectOverview: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebar}
        className="lg:hidden h-8 w-8 text-muted-foreground"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <div
        role="button"
        tabIndex={0}
        onClick={onSelectOverview}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelectOverview();
          }
        }}
        className="flex items-center gap-2 cursor-pointer select-none group"
      >
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-tight text-foreground">
            AI Playground
          </span>
          <span className="text-[10px] text-muted-foreground hidden sm:inline leading-none">
            Interactive AI Algorithm Lab
          </span>
        </div>
      </div>
    </div>
  );
}
