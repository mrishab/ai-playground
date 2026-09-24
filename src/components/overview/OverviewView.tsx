import React from 'react';
import { 
  Search, ShieldCheck, Zap, Network, TreePine, Cpu, 
  Bot, Box, GitBranch, ArrowRight, BookOpen, Sparkles, CheckCircle2, Laptop 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function OverviewView({ onSelectTool }: { onSelectTool: (toolId: string) => void }) {
  const tools = [
    {
      id: 'search',
      title: 'Graph Searching',
      category: 'Main Tools',
      badge: 'Pathfinding',
      icon: Search,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      description: 'Explore DFS, BFS, Lowest-Cost-First (Dijkstra), Best-First, A* Search, and Multi-Path Pruning on authentic maps.',
      algorithms: ['A* Search', 'Dijkstra', 'DFS / BFS', 'Multi-Path Pruning']
    },
    {
      id: 'constraint',
      title: 'Consistency for CSP',
      category: 'Main Tools',
      badge: 'CSPs',
      icon: ShieldCheck,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      description: 'Solve constraint satisfaction problems using Arc Consistency (AC-3), fine-step evaluation, and domain splitting with backtracking.',
      algorithms: ['AC-3 Algorithm', 'Domain Splitting', 'Backtracking', 'MRV Heuristic']
    },
    {
      id: 'hill',
      title: 'Stochastic Local Search',
      category: 'Main Tools',
      badge: 'Optimization',
      icon: Zap,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      description: 'Navigate total assignment spaces using Min-Conflicts, Random Walk, Simulated Annealing, and Tabu Search with real-time error plotting.',
      algorithms: ['Min-Conflicts', 'Simulated Annealing', 'Tabu Search', 'Random Walk']
    },
    {
      id: 'deduction',
      title: 'Definite Clause Deduction',
      category: 'Main Tools',
      badge: 'Logic & Proofs',
      icon: GitBranch,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      description: 'Perform top-down SLD resolution, bottom-up forward chaining, and unification with answer extraction in Prolog/CILog.',
      algorithms: ['SLD Resolution', 'Unification & MGU', 'Forward Chaining', 'Answer Extraction']
    },
    {
      id: 'bayes',
      title: 'Belief & Decision Networks',
      category: 'Main Tools',
      badge: 'Uncertainty',
      icon: Network,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      description: 'Exact probabilistic reasoning via Variable Elimination, conditional independence testing via D-Separation, and Decision Networks.',
      algorithms: ['Variable Elimination', 'D-Separation', 'Expected Utility', 'Bayesian Conditioning']
    },
    {
      id: 'dtree',
      title: 'Decision Trees',
      category: 'Main Tools',
      badge: 'Supervised Learning',
      icon: TreePine,
      color: 'text-lime-400 bg-lime-500/10 border-lime-500/20',
      description: 'Construct optimal classification trees using Shannon Entropy and Information Gain metrics with interactive step-by-step splitting.',
      algorithms: ['ID3 Algorithm', 'Entropy Reduction', 'Information Gain', 'Tree Pruning']
    },
    {
      id: 'neural',
      title: 'Neural Networks',
      category: 'Main Tools',
      badge: 'Connectionism',
      icon: Cpu,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      description: 'Train multi-layer feedforward neural networks using backpropagation with live real-time 2D decision boundary visualization.',
      algorithms: ['Backpropagation', '2D Boundary Mapping', 'Gradient Descent', 'Momentum']
    },
    {
      id: 'strips_to_csp',
      title: 'STRIPS to CSP',
      category: 'Main Tools',
      badge: 'Planning as CSP',
      icon: Laptop,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      description: 'Compile classical planning problems into constraint satisfaction problems across temporal horizons with explanatory frame axioms.',
      algorithms: ['Temporal Unfolding', 'Explanatory Frame Axioms', 'Mutex Detection', 'CSP Compilation']
    },
    {
      id: 'robot',
      title: 'Robot Control & Simulation',
      category: 'Prototype Tools',
      badge: 'Embodied AI',
      icon: Bot,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      description: 'Simulate an autonomous agent in 2D environments with whisker sensors, obstacle avoidance, and hierarchical controllers.',
      algorithms: ['Sense-Plan-Act', 'Hierarchical Subsumption', 'Wall Following', 'Reactive Steering']
    },
    {
      id: 'planning',
      title: 'STRIPS Planning (Blocks World)',
      category: 'Prototype Tools',
      badge: 'Classical Planning',
      icon: Box,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      description: 'Synthesize plans in the physical Blocks World with animated robotic gripper execution and resolve the classic Sussman Anomaly.',
      algorithms: ['Forward Progression', 'Goal Regression', 'Sussman Anomaly Resolution', 'Blocks World Physics']
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="relative rounded-3xl border border-border bg-gradient-to-b from-card/90 via-card/50 to-background p-6 sm:p-10 shadow-xl overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            Modern Redesign of AISpace (Poole & Mackworth)
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Interactive Artificial Intelligence <br />
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Algorithm Studio & Learning Suite
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Every lesson, concept, and algorithm from AISpace re-engineered with modern React, ShadCN, and Tailwind CSS.
            Zero backend, zero Java applets — everything runs 100% in-browser with live interactive visualizers and executable code sandboxes.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" onClick={() => onSelectTool('search')} className="gap-2 font-semibold shadow-md">
              Start Exploring: Graph Search
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => onSelectTool('exercises')} className="gap-2">
              <BookOpen className="h-4 w-4" />
              Practice Exercises
            </Button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border/50 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              100% In-Browser
            </div>
            <p className="text-muted-foreground text-[11px]">No backend or Java runtime required.</p>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Live Code Sandbox
            </div>
            <p className="text-muted-foreground text-[11px]">Run and modify algorithm code live.</p>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Authentic Datasets
            </div>
            <p className="text-muted-foreground text-[11px]">Original AISpace problems & graphs.</p>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Self-Assessment
            </div>
            <p className="text-muted-foreground text-[11px]">Curated questions with solutions.</p>
          </div>
        </div>
      </div>

      {/* Tools Catalog */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Interactive AI Modules</h2>
            <p className="text-xs text-muted-foreground">Select any module to start the visual algorithm simulator and code sandbox</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map(tool => {
            const Icon = tool.icon;
            return (
              <Card
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="group cursor-pointer border-border/80 bg-card/60 hover:bg-card hover:border-primary/50 transition-all p-5 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${tool.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>
                      <span className="text-[11px] text-muted-foreground">{tool.category}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {tool.badge}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tool.algorithms.map((a, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-secondary/60 text-[10px] font-mono text-slate-300 border border-border/40">
                      {a}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
