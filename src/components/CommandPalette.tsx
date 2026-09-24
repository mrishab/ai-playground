import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { Modal } from './ui/Modal';
import { NAV_ITEMS } from './Sidebar';
import { EXERCISES_DATA } from '@/data/exercisesData';

export function CommandPalette({
  isOpen,
  onClose,
  onSelectView
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (view: string) => void;
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredNav = NAV_ITEMS.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredExercises = EXERCISES_DATA.filter(ex =>
    ex.title.toLowerCase().includes(query.toLowerCase()) ||
    ex.id.toLowerCase().includes(query.toLowerCase()) ||
    ex.chapter.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const handleSelect = (id: string) => {
    onSelectView(id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-0 overflow-hidden max-w-xl">
      {/* Search Input Bar */}
      <div className="flex items-center px-4 border-b border-border bg-card">
        <Search className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search tools, algorithms, exercises..."
          autoFocus
          className="w-full h-12 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
        />
        <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-secondary text-muted-foreground font-mono border border-border">
          ESC
        </kbd>
      </div>

      {/* Results List */}
      <div className="p-3 max-h-80 overflow-y-auto space-y-4 text-xs">
        {/* Navigation Items */}
        {filteredNav.length > 0 && (
          <div className="space-y-1">
            <span className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              AI Tools & Visualizers
            </span>
            <div className="space-y-0.5">
              {filteredNav.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary/70 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-foreground">{item.title}</span>
                      <span className="text-[10px] text-muted-foreground">({item.category})</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Exercises */}
        {filteredExercises.length > 0 && (
          <div className="space-y-1 pt-2 border-t border-border/40">
            <span className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Practice Exercises
            </span>
            <div className="space-y-0.5">
              {filteredExercises.map(ex => (
                <button
                  key={ex.id}
                  onClick={() => handleSelect('exercises')}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary/70 transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="h-4 w-4 text-cyan-400" />
                    <div>
                      <span className="font-medium text-foreground">Exercise {ex.id}: {ex.title}</span>
                      <span className="text-[10px] text-muted-foreground block">{ex.chapter}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}

        {filteredNav.length === 0 && filteredExercises.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-xs">
            No matching tools or exercises found for "{query}".
          </div>
        )}
      </div>
    </Modal>
  );
}
