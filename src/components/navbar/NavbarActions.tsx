import React from "react";
import { Search, Moon, Sun, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function NavbarActions({
  currentView,
  onSelectView,
  onOpenCommandPalette,
  isDarkMode,
  onToggleDarkMode,
}: {
  currentView: string;
  onSelectView: (view: string) => void;
  onOpenCommandPalette: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpenCommandPalette}
        className="md:hidden h-8 w-8 p-0"
        aria-label="Open search"
      >
        <Search className="h-4 w-4" />
      </Button>

      <Button
        variant={currentView === "exercises" ? "default" : "ghost"}
        size="sm"
        onClick={() => onSelectView("exercises")}
        className="gap-1.5 h-8 text-xs font-medium"
      >
        <BookOpen className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Exercises</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleDarkMode}
        className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors duration-150"
        aria-label={
          isDarkMode ? "Switch to light theme" : "Switch to dark theme"
        }
      >
        {isDarkMode ? (
          <Sun className="h-4 w-4 text-primary" />
        ) : (
          <Moon className="h-4 w-4 text-foreground" />
        )}
      </Button>
    </div>
  );
}
