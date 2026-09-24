import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CommandPalette } from './components/CommandPalette';
import { OverviewView } from './components/overview/OverviewView';
import { ExercisesView } from './components/exercises/ExercisesView';
import { SearchTool } from './components/search/SearchTool';
import { ConstraintTool } from './components/constraint/ConstraintTool';
import { HillTool } from './components/hill/HillTool';
import { DeductionTool } from './components/deduction/DeductionTool';
import { BayesTool } from './components/bayes/BayesTool';
import { DTreeTool } from './components/dtree/DTreeTool';
import { NeuralTool } from './components/neural/NeuralTool';
import { StripsToCspTool } from './components/strips_to_csp/StripsToCspTool';
import { RobotTool } from './components/robot/RobotTool';
import { PlanningTool } from './components/planning/PlanningTool';

export function App() {
  const [currentView, setCurrentView] = useState<string>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Sync dark class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Global keydown for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenTool = (toolId: string) => {
    setCurrentView(toolId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Responsive Sidebar */}
        <Sidebar
          currentView={currentView}
          onSelectView={setCurrentView}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {currentView === 'overview' && (
            <OverviewView onSelectTool={handleOpenTool} />
          )}

          {currentView === 'exercises' && (
            <ExercisesView onOpenTool={handleOpenTool} />
          )}

          {currentView === 'search' && <SearchTool />}
          {currentView === 'constraint' && <ConstraintTool />}
          {currentView === 'hill' && <HillTool />}
          {currentView === 'deduction' && <DeductionTool />}
          {currentView === 'bayes' && <BayesTool />}
          {currentView === 'dtree' && <DTreeTool />}
          {currentView === 'neural' && <NeuralTool />}
          {currentView === 'strips_to_csp' && <StripsToCspTool />}
          {currentView === 'robot' && <RobotTool />}
          {currentView === 'planning' && <PlanningTool />}
        </main>
      </div>

      {/* Global Cmd+K Search Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectView={setCurrentView}
      />
    </div>
  );
}

export default App;
