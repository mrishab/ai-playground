import React from "react";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

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
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-sm tracking-tight text-foreground flex items-center gap-1.5">
            AIspace Studio
            <Badge variant="cyan" className="text-[9px] py-0 px-1 font-mono">
              v3.0
            </Badge>
          </span>
          <span className="text-[10px] text-muted-foreground hidden sm:inline">
            Interactive AI Algorithm Lab
          </span>
        </div>
      </div>
    </div>
  );
}
