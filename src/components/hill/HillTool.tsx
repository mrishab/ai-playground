import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, RotateCcw, BarChart3, Flame, Shuffle, Code, BookOpen, Settings2 } from 'lucide-react';
import { CSP_PROBLEMS, CSPProblem } from '@/data/cspProblems';
import { TOOL_TUTORIALS } from '@/data/toolTutorials';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { Slider } from '../ui/Inputs';
import { CodeSandbox } from '../CodeSandbox';
import confetti from 'canvas-confetti';

type SLSAlgorithm = 'greedy' | 'min_conflicts' | 'random_walk' | 'annealing' | 'tabu';

interface BatchResult {
  trials: number;
  successes: number;
  avgSteps: number;
  stepDistribution: number[];
}

export function HillTool() {
  const [selectedProblemId, setSelectedProblemId] = useState<string>('scheduling1');
  const [algorithm, setAlgorithm] = useState<SLSAlgorithm>('min_conflicts');
  const [randomWalkProb, setRandomWalkProb] = useState<number>(0.1);
  const [temperature, setTemperature] = useState<number>(10.0);
  const [tabuTenure, setTabuTenure] = useState<number>(5);
  const [speed, setSpeed] = useState<number>(700);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const problem: CSPProblem = CSP_PROBLEMS[selectedProblemId] || CSP_PROBLEMS.scheduling1;
  const tutorial = TOOL_TUTORIALS.hill;

  // SLS State: Total assignment
  const [assignment, setAssignment] = useState<Record<string, string>>({});
  const [conflicts, setConflicts] = useState<number>(0);
  const [stepCount, setStepCount] = useState<number>(0);
  const [conflictHistory, setConflictHistory] = useState<number[]>([]);
  const [tabuList, setTabuList] = useState<{ varName: string; val: string }[]>([]);
  const [log, setLog] = useState<string>('Initialized random total assignment.');
  const [batchStats, setBatchStats] = useState<BatchResult | null>(null);

  // Compute number of conflicts for an assignment
  const evaluateConflicts = (currentAssign: Record<string, string>): number => {
    let count = 0;
    for (const c of problem.constraints) {
      if (c.variables.length < 2) continue;
      const v1 = c.variables[0];
      const v2 = c.variables[1];
      const val1 = currentAssign[v1];
      const val2 = currentAssign[v2];
      if (!val1 || !val2) continue;

      if (c.allowed && c.allowed.length > 0) {
        // Must match at least one allowed tuple
        const isSatisfied = c.allowed.some(t => t[0] === val1 && t[1] === val2);
        if (!isSatisfied) count++;
      } else if (c.name.includes('!=')) {
        if (val1 === val2) count++;
      } else if (c.name.includes('<')) {
        if (c.variables[0] === v1 && parseFloat(val1) >= parseFloat(val2)) count++;
      }
    }
    return count;
  };

  // Initialize random total assignment
  const initializeAssignment = () => {
    setIsPlaying(false);
    const initAssign: Record<string, string> = {};
    for (const v of problem.variables) {
      // Pick random value from domain
      const randomVal = v.domain[Math.floor(Math.random() * v.domain.length)];
      initAssign[v.name] = randomVal;
    }
    const initConflicts = evaluateConflicts(initAssign);
    setAssignment(initAssign);
    setConflicts(initConflicts);
    setStepCount(0);
    setConflictHistory([initConflicts]);
    setTabuList([]);
    setBatchStats(null);
    setLog(`Generated random total assignment with ${initConflicts} initial conflicts.`);
  };

  useEffect(() => {
    initializeAssignment();
  }, [selectedProblemId]);

  // Single step of SLS
  const stepSLS = (): boolean => {
    if (conflicts === 0) {
      setIsPlaying(false);
      setLog(`Solution found in ${stepCount} steps!`);
      confetti({ particleCount: 60, spread: 70 });
      return false;
    }

    let nextAssign = { ...assignment };
    let newConflicts = conflicts;

    if (algorithm === 'min_conflicts') {
      // Find conflicted variables
      const conflictedVars: string[] = [];
      for (const c of problem.constraints) {
        if (c.variables.length < 2) continue;
        const [v1, v2] = c.variables;
        if (c.name.includes('!=') && assignment[v1] === assignment[v2]) {
          conflictedVars.push(v1, v2);
        }
      }
      const uniqueConflicted = Array.from(new Set(conflictedVars));
      const targetVar = uniqueConflicted.length > 0
        ? uniqueConflicted[Math.floor(Math.random() * uniqueConflicted.length)]
        : problem.variables[Math.floor(Math.random() * problem.variables.length)].name;

      const varObj = problem.variables.find(v => v.name === targetVar)!;
      let bestVal = assignment[targetVar];
      let minConf = 9999;

      for (const val of varObj.domain) {
        const testAssign = { ...assignment, [targetVar]: val };
        const score = evaluateConflicts(testAssign);
        if (score < minConf) {
          minConf = score;
          bestVal = val;
        }
      }

      nextAssign[targetVar] = bestVal;
      newConflicts = minConf;
      setLog(`Min-Conflicts: Changed ${targetVar} = ${bestVal} (conflicts: ${minConf}).`);
    } else if (algorithm === 'random_walk') {
      // Random walk with probability p, greedy descent with 1-p
      const isRandom = Math.random() < randomWalkProb;
      const targetVar = problem.variables[Math.floor(Math.random() * problem.variables.length)];
      if (isRandom) {
        const randomVal = targetVar.domain[Math.floor(Math.random() * targetVar.domain.length)];
        nextAssign[targetVar.name] = randomVal;
        newConflicts = evaluateConflicts(nextAssign);
        setLog(`Random Walk step: ${targetVar.name} = ${randomVal} (conflicts: ${newConflicts}).`);
      } else {
        let bestVal = assignment[targetVar.name];
        let minConf = 9999;
        for (const val of targetVar.domain) {
          const test = { ...assignment, [targetVar.name]: val };
          const c = evaluateConflicts(test);
          if (c < minConf) {
            minConf = c;
            bestVal = val;
          }
        }
        nextAssign[targetVar.name] = bestVal;
        newConflicts = minConf;
        setLog(`Greedy step: ${targetVar.name} = ${bestVal} (conflicts: ${minConf}).`);
      }
    } else if (algorithm === 'annealing') {
      const targetVar = problem.variables[Math.floor(Math.random() * problem.variables.length)];
      const candidateVal = targetVar.domain[Math.floor(Math.random() * targetVar.domain.length)];
      const testAssign = { ...assignment, [targetVar.name]: candidateVal };
      const testConf = evaluateConflicts(testAssign);
      const delta = testConf - conflicts;

      if (delta < 0 || Math.random() < Math.exp(-delta / Math.max(0.01, temperature))) {
        nextAssign = testAssign;
        newConflicts = testConf;
        setLog(`Annealing accepted: ${targetVar.name} = ${candidateVal} (delta=${delta}, T=${temperature.toFixed(2)}).`);
      } else {
        setLog(`Annealing rejected: ${targetVar.name} = ${candidateVal} (delta=${delta}).`);
      }
      setTemperature(prev => Math.max(0.05, prev * 0.995));
    } else if (algorithm === 'tabu') {
      // Tabu search
      const targetVar = problem.variables[Math.floor(Math.random() * problem.variables.length)];
      let bestVal = assignment[targetVar.name];
      let minConf = 9999;

      for (const val of targetVar.domain) {
        const isTabu = tabuList.some(item => item.varName === targetVar.name && item.val === val);
        if (isTabu) continue;
        const test = { ...assignment, [targetVar.name]: val };
        const c = evaluateConflicts(test);
        if (c < minConf) {
          minConf = c;
          bestVal = val;
        }
      }

      nextAssign[targetVar.name] = bestVal;
      newConflicts = minConf;
      setTabuList(prev => [...prev.slice(-tabuTenure), { varName: targetVar.name, val: bestVal }]);
      setLog(`Tabu move: ${targetVar.name} = ${bestVal} (conflicts: ${minConf}).`);
    } else {
      // Pure greedy descent
      let bestAssign = assignment;
      let minConf = conflicts;
      let movedVar = '';
      let movedVal = '';

      for (const v of problem.variables) {
        for (const val of v.domain) {
          if (assignment[v.name] === val) continue;
          const test = { ...assignment, [v.name]: val };
          const c = evaluateConflicts(test);
          if (c < minConf) {
            minConf = c;
            bestAssign = test;
            movedVar = v.name;
            movedVal = val;
          }
        }
      }

      if (minConf < conflicts) {
        nextAssign = bestAssign;
        newConflicts = minConf;
        setLog(`Greedy descent: ${movedVar} = ${movedVal} (conflicts: ${minConf}).`);
      } else {
        setLog('Local Optimum plateau reached! Greedy descent cannot improve.');
        setIsPlaying(false);
        return false;
      }
    }

    setAssignment(nextAssign);
    setConflicts(newConflicts);
    setStepCount(prev => prev + 1);
    setConflictHistory(prev => [...prev.slice(-100), newConflicts]);

    if (newConflicts === 0) {
      setIsPlaying(false);
      setLog(`SUCCESS! Solution found in ${stepCount + 1} steps!`);
      confetti({ particleCount: 70, spread: 80 });
      return false;
    }
    return true;
  };

  // Auto-run timer
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && conflicts > 0) {
      timer = setTimeout(() => {
        const canContinue = stepSLS();
        if (!canContinue) setIsPlaying(false);
      }, 1050 - speed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, conflicts, assignment, algorithm, speed, temperature]);

  // Run Batch Experiments
  const runBatchRuns = (trials = 50) => {
    setIsPlaying(false);
    let successes = 0;
    let totalSteps = 0;
    const distribution: number[] = [];

    for (let t = 0; t < trials; t++) {
      // random restart
      const current: Record<string, string> = {};
      for (const v of problem.variables) {
        current[v.name] = v.domain[Math.floor(Math.random() * v.domain.length)];
      }

      let step = 0;
      let currConf = evaluateConflicts(current);
      while (currConf > 0 && step < 150) {
        // min-conflicts move
        const targetVar = problem.variables[Math.floor(Math.random() * problem.variables.length)];
        let bestVal = current[targetVar.name];
        let minC = 9999;
        for (const val of targetVar.domain) {
          const test = { ...current, [targetVar.name]: val };
          const c = evaluateConflicts(test);
          if (c < minC) {
            minC = c;
            bestVal = val;
          }
        }
        current[targetVar.name] = bestVal;
        currConf = minC;
        step++;
      }

      if (currConf === 0) {
        successes++;
        totalSteps += step;
        distribution.push(step);
      }
    }

    setBatchStats({
      trials,
      successes,
      avgSteps: successes > 0 ? totalSteps / successes : 0,
      stepDistribution: distribution
    });
    setLog(`Batch run finished: ${successes}/${trials} trials solved successfully.`);
  };

  // Sandbox Code template
  const codeTemplate = `// Stochastic Local Search: Min-Conflicts in Browser
function minConflicts(problem, maxSteps = 100) {
  const assignment = {};
  problem.variables.forEach(v => {
    assignment[v.name] = v.domain[Math.floor(Math.random() * v.domain.length)];
  });

  function countConflicts(assign) {
    let conf = 0;
    problem.constraints.forEach(c => {
      const [v1, v2] = c.variables;
      if (c.name.includes('!=') && assign[v1] === assign[v2]) conf++;
    });
    return conf;
  }

  const history = [];
  for (let step = 0; step < maxSteps; step++) {
    const conflicts = countConflicts(assignment);
    history.push({ step, conflicts });
    if (conflicts === 0) {
      return { success: true, steps: step, assignment, history };
    }

    // Pick variable at random
    const target = problem.variables[Math.floor(Math.random() * problem.variables.length)];
    let bestVal = assignment[target.name];
    let minC = 999;

    target.domain.forEach(val => {
      const test = { ...assignment, [target.name]: val };
      const c = countConflicts(test);
      if (c < minC) {
        minC = c;
        bestVal = val;
      }
    });
    assignment[target.name] = bestVal;
  }

  return { success: false, assignment, history };
}

const res = minConflicts(${JSON.stringify(problem)});
return JSON.stringify(res, null, 2);
`;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold tracking-tight">Stochastic Local Search (SLS)</span>
            <Badge variant="warning">{tutorial.badge}</Badge>
            {conflicts === 0 && <Badge variant="success">Solved ({stepCount} steps)</Badge>}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            {problem.description}
          </p>
        </div>

        {/* Problem and SLS Strategy Selectors */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedProblemId}
            onChange={(e) => setSelectedProblemId(e.target.value)}
            className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {Object.values(CSP_PROBLEMS).map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as SLSAlgorithm)}
            className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="min_conflicts">Min-Conflicts Heuristic</option>
            <option value="random_walk">Greedy + Random Walk (p-walk)</option>
            <option value="annealing">Simulated Annealing</option>
            <option value="tabu">Tabu Search</option>
            <option value="greedy">Greedy Descent</option>
          </select>
        </div>
      </div>

      {/* Main Visualizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Assignment Board & Conflict Plot */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden border-border/80 shadow-md">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
              <div className="flex items-center gap-2">
                <Button
                  variant={isPlaying ? 'destructive' : 'default'}
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={conflicts === 0}
                  className="gap-1.5 h-8 font-semibold"
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                  {isPlaying ? 'Pause' : 'Auto Search'}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={stepSLS}
                  disabled={isPlaying || conflicts === 0}
                  className="gap-1.5 h-8"
                >
                  <SkipForward className="h-3.5 w-3.5" />
                  Step
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={initializeAssignment}
                  className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Random Restart
                </Button>
              </div>

              {/* Batch Run Button */}
              <Button
                variant="accent"
                size="sm"
                onClick={() => runBatchRuns(50)}
                className="gap-1.5 h-8 text-xs"
              >
                <BarChart3 className="h-3.5 w-3.5" />
                Batch 50 Trials
              </Button>
            </div>

            {/* Total Assignment Cards Grid */}
            <div className="p-4 bg-[#070a13] border-b border-border">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-muted-foreground font-semibold">Total Assignment State</span>
                <div className="flex items-center gap-2">
                  <Badge variant={conflicts === 0 ? 'success' : 'destructive'} className="font-mono">
                    {conflicts} Violated Constraints
                  </Badge>
                  <span className="text-[11px] text-muted-foreground font-mono">Step: {stepCount}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                {problem.variables.map(v => {
                  const val = assignment[v.name] || '-';
                  return (
                    <div
                      key={v.name}
                      className="p-3 rounded-xl bg-card border border-border/80 flex flex-col items-center justify-center space-y-1 shadow-sm transition-all"
                    >
                      <span className="text-xs font-semibold text-muted-foreground">{v.name}</span>
                      <span className="text-base font-bold font-mono text-primary">{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Real-time Conflict Plot (SVG Line Chart) */}
            <div className="p-4 bg-[#060810]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-medium text-slate-300">Conflict Trajectory (Violations vs Iterations)</span>
                <span className="text-[10px] text-muted-foreground">Last {conflictHistory.length} Steps</span>
              </div>

              <div className="h-28 w-full bg-[#0b0f19] rounded-lg border border-border/50 relative overflow-hidden flex items-end px-2 pt-2 pb-1">
                {conflictHistory.length > 1 ? (
                  <svg className="w-full h-full" viewBox={`0 0 ${Math.max(10, conflictHistory.length * 10)} 100`} preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      points={conflictHistory
                        .map((c, i) => `${i * 10},${Math.max(5, 95 - c * 10)}`)
                        .join(' ')}
                    />
                  </svg>
                ) : (
                  <div className="w-full text-center text-xs text-muted-foreground py-8">
                    Run steps to generate conflict convergence plot.
                  </div>
                )}
              </div>
            </div>

            {/* Log footer */}
            <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs text-slate-300">
              {log}
            </div>
          </Card>
        </div>

        {/* Right Col: Hyperparameters & Batch Stats */}
        <div className="space-y-4">
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold">Algorithm Parameters</CardTitle>
              <CardDescription className="text-xs">
                Fine-tune stochastic escape mechanisms
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-4 text-xs">
              {algorithm === 'random_walk' && (
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Random Walk Prob (p):</span>
                    <span className="font-mono text-amber-400 font-bold">{randomWalkProb.toFixed(2)}</span>
                  </div>
                  <Slider min={0.01} max={0.9} step={0.05} value={randomWalkProb} onChange={setRandomWalkProb} />
                </div>
              )}

              {algorithm === 'annealing' && (
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temperature (T):</span>
                    <span className="font-mono text-rose-400 font-bold">{temperature.toFixed(2)}</span>
                  </div>
                  <Slider min={0.1} max={50} step={0.5} value={temperature} onChange={setTemperature} />
                </div>
              )}

              {algorithm === 'tabu' && (
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tabu Tenure:</span>
                    <span className="font-mono text-purple-400 font-bold">{tabuTenure}</span>
                  </div>
                  <Slider min={1} max={20} step={1} value={tabuTenure} onChange={setTabuTenure} />
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Animation Speed:</span>
                  <span className="font-mono text-primary font-bold">{speed}</span>
                </div>
                <Slider min={100} max={950} step={50} value={speed} onChange={setSpeed} />
              </div>
            </CardContent>
          </Card>

          {/* Batch Run Statistics Card */}
          {batchStats && (
            <Card className="border-indigo-500/40 bg-indigo-950/15 shadow-sm animate-in fade-in">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-semibold text-indigo-300">
                  Batch Run Statistics ({batchStats.trials} Trials)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Success Rate:</span>
                  <span className="font-bold text-emerald-400">
                    {((batchStats.successes / batchStats.trials) * 100).toFixed(1)}% ({batchStats.successes}/{batchStats.trials})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Steps to Solve:</span>
                  <span className="font-mono text-cyan-300 font-bold">{batchStats.avgSteps.toFixed(1)} steps</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sandbox" className="mt-8">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="sandbox" className="gap-1.5">
            <Code className="h-3.5 w-3.5" />
            Run SLS Code
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
            title="In-Browser SLS & Min-Conflicts Sandbox"
            algorithmName="Min-Conflicts / Annealing"
            initialCode={codeTemplate}
            notes="You can tweak the neighborhood evaluation function, probability distribution, or cooling schedule."
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
                <CardTitle className="text-sm font-semibold">Algorithms & Landscapes</CardTitle>
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
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
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
