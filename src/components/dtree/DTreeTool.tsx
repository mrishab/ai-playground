import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, GitFork, Table, CheckCircle2, Code, BookOpen, Settings2 } from 'lucide-react';
import { DTREE_DATASETS, DTreeDataset } from '@/data/dtreeProblems';
import { TOOL_TUTORIALS } from '@/data/toolTutorials';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { CodeSandbox } from '../CodeSandbox';
import confetti from 'canvas-confetti';

interface TreeNode {
  id: string;
  attribute?: string;
  isLeaf: boolean;
  prediction?: string;
  classCounts: Record<string, number>;
  entropy: number;
  children: { value: string; node: TreeNode }[];
}

export function DTreeTool() {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('playTennis');
  const dataset: DTreeDataset = DTREE_DATASETS[selectedDatasetId] || DTREE_DATASETS.playTennis;
  const tutorial = TOOL_TUTORIALS.dtree;

  const [tree, setTree] = useState<TreeNode | null>(null);
  const [selectedSplitAttr, setSelectedSplitAttr] = useState<string>('');
  const [candidateGains, setCandidateGains] = useState<{ attr: string; gain: number }[]>([]);
  const [log, setLog] = useState<string>('Dataset loaded. Click Auto-Build Tree or manually split step-by-step.');

  // Calculate Shannon Entropy
  const calculateEntropy = (examples: Record<string, string>[]): number => {
    if (examples.length === 0) return 0;
    const counts: Record<string, number> = {};
    for (const ex of examples) {
      const targetVal = ex[dataset.target];
      counts[targetVal] = (counts[targetVal] || 0) + 1;
    }

    let entropy = 0;
    for (const count of Object.values(counts)) {
      const p = count / examples.length;
      if (p > 0) {
        entropy -= p * Math.log2(p);
      }
    }
    return entropy;
  };

  // Calculate Information Gain of attribute A
  const calculateInformationGain = (examples: Record<string, string>[], attr: string): number => {
    const baseEntropy = calculateEntropy(examples);
    const subsets: Record<string, Record<string, string>[]> = {};

    for (const ex of examples) {
      const val = ex[attr];
      if (!subsets[val]) subsets[val] = [];
      subsets[val].push(ex);
    }

    let remainder = 0;
    for (const subset of Object.values(subsets)) {
      const weight = subset.length / examples.length;
      remainder += weight * calculateEntropy(subset);
    }

    return Math.max(0, baseEntropy - remainder);
  };

  // Compute gains for candidate attributes
  const updateCandidateGains = (examples: Record<string, string>[], usedAttrs: string[]) => {
    const candidates = dataset.attributes.filter(a => !usedAttrs.includes(a));
    const gains = candidates.map(a => ({
      attr: a,
      gain: calculateInformationGain(examples, a)
    }));
    gains.sort((a, b) => b.gain - a.gain);
    setCandidateGains(gains);
    if (gains.length > 0) {
      setSelectedSplitAttr(gains[0].attr);
    }
  };

  // Build root node
  const initializeDTree = () => {
    const counts: Record<string, number> = {};
    for (const ex of dataset.examples) {
      counts[ex[dataset.target]] = (counts[ex[dataset.target]] || 0) + 1;
    }

    const root: TreeNode = {
      id: 'root',
      isLeaf: false,
      classCounts: counts,
      entropy: calculateEntropy(dataset.examples),
      children: []
    };

    setTree(root);
    updateCandidateGains(dataset.examples, []);
    setLog(`Initialized decision tree with ${dataset.examples.length} examples.`);
  };

  useEffect(() => {
    initializeDTree();
  }, [selectedDatasetId]);

  // Split tree on chosen attribute
  const splitNode = (attrToSplit: string) => {
    if (!tree) return;
    const values = dataset.attributeValues[attrToSplit] || [];

    const newChildren: { value: string; node: TreeNode }[] = [];
    for (const val of values) {
      const matching = dataset.examples.filter(ex => ex[attrToSplit] === val);
      const counts: Record<string, number> = {};
      for (const ex of matching) {
        counts[ex[dataset.target]] = (counts[ex[dataset.target]] || 0) + 1;
      }

      // Check if pure leaf
      const isPure = Object.keys(counts).length <= 1;
      const majorityClass = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

      newChildren.push({
        value: val,
        node: {
          id: `node-${attrToSplit}-${val}`,
          isLeaf: isPure,
          prediction: isPure ? majorityClass : undefined,
          classCounts: counts,
          entropy: calculateEntropy(matching),
          children: []
        }
      });
    }

    setTree(prev => prev ? {
      ...prev,
      attribute: attrToSplit,
      children: newChildren
    } : null);

    setLog(`Split root on "${attrToSplit}" into ${newChildren.length} branches.`);
    confetti({ particleCount: 40, spread: 60 });
  };

  // Full Recursive Tree Builder (ID3)
  const autoBuildTree = () => {
    function build(examples: Record<string, string>[], availableAttrs: string[]): TreeNode {
      const counts: Record<string, number> = {};
      for (const ex of examples) {
        counts[ex[dataset.target]] = (counts[ex[dataset.target]] || 0) + 1;
      }

      const isPure = Object.keys(counts).length <= 1;
      const majority = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

      if (isPure || availableAttrs.length === 0) {
        return {
          id: `leaf-${Math.random()}`,
          isLeaf: true,
          prediction: majority,
          classCounts: counts,
          entropy: calculateEntropy(examples),
          children: []
        };
      }

      // Find best attribute by information gain
      let bestAttr = availableAttrs[0];
      let maxGain = -1;
      for (const attr of availableAttrs) {
        const g = calculateInformationGain(examples, attr);
        if (g > maxGain) {
          maxGain = g;
          bestAttr = attr;
        }
      }

      const values = dataset.attributeValues[bestAttr] || [];
      const children: { value: string; node: TreeNode }[] = [];
      const remainingAttrs = availableAttrs.filter(a => a !== bestAttr);

      for (const val of values) {
        const subset = examples.filter(ex => ex[bestAttr] === val);
        if (subset.length === 0) {
          children.push({
            value: val,
            node: {
              id: `leaf-empty-${Math.random()}`,
              isLeaf: true,
              prediction: majority,
              classCounts: {},
              entropy: 0,
              children: []
            }
          });
        } else {
          children.push({
            value: val,
            node: build(subset, remainingAttrs)
          });
        }
      }

      return {
        id: `node-${bestAttr}-${Math.random()}`,
        attribute: bestAttr,
        isLeaf: false,
        classCounts: counts,
        entropy: calculateEntropy(examples),
        children
      };
    }

    const fullTree = build(dataset.examples, dataset.attributes);
    setTree(fullTree);
    setLog('Built complete decision tree using ID3 algorithm.');
    confetti({ particleCount: 70, spread: 80 });
  };

  const codeTemplate = `// ID3 Decision Tree Induction in Browser
function id3(examples, attributes, target) {
  function entropy(rows) {
    const counts = {};
    rows.forEach(r => counts[r[target]] = (counts[r[target]] || 0) + 1);
    return Object.values(counts).reduce((ent, count) => {
      const p = count / rows.length;
      return ent - p * Math.log2(p);
    }, 0);
  }

  function infoGain(rows, attr) {
    const baseEnt = entropy(rows);
    const groups = {};
    rows.forEach(r => {
      groups[r[attr]] = groups[r[attr]] || [];
      groups[r[attr]].push(r);
    });
    const rem = Object.values(groups).reduce((acc, g) => acc + (g.length / rows.length) * entropy(g), 0);
    return baseEnt - rem;
  }

  // Calculate gains for each candidate feature
  const gains = attributes.map(a => ({ attribute: a, gain: infoGain(examples, a) }));
  gains.sort((a, b) => b.gain - a.gain);
  return gains;
}

const gains = id3(${JSON.stringify(dataset.examples)}, ${JSON.stringify(dataset.attributes)}, "${dataset.target}");
return JSON.stringify(gains, null, 2);
`;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold tracking-tight">Decision Tree Induction Lab</span>
            <Badge variant="cyan">{tutorial.badge}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            {dataset.description}
          </p>
        </div>

        {/* Dataset picker */}
        <select
          value={selectedDatasetId}
          onChange={(e) => setSelectedDatasetId(e.target.value)}
          className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {Object.values(DTREE_DATASETS).map(ds => (
            <option key={ds.id} value={ds.id}>{ds.name}</option>
          ))}
        </select>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Tree Visualizer */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden border-border/80 shadow-md">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={autoBuildTree}
                  className="gap-1.5 h-8 font-semibold"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  Auto-Build Full Tree (ID3)
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={initializeDTree}
                  className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>

              {/* Step Split Controls */}
              {candidateGains.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-muted-foreground">Split on:</span>
                  <select
                    value={selectedSplitAttr}
                    onChange={(e) => setSelectedSplitAttr(e.target.value)}
                    className="h-8 px-2 text-xs rounded border border-input bg-card text-foreground"
                  >
                    {candidateGains.map(cg => (
                      <option key={cg.attr} value={cg.attr}>
                        {cg.attr} (Gain: {cg.gain.toFixed(3)})
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="accent"
                    size="sm"
                    onClick={() => splitNode(selectedSplitAttr)}
                    className="gap-1 h-8 text-xs"
                  >
                    <GitFork className="h-3.5 w-3.5" />
                    Split
                  </Button>
                </div>
              )}
            </div>

            {/* Tree Canvas */}
            <div className="p-8 bg-[#070a13] min-h-[380px] flex flex-col items-center justify-start overflow-x-auto">
              {tree ? (
                <div className="flex flex-col items-center space-y-8 w-full">
                  {/* Root Node */}
                  <div className="p-3.5 rounded-xl bg-primary/20 border-2 border-primary text-center shadow-lg min-w-[140px]">
                    <div className="font-bold text-sm text-primary">
                      {tree.attribute ? `Split: ${tree.attribute}` : 'Root Node (Unsplit)'}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                      Entropy: {tree.entropy.toFixed(3)}
                    </div>
                    <div className="flex justify-center gap-1.5 mt-1.5">
                      {Object.entries(tree.classCounts).map(([cls, cnt]) => (
                        <span key={cls} className="text-[10px] px-1.5 py-0.5 rounded bg-card/80 font-mono text-slate-300">
                          {cls}: {cnt}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Children Branches */}
                  {tree.children.length > 0 && (
                    <div className="flex flex-wrap items-start justify-center gap-6 w-full pt-4 border-t border-border/40 relative">
                      {tree.children.map((child, idx) => (
                        <div key={idx} className="flex flex-col items-center space-y-2">
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary font-mono text-cyan-300 border border-border">
                            = {child.value}
                          </span>

                          {/* Child Node / Leaf */}
                          <div className={`p-3 rounded-xl border text-center shadow min-w-[120px] ${
                            child.node.isLeaf
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                              : 'bg-secondary/40 border-border text-slate-200'
                          }`}>
                            <div className="font-bold text-xs">
                              {child.node.isLeaf ? `Class: ${child.node.prediction}` : (child.node.attribute || 'Intermediate')}
                            </div>
                            <div className="text-[9px] text-muted-foreground font-mono mt-0.5">
                              Entropy: {child.node.entropy.toFixed(3)}
                            </div>
                            <div className="flex justify-center gap-1 mt-1">
                              {Object.entries(child.node.classCounts).map(([cls, cnt]) => (
                                <span key={cls} className="text-[9px] px-1 py-0.2 rounded bg-card/60 font-mono">
                                  {cls}:{cnt}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-xs text-muted-foreground py-16">
                  Click Auto-Build to generate tree.
                </div>
              )}
            </div>

            {/* Footer log */}
            <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs text-slate-300">
              {log}
            </div>
          </Card>
        </div>

        {/* Right Col: Information Gain Ranking & Example Data Table */}
        <div className="space-y-4">
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold">Information Gain Ranking</CardTitle>
              <CardDescription className="text-xs">
                Candidate attribute impurity reduction
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2 text-xs">
              {candidateGains.map((cg, i) => (
                <div key={cg.attr} className="p-2.5 rounded-lg bg-secondary/30 border border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{cg.attr}</span>
                    {i === 0 && <Badge variant="cyan" className="text-[9px] py-0">Best Split</Badge>}
                  </div>
                  <span className="font-mono text-cyan-400 font-semibold">
                    Gain: {cg.gain.toFixed(4)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Dataset Examples Table */}
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                <Table className="h-4 w-4 text-primary" />
                Training Examples ({dataset.examples.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <div className="max-h-56 overflow-y-auto border border-border/40 rounded-lg">
                <table className="w-full text-[11px] text-left">
                  <thead className="bg-secondary/50 font-semibold border-b border-border/40 text-muted-foreground sticky top-0">
                    <tr>
                      {dataset.attributes.map(a => <th key={a} className="p-1.5">{a}</th>)}
                      <th className="p-1.5 text-primary">{dataset.target}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataset.examples.map((ex, i) => (
                      <tr key={i} className="border-b border-border/20 hover:bg-secondary/20 font-mono">
                        {dataset.attributes.map(a => <td key={a} className="p-1.5 text-muted-foreground">{ex[a]}</td>)}
                        <td className="p-1.5 font-bold text-foreground">{ex[dataset.target]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sandbox" className="mt-8">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="sandbox" className="gap-1.5">
            <Code className="h-3.5 w-3.5" />
            Run ID3 Code
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
            title="In-Browser Decision Tree Induction Sandbox"
            algorithmName="ID3 Algorithm"
            initialCode={codeTemplate}
            notes="Information Gain measures the expected reduction in entropy achieved by partitioning examples according to an attribute."
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
                <CardTitle className="text-sm font-semibold">Algorithms & Metrics</CardTitle>
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
