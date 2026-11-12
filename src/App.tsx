import React from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { CommandPalette } from "./components/CommandPalette";
import { ToolViewRouter } from "./components/ToolViewRouter";
import { useAppTheme } from "./hooks/useAppTheme";
import { useAppShell } from "./hooks/useAppShell";

export function App() {
  const shell = useAppShell();
  const { isDarkMode, toggleDarkMode } = useAppTheme();

  return (
    <div
      className={`min-h-screen bg-background text-foreground flex flex-col font-sans ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <Navbar
        currentView={shell.currentView}
        onSelectView={shell.setCurrentView}
        onOpenCommandPalette={() => shell.setIsPaletteOpen(true)}
        onToggleSidebar={() => shell.setIsSidebarOpen((prev) => !prev)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      <div className="flex-1 flex w-full">
        <Sidebar
          currentView={shell.currentView}
          onSelectView={shell.setCurrentView}
          isOpen={shell.isSidebarOpen}
          onClose={() => shell.setIsSidebarOpen(false)}
        />
        <main
          ref={shell.mainRef}
          className="flex-1 min-w-0 p-4 sm:p-6"
        >
          <ToolViewRouter
            currentView={shell.currentView}
            onOpenTool={shell.handleOpenTool}
          />
        </main>
      </div>
      <CommandPalette
        isOpen={shell.isPaletteOpen}
        onClose={() => shell.setIsPaletteOpen(false)}
        onSelectView={shell.setCurrentView}
      />
    </div>
  );
}
