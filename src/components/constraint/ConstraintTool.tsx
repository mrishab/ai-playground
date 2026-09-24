import React, { useState, useEffect } from 'react';
import { Play, SkipForward, RotateCcw, GitBranch, ArrowLeft, CheckCircle2, AlertTriangle, Code, BookOpen, Settings2 } from 'lucide-react';
import { CSP_PROBLEMS, CSPProblem, CSPVariable, CSPConstraint } from '@/data/cspProblems';
import { TOOL_TUTORIALS } from '@/data/toolTutorials';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { CodeSandbox } from '../CodeSandbox';
import confetti from 'canvas-confetti';

interface ArcItem {
  varName: string;
  constraint: CSPConstraint;
}

interface SplitTreeNode {
  id: string;
  varName: string;
  value: string;
  parent: string | null;
  status: 'active' | 'solved' | 'failed';
}

export function ConstraintTool() {
  const [selectedProblemId, setSelectedProblemId] = useState<string>('simple1');
  const problem: CSPProblem = CSP_PROBLEMS[selectedProblemId] || CSP_PROBLEMS.simple1;
  const tutorial = TOOL_TUTORIALS.constraint;

  // Working domains for each variable
  const [domains, setDomains] = useState<Record<string, string[]>>({});
  // Arc queue for AC-3
  const [arcQueue, setArcQueue] = useState<ArcItem[]>([]);
  const [currentArc, setCurrentArc] = useState<ArcItem | null>(null);
  const [log, setLog] = useState<string>('CSP loaded. Click Fine Step or Auto AC to begin constraint propagation.');
  const [splitHistory, setSplitHistory] = useState<SplitTreeNode[]>([]);
  const [activeSplitId, setActiveSplitId] = useState<string | null>(null);
  const [domainBackups, setDomainBackups] = useState<{ id: string; domains: Record<string, string[]> }[]>([]);
  const [selectedVarToSplit, setSelectedVarToSplit] = useState<string>('');

  // Initialize CSP
  const initializeCSP = () => {
    const initDomains: Record<string, string[]> = {};
    for (const v of problem.variables) {
      initDomains[v.name] = [...v.domain];
    }
    setDomains(initDomains);

    // Build all arcs: for each constraint and each variable in that constraint
    const initArcs: ArcItem[] = [];
    for (const c of problem.constraints) {
      for (const vName of c.variables) {
        initArcs.push({ varName: vName, constraint: c });
      }
    }
    setArcQueue(initArcs);
    setCurrentArc(null);
    setSplitHistory([]);
    setActiveSplitId(null);
    setDomainBackups([]);
    setSelectedVarToSplit(problem.variables[0]?.name || '');
    setLog(`Initialized CSP "${problem.name}" with ${problem.variables.length} variables and ${problem.constraints.length} constraints.`);
  };

  useEffect(() => {
    initializeCSP();
  }, [selectedProblemId]);

  // Check if value x in D(varX) is supported by other variables in constraint C
  const isValueSupported = (
    varX: string,
    valX: string,
    constraint: CSPConstraint,
    currentDomains: Record<string, string[]>
  ): boolean => {
    // If extensional allowed table is provided
    if (constraint.allowed && constraint.allowed.length > 0) {
      const varIndex = constraint.variables.indexOf(varX);
      if (varIndex === -1) return true;

      // Find at least one matching tuple where tuple[varIndex] == valX and all other tuple elements exist in their respective domains
      return constraint.allowed.some(tuple => {
        if (tuple[varIndex] !== valX) return false;
        for (let i = 0; i < constraint.variables.length; i++) {
          if (i === varIndex) continue;
          const otherVar = constraint.variables[i];
          const otherVal = tuple[i];
          if (!currentDomains[otherVar] || !currentDomains[otherVar].includes(otherVal)) {
            return false;
          }
        }
        return true;
      });
    }

    // Default constraint logic (inequality != or <)
    const otherVar = constraint.variables.find(v => v !== varX);
    if (!otherVar || !currentDomains[otherVar]) return true;

    if (constraint.name.includes('!=')) {
      // supported if otherVar has any value != valX
      return currentDomains[otherVar].some(v => v !== valX);
    }
    if (constraint.name.includes('<') && constraint.variables[0] === varX) {
      // varX < otherVar -> supported if otherVar has value > valX
      const numX = parseFloat(valX);
      return currentDomains[otherVar].some(v => parseFloat(v) > numX);
    }
    if (constraint.name.includes('<') && constraint.variables[1] === varX) {
      // otherVar < varX -> supported if otherVar has value < valX
      const numX = parseFloat(valX);
      return currentDomains[otherVar].some(v => parseFloat(v) < numX);
    }

    // Default assume supported
    return true;
  };

  // Fine Step: evaluate a single arc (X, C)
  const fineStep = (): boolean => {
    if (arcQueue.length === 0) {
      setLog('Arc Consistency reached! No remaining arcs in queue.');
      // Check if all variables have domain size 1
      const isSolved = Object.values(domains).every(d => d.length === 1);
      if (isSolved) {
        confetti({ particleCount: 50, spread: 60 });
        setLog('CSP completely solved by Arc Consistency alone!');
      }
      return false;
    }

    const queueCopy = [...arcQueue];
    const arc = queueCopy.shift()!;
    setCurrentArc(arc);

    const varName = arc.varName;
    const currentDomain = domains[varName] || [];
    const prunedValues: string[] = [];
    const remainingValues: string[] = [];

    for (const val of currentDomain) {
      if (isValueSupported(varName, val, arc.constraint, domains)) {
        remainingValues.push(val);
      } else {
        prunedValues.push(val);
      }
    }

    if (prunedValues.length > 0) {
      const updatedDomains = { ...domains, [varName]: remainingValues };
      setDomains(updatedDomains);

      if (remainingValues.length === 0) {
        setLog(`DOMAIN WIPEOUT! Domain of ${varName} is empty. Inconsistent branch.`);
        setArcQueue([]);
        return false;
      }

      // Add back neighboring arcs (Y, C') where Y != varName
      const newArcsToAdd: ArcItem[] = [];
      for (const c of problem.constraints) {
        if (c.variables.includes(varName)) {
          for (const otherV of c.variables) {
            if (otherV !== varName) {
              const alreadyInQueue = queueCopy.some(a => a.varName === otherV && a.constraint === c);
              if (!alreadyInQueue) {
                newArcsToAdd.push({ varName: otherV, constraint: c });
              }
            }
          }
        }
      }
      setArcQueue([...queueCopy, ...newArcsToAdd]);
      setLog(`Pruned {${prunedValues.join(', ')}} from ${varName}. Added ${newArcsToAdd.length} dependent arcs back to queue.`);
    } else {
      setArcQueue(queueCopy);
      setLog(`Arc (${varName}, ${arc.constraint.name}) is consistent. No values pruned.`);
    }

    return true;
  };

  // Auto AC-3
  const autoAC = () => {
    let steps = 0;
    let keepGoing = true;
    while (keepGoing && steps < 200) {
      keepGoing = fineStep();
      steps++;
    }
  };

  // Domain Split on selected variable
  const performDomainSplit = (varName: string) => {
    const domain = domains[varName];
    if (!domain || domain.length <= 1) {
      setLog(`Cannot split ${varName}: domain has 1 or 0 values.`);
      return;
    }

    const valToPick = domain[0];
    const remaining = domain.slice(1);
    const newSplitId = `split-${Date.now()}`;

    // Backup current domains for backtracking
    setDomainBackups(prev => [...prev, { id: newSplitId, domains: { ...domains } }]);

    // Set domain to single value
    const updated = { ...domains, [varName]: [valToPick] };
    setDomains(updated);

    // Re-queue all arcs
    const newArcs: ArcItem[] = [];
    for (const c of problem.constraints) {
      for (const v of c.variables) {
        newArcs.push({ varName: v, constraint: c });
      }
    }
    setArcQueue(newArcs);

    const newNode: SplitTreeNode = {
      id: newSplitId,
      varName,
      value: valToPick,
      parent: activeSplitId,
      status: 'active'
    };
    setSplitHistory(prev => [...prev, newNode]);
    setActiveSplitId(newSplitId);
    setLog(`Split domain of ${varName}: Testing branch ${varName} = "${valToPick}".`);
  };

  // Backtrack
  const backtrack = () => {
    if (domainBackups.length === 0) {
      setLog('Backtrack failed: Already at root of search space.');
      return;
    }
    const lastBackup = domainBackups[domainBackups.length - 1];
    setDomainBackups(prev => prev.slice(0, -1));
    setDomains(lastBackup.domains);

    // Re-queue arcs
    const newArcs: ArcItem[] = [];
    for (const c of problem.constraints) {
      for (const v of c.variables) {
        newArcs.push({ varName: v, constraint: c });
      }
    }
    setArcQueue(newArcs);
    setLog('Backtracked to previous domain state.');
  };

  // Check if solved
  const isCSPFullySolved = Object.values(domains).every(d => d && d.length === 1);
  const hasDomainWipeout = Object.values(domains).some(d => !d || d.length === 0);

  // Sandbox Code template
  const codeTemplate = `// AC-3 Constraint Propagation in Browser
function ac3(variables, constraints) {
  const domains = {};
  variables.forEach(v => domains[v.name] = [...v.domain]);
  
  const queue = [];
  constraints.forEach(c => {
    c.variables.forEach(v => queue.push({ varName: v, constraint: c }));
  });

  const trace = [];

  while (queue.length > 0) {
    const { varName, constraint } = queue.shift();
    const otherVar = constraint.variables.find(v => v !== varName);
    const initialSize = domains[varName].length;

    // Filter values without support
    domains[varName] = domains[varName].filter(x => {
      if (!otherVar) return true;
      if (constraint.name.includes('!=')) {
        return domains[otherVar].some(y => y !== x);
      }
      return true;
    });

    if (domains[varName].length < initialSize) {
      trace.push(\`Pruned values from \${varName}. Remaining: [\${domains[varName]}]\`);
      if (domains[varName].length === 0) {
        return { success: false, reason: \`Wipeout on \${varName}\`, trace };
      }
      // Re-add arcs
      constraints.filter(c => c.variables.includes(varName)).forEach(c => {
        c.variables.filter(v => v !== varName).forEach(other => {
          queue.push({ varName: other, constraint: c });
        });
      });
    }
  }

  return { success: true, domains, trace };
}

const result = ac3(${JSON.stringify(problem.variables)}, ${JSON.stringify(problem.constraints)});
return JSON.stringify(result, null, 2);
`;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold tracking-tight">Consistency Based CSP Solver</span>
            <Badge variant="purple">{tutorial.badge}</Badge>
            {isCSPFullySolved && <Badge variant="success">Solved</Badge>}
            {hasDomainWipeout && <Badge variant="destructive">Domain Wipeout</Badge>}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            {problem.description}
          </p>
        </div>

        {/* Problem selector */}
        <div className="flex items-center gap-2.5">
          <select
            value={selectedProblemId}
            onChange={(e) => setSelectedProblemId(e.target.value)}
            className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {Object.values(CSP_PROBLEMS).map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Visual CSP Network & Domain Control */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive CSP Graph & Arc Toolbar */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden border-border/80 shadow-md">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={fineStep}
                  disabled={arcQueue.length === 0}
                  className="gap-1.5 h-8 font-semibold"
                >
                  <SkipForward className="h-3.5 w-3.5" />
                  Fine Step (Single Arc)
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={autoAC}
                  disabled={arcQueue.length === 0}
                  className="gap-1.5 h-8"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Auto Arc Consistency
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={backtrack}
                  disabled={domainBackups.length === 0}
                  className="gap-1.5 h-8 text-xs"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Backtrack
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={initializeCSP}
                  className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>

              {/* Split Trigger */}
              <div className="flex items-center gap-1.5">
                <select
                  value={selectedVarToSplit}
                  onChange={(e) => setSelectedVarToSplit(e.target.value)}
                  className="h-8 px-2 text-[11px] rounded border border-input bg-card text-foreground"
                >
                  {problem.variables.map(v => (
                    <option key={v.name} value={v.name}>
                      Split {v.name} ({domains[v.name]?.length || 0})
                    </option>
                  ))}
                </select>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => performDomainSplit(selectedVarToSplit)}
                  disabled={!domains[selectedVarToSplit] || domains[selectedVarToSplit].length <= 1}
                  className="h-8 text-xs gap-1"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  Domain Split
                </Button>
              </div>
            </div>

            {/* SVG CSP Graph */}
            <div className="relative w-full h-[400px] bg-[#070a13] select-none overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 620 400">
                {/* Constraint Connection Edges & Diamonds */}
                {problem.constraints.map((c, cIdx) => {
                  const vars = c.variables.map(vName => problem.variables.find(pv => pv.name === vName)).filter(Boolean) as CSPVariable[];
                  if (vars.length < 2) return null;

                  const [v1, v2] = vars;
                  const isCurrentConstraint = currentArc?.constraint === c;
                  const midX = (v1.x + v2.x) / 2;
                  const midY = (v1.y + v2.y) / 2;

                  return (
                    <g key={cIdx}>
                      {/* Connection Line */}
                      <line
                        x1={v1.x}
                        y1={v1.y}
                        x2={v2.x}
                        y2={v2.y}
                        stroke={isCurrentConstraint ? '#a855f7' : '#334155'}
                        strokeWidth={isCurrentConstraint ? 2.5 : 1.5}
                        strokeDasharray={isCurrentConstraint ? '4 2' : 'none'}
                        className="transition-colors duration-200"
                      />

                      {/* Constraint Diamond / Box */}
                      <g transform={`translate(${midX}, ${midY})`}>
                        <polygon
                          points="0,-12 12,0 0,12 -12,0"
                          fill={isCurrentConstraint ? '#4c1d95' : '#0f172a'}
                          stroke={isCurrentConstraint ? '#c084fc' : '#475569'}
                          strokeWidth="1.5"
                        />
                        <text
                          x="0"
                          y="3"
                          textAnchor="middle"
                          fill="#e2e8f0"
                          fontSize="8"
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          C
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* Variable Nodes */}
                {problem.variables.map(v => {
                  const currentDomain = domains[v.name] || [];
                  const isSingle = currentDomain.length === 1;
                  const isEmpty = currentDomain.length === 0;
                  const isBeingEvaluated = currentArc?.varName === v.name;

                  let stroke = '#3b82f6';
                  let fill = '#0f172a';

                  if (isSingle) {
                    stroke = '#10b981';
                    fill = '#064e3b';
                  } else if (isEmpty) {
                    stroke = '#ef4444';
                    fill = '#450a0a';
                  } else if (isBeingEvaluated) {
                    stroke = '#a855f7';
                    fill = '#3b0764';
                  }

                  return (
                    <g key={v.name} className="transition-all duration-300">
                      {/* Active Evaluation Ping */}
                      {isBeingEvaluated && (
                        <circle
                          cx={v.x}
                          cy={v.y}
                          r="34"
                          fill="none"
                          stroke="#c084fc"
                          strokeWidth="1.5"
                          opacity="0.6"
                          className="animate-ping"
                        />
                      )}

                      {/* Main Node */}
                      <circle
                        cx={v.x}
                        cy={v.y}
                        r="25"
                        fill={fill}
                        stroke={stroke}
                        strokeWidth="2.5"
                      />

                      {/* Variable Name */}
                      <text
                        x={v.x}
                        y={v.y - 4}
                        textAnchor="middle"
                        fill="#f8fafc"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {v.name}
                      </text>

                      {/* Domain Values Display pill */}
                      <g transform={`translate(${v.x}, ${v.y + 11})`}>
                        <text
                          x="0"
                          y="0"
                          textAnchor="middle"
                          fill={isEmpty ? '#f87171' : (isSingle ? '#6ee7b7' : '#94a3b8')}
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="600"
                        >
                          {isEmpty ? '∅' : (currentDomain.length <= 4 ? `{${currentDomain.join(',')}}` : `|D|=${currentDomain.length}`)}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              {/* Status bar inside canvas */}
              <div className="absolute top-2 left-2 bg-card/80 backdrop-blur px-3 py-1.5 rounded-lg border border-border/60 text-[11px] text-muted-foreground flex items-center gap-3">
                <span>Arcs in Agenda: <strong className="text-primary">{arcQueue.length}</strong></span>
                <span>Active Branch: <strong className="text-purple-400">{activeSplitId ? 'Split Branch' : 'Root'}</strong></span>
              </div>
            </div>

            {/* Log footer */}
            <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs flex items-center justify-between">
              <span className="text-slate-300 truncate max-w-xl">{log}</span>
              {hasDomainWipeout && (
                <span className="flex items-center gap-1 text-destructive font-semibold text-xs">
                  <AlertTriangle className="h-3.5 w-3.5" /> Wipeout
                </span>
              )}
              {isCSPFullySolved && (
                <span className="flex items-center gap-1 text-emerald-400 font-semibold text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Valid Assignment
                </span>
              )}
            </div>
          </Card>
        </div>

        {/* Right Col: Domains Detail Table & Split History */}
        <div className="space-y-4">
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold">Variable Domains</CardTitle>
              <CardDescription className="text-xs">
                Active remaining candidate values
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2.5">
              {problem.variables.map(v => {
                const currentVals = domains[v.name] || [];
                const initialVals = v.domain;

                return (
                  <div key={v.name} className="p-2.5 rounded-lg bg-secondary/30 border border-border/50 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-foreground">{v.name}</span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {currentVals.length} / {initialVals.length} values
                      </span>
                    </div>

                    {/* Value chips with strikethrough for pruned */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {initialVals.map(val => {
                        const isPruned = !currentVals.includes(val);
                        return (
                          <span
                            key={val}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                              isPruned
                                ? 'bg-destructive/10 text-destructive/50 line-through'
                                : (currentVals.length === 1
                                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                                    : 'bg-primary/10 text-primary border border-primary/20')
                            }`}
                          >
                            {val}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Search Tree History of Splits */}
          {splitHistory.length > 0 && (
            <Card className="border-border/80 shadow-sm">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                  <GitBranch className="h-4 w-4 text-purple-400" />
                  Domain Splitting Tree
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1 text-xs space-y-1.5">
                {splitHistory.map((s, i) => (
                  <div key={s.id} className="flex items-center justify-between p-2 rounded bg-purple-950/20 border border-purple-500/30 text-purple-200">
                    <span>Depth {i + 1}: <strong>{s.varName} = "{s.value}"</strong></span>
                    <Badge variant="purple" className="text-[10px]">Active</Badge>
                  </div>
                ))}
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
            Run AC-3 Code
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
            title="In-Browser AC-3 Propagation Sandbox"
            algorithmName="AC-3 Engine"
            initialCode={codeTemplate}
            notes="You can inspect or extend the consistency checker to support ternary and n-ary table constraints."
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
                <CardTitle className="text-sm font-semibold">Algorithms & Time Complexities</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1 space-y-2 text-xs">
                {tutorial.algorithms.map((algo, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-secondary/30 border border-border/40 space-y-1">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-primary">{algo.name}</span>
                      <span className="text-[10px] text-muted-foreground">{algo.type}</span>
                    </div>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">{algo.concept}</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono pt-1">
                      <span>Time: {algo.time}</span>
                      <span>Space: {algo.space}</span>
                    </div>
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
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
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
