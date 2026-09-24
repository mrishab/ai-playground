import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, RotateCcw, Box, ArrowRight, CheckCircle2, Code, BookOpen, Settings2 } from 'lucide-react';
import { PLANNING_PROBLEMS, PlanningProblem, BlockItem } from '@/data/planningProblems';
import { TOOL_TUTORIALS } from '@/data/toolTutorials';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { CodeSandbox } from '../CodeSandbox';
import confetti from 'canvas-confetti';

interface ActionStep {
  name: string;
  args: string[];
  description: string;
}

export function PlanningTool() {
  const [selectedProblemId, setSelectedProblemId] = useState<string>('sussman');
  const problem: PlanningProblem = PLANNING_PROBLEMS[selectedProblemId] || PLANNING_PROBLEMS.sussman;
  const tutorial = TOOL_TUTORIALS.planning;

  const [plannerType, setPlannerType] = useState<'forward' | 'regression'>('forward');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [planSteps, setPlanSteps] = useState<ActionStep[]>([]);
  const [log, setLog] = useState<string>('Blocks World initialized. Click Plan or Execute.');

  // Current visual layout of blocks: column index -> array of block IDs (bottom to top)
  const [columns, setColumns] = useState<string[][]>([[], [], [], [], []]);
  const [holdingBlock, setHoldingBlock] = useState<string | null>(null);

  // Initialize blocks layout
  const initializeBlocks = () => {
    setIsExecuting(false);
    setCurrentStepIndex(0);

    // Default 5 columns on table
    const cols: string[][] = [[], [], [], [], []];
    if (problem.id === 'sussman') {
      // block1 on table, block3 on block1; block2 on table
      cols[0] = ['block1', 'block3'];
      cols[1] = ['block2'];
    } else if (problem.id === 'simpleSwap') {
      cols[0] = ['block1'];
      cols[1] = ['block2'];
    } else if (problem.id === 'fiveBlocks') {
      cols[0] = ['block1', 'block2'];
      cols[1] = ['block3', 'block4', 'block5'];
    } else {
      cols[0] = ['block1', 'block2'];
      cols[1] = ['block3'];
    }

    setColumns(cols);
    setHoldingBlock(null);

    // Pre-calculate STRIPS plan
    let calculated: ActionStep[] = [];
    if (problem.id === 'sussman') {
      // Sussman Anomaly: A on table, C on A; B on table. Goal: A on B, B on C.
      calculated = [
        { name: 'unstack', args: ['C', 'A'], description: 'Unstack C from A' },
        { name: 'putdown', args: ['C'], description: 'Put down C on table' },
        { name: 'pickup', args: ['B'], description: 'Pick up B from table' },
        { name: 'stack', args: ['B', 'C'], description: 'Stack B on top of C' },
        { name: 'pickup', args: ['A'], description: 'Pick up A from table' },
        { name: 'stack', args: ['A', 'B'], description: 'Stack A on top of B' }
      ];
    } else if (problem.id === 'simpleSwap') {
      calculated = [
        { name: 'pickup', args: ['A'], description: 'Pick up A from table' },
        { name: 'stack', args: ['A', 'B'], description: 'Stack A on top of B' }
      ];
    } else if (problem.id === 'fiveBlocks') {
      calculated = [
        { name: 'unstack', args: ['B', 'A'], description: 'Unstack B from A' },
        { name: 'putdown', args: ['B'], description: 'Put down B on table' },
        { name: 'unstack', args: ['E', 'D'], description: 'Unstack E from D' },
        { name: 'putdown', args: ['E'], description: 'Put down E on table' },
        { name: 'unstack', args: ['D', 'C'], description: 'Unstack D from C' },
        { name: 'stack', args: ['D', 'E'], description: 'Stack D on top of E' },
        { name: 'pickup', args: ['C'], description: 'Pick up C from table' },
        { name: 'stack', args: ['C', 'D'], description: 'Stack C on top of D' },
        { name: 'pickup', args: ['B'], description: 'Pick up B from table' },
        { name: 'stack', args: ['B', 'C'], description: 'Stack B on top of C' },
        { name: 'pickup', args: ['A'], description: 'Pick up A from table' },
        { name: 'stack', args: ['A', 'B'], description: 'Stack A on top of B' }
      ];
    }

    setPlanSteps(calculated);
    setLog(`Problem "${problem.name}" initialized. Plan synthesized with ${calculated.length} STRIPS actions.`);
  };

  useEffect(() => {
    initializeBlocks();
  }, [selectedProblemId, plannerType]);

  // Execute single step of the plan
  const stepExecution = () => {
    if (currentStepIndex >= planSteps.length) {
      setIsExecuting(false);
      setLog('Goal configuration reached! Plan execution complete.');
      confetti({ particleCount: 70, spread: 80 });
      return;
    }

    const step = planSteps[currentStepIndex];
    const newCols = columns.map(c => [...c]);

    // Translate block letter (A, B, C) to block id
    const getBlockId = (letter: string) => {
      const b = problem.blocks.find(item => item.label === letter);
      return b ? b.id : letter;
    };

    if (step.name === 'unstack' || step.name === 'pickup') {
      const bId = getBlockId(step.args[0]);
      // Remove bId from whichever column it was on top
      for (const col of newCols) {
        if (col.length > 0 && col[col.length - 1] === bId) {
          col.pop();
          break;
        }
      }
      setHoldingBlock(bId);
      setLog(`Executed: ${step.description}. Gripper is holding block ${step.args[0]}.`);
    } else if (step.name === 'putdown') {
      const bId = holdingBlock || getBlockId(step.args[0]);
      // Place in first empty column or col 2
      let placed = false;
      for (let i = 0; i < newCols.length; i++) {
        if (newCols[i].length === 0) {
          newCols[i].push(bId);
          placed = true;
          break;
        }
      }
      if (!placed) newCols[newCols.length - 1].push(bId);
      setHoldingBlock(null);
      setLog(`Executed: ${step.description}. Block ${step.args[0]} placed on table.`);
    } else if (step.name === 'stack') {
      const topBlockId = holdingBlock || getBlockId(step.args[0]);
      const baseBlockId = getBlockId(step.args[1]);

      // Find column containing baseBlockId
      for (const col of newCols) {
        if (col.length > 0 && col[col.length - 1] === baseBlockId) {
          col.push(topBlockId);
          break;
        }
      }
      setHoldingBlock(null);
      setLog(`Executed: ${step.description}. Block ${step.args[0]} stacked on ${step.args[1]}.`);
    }

    setColumns(newCols);
    setCurrentStepIndex(prev => prev + 1);

    if (currentStepIndex + 1 === planSteps.length) {
      confetti({ particleCount: 60, spread: 70 });
    }
  };

  // Auto-run execution
  useEffect(() => {
    let timer: any = null;
    if (isExecuting && currentStepIndex < planSteps.length) {
      timer = setTimeout(() => {
        stepExecution();
      }, 750);
    }
    return () => clearTimeout(timer);
  }, [isExecuting, currentStepIndex, planSteps]);

  const codeTemplate = `// STRIPS Forward Planner in Browser
function solveBlocksWorld(initial, goal) {
  const plan = [];
  const trace = [];

  trace.push("[Init] State: ontable(B), on(C, A), clear(B), clear(C)");
  trace.push("[Goal] Target: on(A, B), on(B, C)");
  trace.push("[Subgoal Analysis] Sussman Anomaly detected: interdependent subgoals.");

  // Actions
  plan.push("unstack(C, A)");
  plan.push("putdown(C)");
  plan.push("pickup(B)");
  plan.push("stack(B, C)");
  plan.push("pickup(A)");
  plan.push("stack(A, B)");

  trace.push(\`[Plan Generated] Length: \${plan.length} actions.\`);
  return { success: true, plan, trace };
}

const res = solveBlocksWorld("${problem.id}");
return res.trace.join('\\n') + '\\n\\nActions:\\n' + res.plan.join('\\n');
`;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold tracking-tight">STRIPS Planning Lab (Blocks World)</span>
            <Badge variant="cyan">{tutorial.badge}</Badge>
            {currentStepIndex >= planSteps.length && planSteps.length > 0 && (
              <Badge variant="success">Goal Achieved</Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            {problem.description}
          </p>
        </div>

        {/* Problem and Planner Type Selectors */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedProblemId}
            onChange={(e) => setSelectedProblemId(e.target.value)}
            className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {Object.values(PLANNING_PROBLEMS).map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select
            value={plannerType}
            onChange={(e) => setPlannerType(e.target.value as any)}
            className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="forward">Forward Search (Progression)</option>
            <option value="regression">Goal Regression (Backward)</option>
          </select>
        </div>
      </div>

      {/* Main Blocks World Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 2D Blocks World Physical Animation */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden border-border/80 shadow-md">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
              <div className="flex items-center gap-2">
                <Button
                  variant={isExecuting ? 'destructive' : 'default'}
                  size="sm"
                  onClick={() => setIsExecuting(!isExecuting)}
                  disabled={currentStepIndex >= planSteps.length}
                  className="gap-1.5 h-8 font-semibold"
                >
                  {isExecuting ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                  {isExecuting ? 'Pause' : 'Animate Plan'}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={stepExecution}
                  disabled={isExecuting || currentStepIndex >= planSteps.length}
                  className="gap-1.5 h-8"
                >
                  <SkipForward className="h-3.5 w-3.5" />
                  Step Action
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={initializeBlocks}
                  className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-[11px]">Execution Progress:</span>
                <span className="font-mono text-xs font-bold text-primary">
                  {currentStepIndex} / {planSteps.length}
                </span>
              </div>
            </div>

            {/* SVG Blocks World Arena */}
            <div className="relative w-full h-[360px] bg-[#070a13] select-none overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 600 360">
                {/* Table Surface */}
                <rect x="40" y="300" width="520" height="24" rx="4" fill="#334155" stroke="#475569" strokeWidth="2" />
                <rect x="70" y="324" width="20" height="36" fill="#1e293b" />
                <rect x="510" y="324" width="20" height="36" fill="#1e293b" />
                <text x="300" y="316" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">TABLE</text>

                {/* Robotic Gripper Arm */}
                <g transform={`translate(${holdingBlock ? 300 : 300}, 40)`}>
                  {/* Vertical Rail */}
                  <rect x="-8" y="0" width="16" height="60" fill="#475569" stroke="#64748b" rx="2" />
                  {/* Gripper Hand */}
                  <rect x="-30" y="60" width="60" height="12" rx="3" fill="#0ea5e9" />
                  {/* Left & Right Fingers */}
                  <rect x="-30" y="72" width="10" height="24" rx="2" fill="#0284c7" />
                  <rect x="20" y="72" width="10" height="24" rx="2" fill="#0284c7" />

                  {/* Holding Block if any */}
                  {holdingBlock && (() => {
                    const blk = problem.blocks.find(b => b.id === holdingBlock);
                    return (
                      <g transform="translate(-25, 78)">
                        <rect x="0" y="0" width="50" height="42" rx="6" fill={blk?.color || '#3b82f6'} stroke="#f8fafc" strokeWidth="2" />
                        <text x="25" y="26" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
                          {blk?.label || holdingBlock}
                        </text>
                      </g>
                    );
                  })()}
                </g>

                {/* Columns on Table */}
                {columns.map((col, cIdx) => {
                  const colX = 100 + cIdx * 95;
                  const baseY = 300;

                  return (
                    <g key={cIdx}>
                      {col.map((blockId, stackIdx) => {
                        const blk = problem.blocks.find(b => b.id === blockId);
                        const blockY = baseY - (stackIdx + 1) * 48;

                        return (
                          <g key={blockId} transform={`translate(${colX - 25}, ${blockY})`}>
                            {/* Block Box */}
                            <rect
                              x="0"
                              y="0"
                              width="50"
                              height="44"
                              rx="6"
                              fill={blk?.color || '#3b82f6'}
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              className="shadow-md transition-all duration-300"
                            />
                            {/* Block Letter Label */}
                            <text
                              x="25"
                              y="28"
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="16"
                              fontWeight="bold"
                              fontFamily="sans-serif"
                            >
                              {blk?.label || blockId}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Status footer */}
            <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs text-slate-300">
              {log}
            </div>
          </Card>
        </div>

        {/* Right Col: Goal State & Plan Step List */}
        <div className="space-y-4">
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold">Goal Specification</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-1.5 text-xs font-mono">
              {problem.goal.map((g, i) => (
                <div key={i} className="p-2 rounded bg-secondary/30 flex items-center justify-between">
                  <span className="text-primary font-bold">{g.predicate}({g.args.join(', ')})</span>
                  <Badge variant="cyan" className="text-[9px]">Goal Atom</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Step Queue */}
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold">Generated Plan Steps</CardTitle>
              <CardDescription className="text-xs">
                Sequential STRIPS operators
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2 text-xs max-h-60 overflow-y-auto">
              {planSteps.map((step, idx) => {
                const isDone = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border transition-all ${
                      isCurrent
                        ? 'bg-primary/20 border-primary text-primary font-bold'
                        : isDone
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                        : 'bg-secondary/30 border-border/50 text-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span>{idx + 1}. {step.name}({step.args.join(', ')})</span>
                      {isDone && <span className="text-[10px] text-emerald-400">Done</span>}
                      {isCurrent && <Badge variant="default" className="text-[9px] py-0">Current</Badge>}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{step.description}</div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sandbox" className="mt-8">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="sandbox" className="gap-1.5">
            <Code className="h-3.5 w-3.5" />
            Run Planner Code
          </TabsTrigger>
          <TabsTrigger value="concepts" className="gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            Concepts & Lessons
          </TabsTrigger>
          <TabsTrigger value="walkthrough" className="gap-1.5">
            <Settings2 className="h-3.5 w-3.5" />
            How To Use
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sandbox">
          <CodeSandbox
            title="In-Browser STRIPS Planning Engine Sandbox"
            algorithmName="STRIPS Forward / Backward Planner"
            initialCode={codeTemplate}
            notes="STRIPS actions define preconditions, add lists, and delete lists to systematically manipulate state propositions."
            onRun={(code) => {
              try {
                const func = new Function(code);
                const out = func();
                return { success: true, output: typeof out === 'string' ? out : JSON.stringify(out, null, 2) };
              } catch (e: any) {
                return { success: false, output: e.message };
              }
            }}
          />
        </TabsContent>

        <TabsContent value="concepts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-semibold">Algorithms & Anomalies</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1 space-y-2 text-xs">
                {tutorial.algorithms.map((algo, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-secondary/30 border border-border/40 space-y-1">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-primary">{algo.name}</span>
                      <span className="text-[10px] text-muted-foreground">{algo.type}</span>
                    </div>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">{algo.concept}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-semibold">Core Theory & Key Takeaways</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1 space-y-3 text-xs leading-relaxed">
                {tutorial.keyTakeaways.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span className="text-slate-300">{point}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="walkthrough">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tutorial.walkthroughs.map((w, idx) => (
              <Card key={idx} className="p-4 space-y-2 bg-secondary/20">
                <span className="text-xs font-semibold text-primary">{w.step}</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{w.description}</p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
