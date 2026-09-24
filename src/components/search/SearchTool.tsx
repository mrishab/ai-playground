import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, RotateCcw, HelpCircle, CheckCircle2, XCircle, Code, BookOpen, Settings2 } from 'lucide-react';
import { SEARCH_GRAPHS, SearchGraph, SearchNode } from '@/data/searchProblems';
import { TOOL_TUTORIALS } from '@/data/toolTutorials';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { Slider } from '../ui/Inputs';
import { CodeSandbox } from '../CodeSandbox';
import confetti from 'canvas-confetti';

type AlgorithmType = 'dfs' | 'bfs' | 'lcfs' | 'best_first' | 'astar' | 'mpp';

interface SearchPath {
  nodes: string[];
  cost: number;
  h: number;
  f: number;
}

interface StepHistoryState {
  frontier: SearchPath[];
  expanded: string[];
  currentNode: string | null;
  currentPath: string[];
  isGoalReached: boolean;
  logMessage: string;
}

export function SearchTool() {
  const [selectedGraphId, setSelectedGraphId] = useState<string>('vancouver');
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('astar');
  const [speed, setSpeed] = useState<number>(600);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isQuizMode, setIsQuizMode] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const graph: SearchGraph = SEARCH_GRAPHS[selectedGraphId] || SEARCH_GRAPHS.vancouver;
  const tutorial = TOOL_TUTORIALS.search;

  // Search Engine State
  const [frontier, setFrontier] = useState<SearchPath[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [isGoalReached, setIsGoalReached] = useState<boolean>(false);
  const [log, setLog] = useState<string>('Search initialized. Select an algorithm and click Step or Auto Search.');
  const [history, setHistory] = useState<StepHistoryState[]>([]);
  const [inspectedNode, setInspectedNode] = useState<SearchNode | null>(null);

  // Initialize search on graph or algorithm change
  const initializeSearch = () => {
    setIsPlaying(false);
    const startNode = graph.nodes.find(n => n.id === graph.startNode) || graph.nodes[0];
    const initialH = startNode ? startNode.h : 0;
    const initialPath: SearchPath = {
      nodes: [startNode.id],
      cost: 0,
      h: initialH,
      f: initialH
    };

    setFrontier([initialPath]);
    setExpanded([]);
    setCurrentNode(null);
    setCurrentPath([]);
    setIsGoalReached(false);
    setHistory([]);
    setQuizFeedback(null);
    setLog(`Initialized ${algorithm.toUpperCase()} from start node "${startNode.id}".`);
  };

  useEffect(() => {
    initializeSearch();
  }, [selectedGraphId, algorithm]);

  // Order frontier based on algorithm
  const orderFrontier = (paths: SearchPath[], algo: AlgorithmType): SearchPath[] => {
    const list = [...paths];
    switch (algo) {
      case 'dfs':
        // LIFO: last added is first (reverse chronological order)
        return list;
      case 'bfs':
        // FIFO: first added is first
        return list;
      case 'lcfs':
        // Lowest Cost First (g)
        return list.sort((a, b) => a.cost - b.cost);
      case 'best_first':
        // Greedy Best First (h)
        return list.sort((a, b) => a.h - b.h);
      case 'astar':
      case 'mpp':
        // A*: f = g + h
        return list.sort((a, b) => a.f - b.f);
      default:
        return list;
    }
  };

  // Perform single step of search
  const stepSearch = (): boolean => {
    if (isGoalReached || frontier.length === 0) {
      if (frontier.length === 0 && !isGoalReached) {
        setLog('Search completed: Frontier is empty, no goal path found.');
      }
      setIsPlaying(false);
      return false;
    }

    // Save previous state for step-back
    setHistory(prev => [
      ...prev,
      {
        frontier: [...frontier],
        expanded: [...expanded],
        currentNode,
        currentPath: [...currentPath],
        isGoalReached,
        logMessage: log
      }
    ]);

    // Dequeue next path
    let currentFrontier = [...frontier];
    const chosenPath = currentFrontier.shift()!;
    const headNodeId = chosenPath.nodes[chosenPath.nodes.length - 1];

    setCurrentNode(headNodeId);
    setCurrentPath(chosenPath.nodes);

    // Check if goal reached
    if (graph.goalNodes.includes(headNodeId)) {
      setIsGoalReached(true);
      setLog(`Goal "${headNodeId}" reached! Total cost: ${chosenPath.cost.toFixed(1)}. Path: ${chosenPath.nodes.join(' -> ')}`);
      setIsPlaying(false);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      return false;
    }

    // Check Multi-Path Pruning
    if (algorithm === 'mpp' && expanded.includes(headNodeId)) {
      setLog(`Multi-path pruning: Node "${headNodeId}" already expanded with optimal cost. Pruning path.`);
      setFrontier(currentFrontier);
      return true;
    }

    const newExpanded = [...expanded, headNodeId];
    setExpanded(newExpanded);

    // Expand neighbors
    const outgoingEdges = graph.edges.filter(e => e.from === headNodeId);
    const newPaths: SearchPath[] = [];

    for (const edge of outgoingEdges) {
      const neighborId = edge.to;
      // Cycle checking along current path
      if (chosenPath.nodes.includes(neighborId)) continue;

      const neighborNode = graph.nodes.find(n => n.id === neighborId);
      const neighborH = neighborNode ? neighborNode.h : 0;
      const newCost = chosenPath.cost + edge.cost;
      const newF = newCost + neighborH;

      newPaths.push({
        nodes: [...chosenPath.nodes, neighborId],
        cost: newCost,
        h: neighborH,
        f: newF
      });
    }

    let updatedFrontier: SearchPath[];
    if (algorithm === 'dfs') {
      // Put new paths at front (LIFO)
      updatedFrontier = [...newPaths, ...currentFrontier];
    } else {
      updatedFrontier = [...currentFrontier, ...newPaths];
    }

    const sortedFrontier = orderFrontier(updatedFrontier, algorithm);
    setFrontier(sortedFrontier);
    setLog(`Expanded "${headNodeId}". Added ${newPaths.length} successor paths to frontier.`);
    return true;
  };

  // Step back
  const stepBack = () => {
    if (history.length === 0) return;
    const prevState = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setFrontier(prevState.frontier);
    setExpanded(prevState.expanded);
    setCurrentNode(prevState.currentNode);
    setCurrentPath(prevState.currentPath);
    setIsGoalReached(prevState.isGoalReached);
    setLog(`Stepped back: ${prevState.logMessage}`);
  };

  // Auto-play timer
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && !isGoalReached) {
      timer = setTimeout(() => {
        const canContinue = stepSearch();
        if (!canContinue) setIsPlaying(false);
      }, 1050 - speed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, frontier, isGoalReached, speed]);

  // Quiz Click Handler
  const handleNodeQuizClick = (nodeId: string) => {
    if (!isQuizMode || isGoalReached || frontier.length === 0) return;
    const expectedPath = frontier[0];
    const expectedNextNode = expectedPath.nodes[expectedPath.nodes.length - 1];

    if (nodeId === expectedNextNode) {
      setQuizScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      setQuizFeedback(`Correct! "${nodeId}" has the highest priority in the ${algorithm.toUpperCase()} frontier.`);
      stepSearch();
    } else {
      setQuizScore(prev => ({ correct: prev.correct, total: prev.total + 1 }));
      setQuizFeedback(`Incorrect. You clicked "${nodeId}", but "${expectedNextNode}" is at the front of the queue.`);
    }
  };

  // Algorithm code template for sandbox
  const codeTemplate = `// In-Browser A* Graph Search Implementation
function aStarSearch(startNodeId, goalNodeIds, graph) {
  const frontier = [{
    nodeId: startNodeId,
    path: [startNodeId],
    g: 0,
    h: graph.nodes.find(n => n.id === startNodeId)?.h || 0,
    f: graph.nodes.find(n => n.id === startNodeId)?.h || 0
  }];
  
  const visited = new Set();
  const logs = [];

  while (frontier.length > 0) {
    // Sort frontier by f(n) = g(n) + h(n)
    frontier.sort((a, b) => a.f - b.f);
    const current = frontier.shift();
    logs.push(\`Expanding node: \${current.nodeId} (g=\${current.g}, h=\${current.h}, f=\${current.f})\`);

    if (goalNodeIds.includes(current.nodeId)) {
      logs.push(\`GOAL FOUND: \${current.path.join(' -> ')} with cost \${current.g}\`);
      return { success: true, path: current.path, cost: current.g, logs };
    }

    if (visited.has(current.nodeId)) continue;
    visited.add(current.nodeId);

    const edges = graph.edges.filter(e => e.from === current.nodeId);
    for (const edge of edges) {
      if (current.path.includes(edge.to)) continue; // cycle check
      const neighborNode = graph.nodes.find(n => n.id === edge.to);
      const h = neighborNode ? neighborNode.h : 0;
      const g = current.g + edge.cost;
      frontier.push({
        nodeId: edge.to,
        path: [...current.path, edge.to],
        g: g,
        h: h,
        f: g + h
      });
    }
  }

  return { success: false, logs };
}

// Execute search on current graph
const result = aStarSearch("${graph.startNode}", ${JSON.stringify(graph.goalNodes)}, {
  nodes: ${JSON.stringify(graph.nodes.slice(0, 8))},
  edges: ${JSON.stringify(graph.edges.slice(0, 10))}
});
return result.logs.join('\\n');
`;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold tracking-tight">Graph Searching Lab</span>
            <Badge variant="cyan">{tutorial.badge}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            {graph.description}
          </p>
        </div>

        {/* Graph & Algo Picker */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedGraphId}
            onChange={(e) => setSelectedGraphId(e.target.value)}
            className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {Object.values(SEARCH_GRAPHS).map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>

          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
            className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="astar">A* Search (g + h)</option>
            <option value="best_first">Greedy Best-First (h)</option>
            <option value="lcfs">Lowest-Cost-First (Dijkstra)</option>
            <option value="bfs">Breadth-First Search (BFS)</option>
            <option value="dfs">Depth-First Search (DFS)</option>
            <option value="mpp">Multi-Path Pruning (MPP)</option>
          </select>
        </div>
      </div>

      {/* Main Visualizer & Controller Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Graph Canvas & Animation Controls */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden border-border/80 shadow-md">
            {/* Canvas Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-secondary/30 border-b border-border text-xs">
              <div className="flex items-center gap-2">
                <Button
                  variant={isPlaying ? 'destructive' : 'default'}
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={isGoalReached || frontier.length === 0}
                  className="gap-1.5 font-semibold h-8"
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                  {isPlaying ? 'Pause' : 'Auto Search'}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={stepSearch}
                  disabled={isPlaying || isGoalReached || frontier.length === 0}
                  className="gap-1.5 h-8"
                >
                  <SkipForward className="h-3.5 w-3.5" />
                  Step
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={stepBack}
                  disabled={isPlaying || history.length === 0}
                  className="h-8 text-xs"
                >
                  Step Back
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={initializeSearch}
                  className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>

              {/* Speed Slider */}
              <div className="flex items-center gap-2 w-36">
                <span className="text-[11px] text-muted-foreground whitespace-nowrap">Speed:</span>
                <Slider
                  min={100}
                  max={950}
                  step={50}
                  value={speed}
                  onChange={setSpeed}
                  className="h-1.5"
                />
              </div>

              {/* Quiz Toggle */}
              <Button
                variant={isQuizMode ? 'accent' : 'outline'}
                size="sm"
                onClick={() => {
                  setIsQuizMode(!isQuizMode);
                  setQuizFeedback(null);
                }}
                className="gap-1.5 h-8 text-xs"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                {isQuizMode ? 'Exit Quiz' : 'Quiz Mode'}
              </Button>
            </div>

            {/* Quiz Banner if enabled */}
            {isQuizMode && (
              <div className="bg-indigo-950/40 border-b border-indigo-500/30 px-4 py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Badge variant="purple">Quiz Mode Active</Badge>
                  <span className="text-indigo-200">
                    Which node will be expanded next? Click on the node on the graph!
                  </span>
                </div>
                <div className="font-semibold text-indigo-300">
                  Score: {quizScore.correct} / {quizScore.total}
                </div>
              </div>
            )}

            {/* Feedback notification */}
            {quizFeedback && (
              <div className={`px-4 py-2 text-xs border-b flex items-center gap-2 ${
                quizFeedback.startsWith('Correct') 
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
              }`}>
                {quizFeedback.startsWith('Correct') ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <span>{quizFeedback}</span>
              </div>
            )}

            {/* SVG Graph Canvas */}
            <div className="relative w-full h-[420px] bg-[#070a13] select-none overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 640 420">
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="7"
                    markerHeight="7"
                    refX="20"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 7 3.5, 0 7" fill="#64748b" />
                  </marker>
                  <marker
                    id="arrowhead-path"
                    markerWidth="8"
                    markerHeight="8"
                    refX="22"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3.5, 0 7" fill="#10b981" />
                  </marker>
                </defs>

                {/* Edges */}
                {graph.edges.map((edge, idx) => {
                  const fromNode = graph.nodes.find(n => n.id === edge.from);
                  const toNode = graph.nodes.find(n => n.id === edge.to);
                  if (!fromNode || !toNode) return null;

                  const isEdgeInCurrentPath = currentPath.some((nodeId, i) => {
                    return i < currentPath.length - 1 && currentPath[i] === edge.from && currentPath[i + 1] === edge.to;
                  });

                  const midX = (fromNode.x + toNode.x) / 2;
                  const midY = (fromNode.y + toNode.y) / 2;

                  return (
                    <g key={idx}>
                      <line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={isEdgeInCurrentPath ? '#10b981' : '#334155'}
                        strokeWidth={isEdgeInCurrentPath ? 3.5 : 1.5}
                        markerEnd={isEdgeInCurrentPath ? 'url(#arrowhead-path)' : 'url(#arrowhead)'}
                        className="transition-colors duration-300"
                      />
                      {/* Edge Cost Label */}
                      <rect
                        x={midX - 12}
                        y={midY - 9}
                        width="24"
                        height="18"
                        rx="4"
                        fill="#0f172a"
                        stroke="#334155"
                        strokeWidth="1"
                      />
                      <text
                        x={midX}
                        y={midY + 3.5}
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="10"
                        fontWeight="600"
                        fontFamily="monospace"
                      >
                        {edge.cost}
                      </text>
                    </g>
                  );
                })}

                {/* Nodes */}
                {graph.nodes.map(node => {
                  const isCurrent = currentNode === node.id;
                  const isExpandedNode = expanded.includes(node.id);
                  const isFrontierNode = frontier.some(p => p.nodes[p.nodes.length - 1] === node.id);
                  const isInSolution = isGoalReached && currentPath.includes(node.id);

                  let fill = '#1e293b';
                  let stroke = '#475569';
                  let strokeWidth = 2;

                  if (node.isStart) {
                    fill = '#064e3b';
                    stroke = '#10b981';
                    strokeWidth = 3;
                  }
                  if (node.isGoal) {
                    fill = '#78350f';
                    stroke = '#f59e0b';
                    strokeWidth = 3;
                  }
                  if (isFrontierNode) {
                    fill = '#0c4a6e';
                    stroke = '#38bdf8';
                    strokeWidth = 2.5;
                  }
                  if (isExpandedNode) {
                    fill = '#31104b';
                    stroke = '#a855f7';
                    strokeWidth = 2;
                  }
                  if (isCurrent) {
                    fill = '#1d4ed8';
                    stroke = '#60a5fa';
                    strokeWidth = 3.5;
                  }
                  if (isInSolution) {
                    fill = '#047857';
                    stroke = '#34d399';
                    strokeWidth = 4;
                  }

                  return (
                    <g
                      key={node.id}
                      onClick={() => {
                        setInspectedNode(node);
                        if (isQuizMode) handleNodeQuizClick(node.id);
                      }}
                      className="cursor-pointer transition-transform hover:scale-110"
                    >
                      {/* Glow on current */}
                      {isCurrent && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="28"
                          fill="none"
                          stroke="#60a5fa"
                          strokeWidth="2"
                          opacity="0.6"
                          className="animate-ping"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="18"
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        className="transition-colors duration-200"
                      />

                      {/* Goal Outer Ring */}
                      {node.isGoal && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="23"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                      )}

                      {/* Node Name */}
                      <text
                        x={node.x}
                        y={node.y + 4}
                        textAnchor="middle"
                        fill="#f8fafc"
                        fontSize="11"
                        fontWeight="700"
                        className="pointer-events-none"
                      >
                        {node.id}
                      </text>

                      {/* Node Heuristic Value Pill */}
                      <g transform={`translate(${node.x}, ${node.y - 23})`}>
                        <rect
                          x="-14"
                          y="-9"
                          width="28"
                          height="14"
                          rx="3"
                          fill="#0f172a"
                          stroke="#38bdf8"
                          strokeWidth="0.8"
                        />
                        <text
                          x="0"
                          y="1.5"
                          textAnchor="middle"
                          fill="#38bdf8"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="600"
                        >
                          h={node.h}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              {/* Legend Overlay */}
              <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur px-3 py-1.5 rounded-lg border border-border/60 text-[10px] flex items-center gap-3 text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Start</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Goal</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" /> Frontier</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> Explored</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Current</span>
              </div>
            </div>

            {/* Status log footer */}
            <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs flex items-center justify-between">
              <span className="text-slate-300">{log}</span>
              <span className="text-[11px] text-muted-foreground">
                Frontier paths: <strong className="text-primary">{frontier.length}</strong> | Expanded: <strong className="text-purple-400">{expanded.length}</strong>
              </span>
            </div>
          </Card>
        </div>

        {/* Right Col: Frontier Table & Inspector */}
        <div className="space-y-4">
          {/* Node Inspector Card */}
          {inspectedNode && (
            <Card className="border-cyan-500/30 bg-cyan-950/10 shadow-sm animate-in fade-in">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span>Node Inspector: {inspectedNode.id}</span>
                  <Badge variant="cyan">{inspectedNode.isStart ? 'Start' : (inspectedNode.isGoal ? 'Goal' : 'Intermediate')}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-1 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Heuristic h({inspectedNode.id}):</span>
                  <span className="font-mono font-bold text-sky-400">{inspectedNode.h}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coordinates:</span>
                  <span className="font-mono text-slate-300">({inspectedNode.x}, {inspectedNode.y})</span>
                </div>
                <div className="text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                  Outgoing: {graph.edges.filter(e => e.from === inspectedNode.id).map(e => `${e.to} (cost ${e.cost})`).join(', ') || 'None'}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Frontier Priority Table */}
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="p-4 pb-2.5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Frontier Queue</CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  Priority: {algorithm.toUpperCase()}
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Active paths waiting to be expanded
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 pt-1">
              {frontier.length === 0 ? (
                <div className="text-center py-6 text-xs text-muted-foreground">
                  Frontier is empty.
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
                  {frontier.map((path, idx) => {
                    const isNext = idx === 0;
                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg border text-xs transition-colors ${
                          isNext
                            ? 'bg-sky-950/40 border-sky-500/40 text-sky-200'
                            : 'bg-secondary/40 border-border/50 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono font-medium mb-1">
                          <span className="truncate max-w-[170px]" title={path.nodes.join(' -> ')}>
                            {path.nodes.join(' → ')}
                          </span>
                          {isNext && <Badge variant="cyan" className="text-[9px] py-0 px-1.5">Next</Badge>}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                          <span>g = {path.cost.toFixed(1)}</span>
                          <span>h = {path.h.toFixed(1)}</span>
                          <span className="font-bold text-foreground">f = {path.f.toFixed(1)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Educational & Sandbox Tabs */}
      <Tabs defaultValue="sandbox" className="mt-8">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="sandbox" className="gap-1.5">
            <Code className="h-3.5 w-3.5" />
            Run Algorithm Code
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

        {/* Tab 1: Live Code Sandbox */}
        <TabsContent value="sandbox">
          <CodeSandbox
            title="Live Search Algorithm Sandbox"
            algorithmName="A* / Dijkstra Runner"
            initialCode={codeTemplate}
            notes="You can modify the heuristic tie-breaking, heuristic weighting f = g + w*h, or multi-path pruning logic directly in JavaScript."
            onRun={(code) => {
              try {
                // Execute code via sandbox function
                const func = new Function('graph', code);
                const out = func(graph);
                return { success: true, output: typeof out === 'string' ? out : JSON.stringify(out, null, 2) };
              } catch (e: any) {
                return { success: false, output: e.message };
              }
            }}
          />
        </TabsContent>

        {/* Tab 2: Concepts & Lessons */}
        <TabsContent value="concepts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-semibold">Algorithm Comparison</CardTitle>
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
                      <span>Optimal: {algo.optimal}</span>
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
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span className="text-slate-300">{point}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 3: Step-by-Step Walkthrough */}
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
