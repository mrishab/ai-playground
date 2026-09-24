import React from 'react';
import { Search, Moon, Sun, BookOpen, Layers, Menu, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export function Navbar({
  currentView,
  onSelectView,
  onOpenCommandPalette,
  onToggleSidebar,
  isDarkMode,
  onToggleDarkMode
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
        {/* Left: Mobile Menu Toggle & Brand */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden h-8 w-8 text-muted-foreground"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div
            onClick={() => onSelectView('overview')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-foreground flex items-center gap-1.5">
                AIspace Studio
                <Badge variant="cyan" className="text-[9px] py-0 px-1 font-mono">v3.0</Badge>
              </span>
              <span className="text-[10px] text-muted-foreground hidden sm:inline">
                Interactive AI Algorithm Lab
              </span>
            </div>
          </div>
        </div>

        {/* Center: Command Palette Search Bar */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <button
            onClick={onOpenCommandPalette}
            className="w-full flex items-center justify-between h-9 px-3 text-xs rounded-xl border border-input bg-background/50 text-muted-foreground hover:bg-secondary/40 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Search algorithms, tools, exercises...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-secondary text-muted-foreground font-mono border border-border">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Quick Links & Theme Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenCommandPalette}
            className="md:hidden h-8 w-8 p-0"
          >
            <Search className="h-4 w-4" />
          </Button>

          <Button
            variant={currentView === 'exercises' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onSelectView('exercises')}
            className="gap-1.5 h-8 text-xs font-medium"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Exercises</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
