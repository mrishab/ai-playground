import React from "react";
import { NavbarBrand } from "./navbar/NavbarBrand";
import { NavbarSearch } from "./navbar/NavbarSearch";
import { NavbarActions } from "./navbar/NavbarActions";

export function Navbar({
  currentView,
  onSelectView,
  onOpenCommandPalette,
  onToggleSidebar,
  isDarkMode,
  onToggleDarkMode,
}: {
  currentView: string;
  onSelectView: (view: string) => void;
  onOpenCommandPalette: () => void;
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <NavbarBrand
          onToggleSidebar={onToggleSidebar}
          onSelectOverview={() => onSelectView("overview")}
        />
        <NavbarSearch onOpen={onOpenCommandPalette} />
        <NavbarActions
          currentView={currentView}
          onSelectView={onSelectView}
          onOpenCommandPalette={onOpenCommandPalette}
          isDarkMode={isDarkMode}
          onToggleDarkMode={onToggleDarkMode}
        />
      </div>
    </header>
  );
}
