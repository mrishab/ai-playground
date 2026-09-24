import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, ExternalLink, HelpCircle, CheckCircle2, Lightbulb, BookOpen, Layers } from 'lucide-react';
import { EXERCISES_DATA, ExerciseItem } from '@/data/exercisesData';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import confetti from 'canvas-confetti';

export function ExercisesView({ onOpenTool }: { onOpenTool: (toolId: string, sampleId?: string) => void }) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('All');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});

  const chapters = ['All', ...Array.from(new Set(EXERCISES_DATA.map(e => e.chapter)))];

  const filteredExercises = EXERCISES_DATA.filter(ex => {
    const matchesChapter = selectedChapter === 'All' || ex.chapter === selectedChapter;
    const matchesQuery =
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.goals.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ex.questions.some(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesChapter && matchesQuery;
  });

  const toggleSolution = (key: string) => {
    setExpandedSolutions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleHint = (key: string) => {
    setExpandedHints(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-card/60 p-6 rounded-2xl border border-border backdrop-blur shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold tracking-tight">Practice Exercises & Self-Assessment</span>
            <Badge variant="cyan">{EXERCISES_DATA.length} Curated Modules</Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Extracted directly from David Poole and Alan Mackworth's curriculum on AISpace. Test your theoretical understanding with guided questions and verify using visual simulation tools.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-2.5" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, questions..."
              className="w-full h-9 pl-9 pr-3 text-xs rounded-lg border border-input bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Chapter Filter Pills */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {chapters.map(ch => (
              <button
                key={ch}
                onClick={() => setSelectedChapter(ch)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedChapter === ch
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercises List */}
      <div className="space-y-4">
        {filteredExercises.map(ex => (
          <Card key={ex.id} className="overflow-hidden border-border/80 shadow-sm hover:border-primary/40 transition-all">
            <CardHeader className="p-5 pb-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="purple" className="font-mono text-xs">
                    Exercise {ex.id}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {ex.chapter}
                  </Badge>
                </div>

                {/* Direct Launch Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenTool(ex.toolId, ex.sampleId)}
                  className="gap-1.5 h-8 text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Try in Interactive Tool
                </Button>
              </div>

              <CardTitle className="text-base sm:text-lg mt-2 font-bold text-foreground">
                {ex.title}
              </CardTitle>

              <CardDescription className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                Reading: {ex.reading}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-5 pt-2 space-y-4 text-xs">
              {/* Learning Goals */}
              <div className="p-3 rounded-xl bg-secondary/30 border border-border/40 space-y-1.5">
                <span className="font-semibold text-primary uppercase text-[10px] tracking-wider">
                  Learning Objectives:
                </span>
                <ul className="space-y-1 text-slate-300">
                  {ex.goals.map((g, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Directed Questions */}
              <div className="space-y-3 pt-2">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-cyan-400" />
                  Directed Assessment Questions
                </span>

                <div className="space-y-2.5">
                  {ex.questions.map((q, qIdx) => {
                    const solKey = `${ex.id}-${qIdx}`;
                    const isSolOpen = Boolean(expandedSolutions[solKey]);
                    const isHintOpen = Boolean(expandedHints[solKey]);

                    return (
                      <div
                        key={qIdx}
                        className="p-3.5 rounded-xl border border-border bg-card/60 space-y-2 transition-all"
                      >
                        <div className="font-medium text-slate-200 leading-relaxed">
                          {qIdx + 1}. {q.q}
                        </div>

                        {/* Hint & Solution Toggles */}
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => toggleHint(solKey)}
                            className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-medium"
                          >
                            <Lightbulb className="h-3.5 w-3.5" />
                            {isHintOpen ? 'Hide Hint' : 'View Hint'}
                          </button>

                          <span className="text-border">•</span>

                          <button
                            onClick={() => toggleSolution(solKey)}
                            className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {isSolOpen ? 'Hide Solution' : 'Reveal Solution'}
                          </button>
                        </div>

                        {/* Hint Content */}
                        {isHintOpen && (
                          <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs animate-in fade-in">
                            <strong className="text-amber-400">Hint:</strong> {q.hint}
                          </div>
                        )}

                        {/* Solution Content */}
                        {isSolOpen && (
                          <div className="p-3 rounded-lg bg-emerald-950/25 border border-emerald-500/30 text-emerald-200 text-xs leading-relaxed animate-in fade-in space-y-1">
                            <div className="font-semibold text-emerald-300 flex items-center gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                              Official Textbook Solution:
                            </div>
                            <p className="text-slate-200">{q.solution}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredExercises.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">
            No exercises match your query. Try searching for "heuristic", "arc consistency", or "bayes".
          </div>
        )}
      </div>
    </div>
  );
}
