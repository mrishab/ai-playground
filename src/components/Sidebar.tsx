import React from 'react';
import { 
  Home, Search, ShieldCheck, Zap, Network, TreePine, 
  Cpu, Bot, Box, GitBranch, Laptop, BookOpen, ChevronRight, X 
} from 'lucide-react';
import { Badge } from './ui/Badge';

export interface NavItem {
  id: string;
  title: string;
  icon: any;
  category: string;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'overview', title: 'Studio Overview', icon: Home, category: 'General' },
  { id: 'exercises', title: 'Practice Exercises', icon: BookOpen, category: 'General', badge: '16' },

  // Main Tools
  { id: 'search', title: 'Graph Searching', icon: Search, category: 'Main Tools' },
  { id: 'constraint', title: 'Consistency for CSP', icon: ShieldCheck, category: 'Main Tools' },
  { id: 'hill', title: 'SLS for CSP', icon: Zap, category: 'Main Tools' },
  { id: 'deduction', title: 'Definite Clause Deduction', icon: GitBranch, category: 'Main Tools' },
  { id: 'bayes', title: 'Belief & Decision Networks', icon: Network, category: 'Main Tools' },
  { id: 'dtree', title: 'Decision Trees', icon: TreePine, category: 'Main Tools' },
  { id: 'neural', title: 'Neural Networks', icon: Cpu, category: 'Main Tools' },
  { id: 'strips_to_csp', title: 'STRIPS to CSP', icon: Laptop, category: 'Main Tools' },

  // Prototype Tools
  { id: 'robot', title: 'Robot Control', icon: Bot, category: 'Prototype Tools' },
  { id: 'planning', title: 'STRIPS Planning', icon: Box, category: 'Prototype Tools' }
];

export function Sidebar({
  currentView,
  onSelectView,
  isOpen,
  onClose
}: {
  currentView: string;
  onSelectView: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const categories = ['General', 'Main Tools', 'Prototype Tools'];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 border-r border-border bg-card/95 backdrop-blur-md transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        {/* Mobile Header */}
        <div className="flex h-14 items-center justify-between px-4 border-b border-border lg:hidden">
          <span className="font-bold text-sm tracking-tight text-foreground">Navigation Menu</span>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Item List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          {categories.map(cat => {
            const items = NAV_ITEMS.filter(item => item.category === cat);
            return (
              <div key={cat} className="space-y-1">
                <div className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                  {cat}
                </div>

                <div className="space-y-0.5">
                  {items.map(item => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectView(item.id);
                          onClose();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                            : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`h-4 w-4 ${isActive ? 'text-primary-foreground' : 'text-primary/70'}`} />
                          <span>{item.title}</span>
                        </div>

                        {item.badge && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                            isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-secondary text-muted-foreground'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info badge */}
        <div className="p-3 border-t border-border/60 text-[11px] text-muted-foreground bg-secondary/20">
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">AIspace Redesign</span>
            <span className="text-[10px] text-emerald-400 font-mono">100% In-Browser</span>
          </div>
          <p className="text-[10px] text-muted-foreground/80 mt-0.5">
            Poole & Mackworth AI algorithms
          </p>
        </div>
      </aside>
    </>
  );
}
