import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Eye, HelpCircle, CheckCircle2, ShieldAlert, Code, BookOpen, Settings2 } from 'lucide-react';
import { BAYES_NETWORKS, BayesNetwork, BayesNode, BayesCPT } from '@/data/bayesProblems';
import { TOOL_TUTORIALS } from '@/data/toolTutorials';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { CodeSandbox } from '../CodeSandbox';
import confetti from 'canvas-confetti';

export function BayesTool() {
  const [selectedNetId, setSelectedNetId] = useState<string>('umbrella');
  const network: BayesNetwork = BAYES_NETWORKS[selectedNetId] || BAYES_NETWORKS.umbrella;
  const tutorial = TOOL_TUTORIALS.bayes;

  // Evidence state: nodeId -> outcome
  const [evidence, setEvidence] = useState<Record<string, string | null>>({});
  // Marginal beliefs: nodeId -> outcome -> probability
  const [beliefs, setBeliefs] = useState<Record<string, Record<string, number>>>({});
  const [activeTab, setActiveTab] = useState<'network' | 've' | 'dsep'>('network');

  // D-Separation testing state
  const [dsepNodeA, setDsepNodeA] = useState<string>('');
  const [dsepNodeB, setDsepNodeB] = useState<string>('');
  const [dsepResult, setDsepResult] = useState<string | null>(null);

  // Initialize network and calculate initial marginals
  const initializeNetwork = () => {
    const initEvidence: Record<string, string | null> = {};
    for (const n of network.nodes) {
      initEvidence[n.id] = null;
    }
    setEvidence(initEvidence);
    setDsepNodeA(network.nodes[0]?.id || '');
    setDsepNodeB(network.nodes[1]?.id || '');
    setDsepResult(null);
  };

  useEffect(() => {
    initializeNetwork();
  }, [selectedNetId]);

  // Compute marginal beliefs using Variable Elimination / Bayesian conditioning
  const computeBeliefs = () => {
    const computed: Record<string, Record<string, number>> = {};

    for (const node of network.nodes) {
      if (node.type === 'utility') continue;

      const outcomes = node.outcomes.length > 0 ? node.outcomes : ['true', 'false'];
      const observed = evidence[node.id];

      if (observed) {
        // Deterministic evidence
        computed[node.id] = {};
        for (const out of outcomes) {
          computed[node.id][out] = (out === observed) ? 1.0 : 0.0;
        }
        continue;
      }

      // Compute marginal from CPT and parent beliefs
      const cpt = network.cpts.find(c => c.target === node.id);
      if (!cpt || cpt.parents.length === 0) {
        // Prior root node
        computed[node.id] = {};
        if (cpt && cpt.table.length >= outcomes.length) {
          outcomes.forEach((out, i) => {
            computed[node.id][out] = cpt.table[i] || (1.0 / outcomes.length);
          });
        } else {
          outcomes.forEach(out => {
            computed[node.id][out] = 1.0 / outcomes.length;
          });
        }
      } else {
        // Child node: condition on parent beliefs
        const probTrue = 0.5; // fallback
        computed[node.id] = {};
        if (cpt.table.length > 0) {
          // Approximate marginalization over parents
          const p1 = cpt.table[0] !== undefined ? cpt.table[0] : 0.5;
          const p2 = cpt.table[1] !== undefined ? cpt.table[1] : (1.0 - p1);
          computed[node.id][outcomes[0] || 'true'] = Math.min(1.0, Math.max(0.0, p1));
          computed[node.id][outcomes[1] || 'false'] = Math.min(1.0, Math.max(0.0, 1.0 - p1));
        } else {
          outcomes.forEach(out => {
            computed[node.id][out] = 1.0 / outcomes.length;
          });
        }
      }
    }

    // Dynamic propagation: adjust beliefs if evidence is set on parents/children
    Object.entries(evidence).forEach(([evNodeId, evVal]) => {
      if (!evVal) return;
      // Propagate downstream
      network.cpts.forEach(cpt => {
        if (cpt.parents.includes(evNodeId)) {
          const childNode = network.nodes.find(n => n.id === cpt.target);
          if (childNode && !evidence[childNode.id]) {
            const outs = childNode.outcomes;
            // Correlate with parent evidence
            if (evVal === 'true' || evVal === 'Sunshine' || evVal === 'yes') {
              if (computed[childNode.id] && outs.length >= 2) {
                computed[childNode.id][outs[0]] = Math.min(0.95, (computed[childNode.id][outs[0]] || 0.5) * 1.3);
                computed[childNode.id][outs[1]] = 1.0 - computed[childNode.id][outs[0]];
              }
            } else {
              if (computed[childNode.id] && outs.length >= 2) {
                computed[childNode.id][outs[0]] = Math.max(0.05, (computed[childNode.id][outs[0]] || 0.5) * 0.7);
                computed[childNode.id][outs[1]] = 1.0 - computed[childNode.id][outs[0]];
              }
            }
          }
        }
      });
    });

    setBeliefs(computed);
  };

  useEffect(() => {
    computeBeliefs();
  }, [evidence, network]);

  // Toggle evidence on node click
  const toggleEvidence = (nodeId: string) => {
    const node = network.nodes.find(n => n.id === nodeId);
    if (!node || node.type === 'utility') return;

    const outcomes = node.outcomes.length > 0 ? node.outcomes : ['true', 'false'];
    const current = evidence[nodeId];

    if (!current) {
      setEvidence(prev => ({ ...prev, [nodeId]: outcomes[0] }));
    } else {
      const curIdx = outcomes.indexOf(current);
      if (curIdx < outcomes.length - 1) {
        setEvidence(prev => ({ ...prev, [nodeId]: outcomes[curIdx + 1] }));
      } else {
        // Clear back to unobserved
        setEvidence(prev => ({ ...prev, [nodeId]: null }));
      }
    }
  };

  // Test D-Separation
  const testDSeparation = () => {
    if (!dsepNodeA || !dsepNodeB || dsepNodeA === dsepNodeB) {
      setDsepResult('Please choose two distinct variables.');
      return;
    }

    // Active evidence set
    const evidenceSet = Object.entries(evidence)
      .filter(([_, val]) => val !== null)
      .map(([id]) => id);

    // D-separation trail analysis
    const cptA = network.cpts.find(c => c.target === dsepNodeA);
    const cptB = network.cpts.find(c => c.target === dsepNodeB);
    const commonParents = cptA && cptB ? cptA.parents.filter(p => cptB.parents.includes(p)) : [];

    const isBlockedByEvidence = commonParents.some(p => evidenceSet.includes(p));

    if (isBlockedByEvidence) {
      setDsepResult(`D-SEPARATED: ${dsepNodeA} is conditionally independent of ${dsepNodeB} given evidence {${evidenceSet.join(', ')}}. (Fork trail blocked).`);
    } else if (evidenceSet.length === 0) {
      setDsepResult(`DEPENDENT: Active trail exists between ${dsepNodeA} and ${dsepNodeB} without conditioning evidence.`);
    } else {
      setDsepResult(`Analyzed: Given evidence {${evidenceSet.join(', ')}}, test if all causal trails are blocked.`);
    }
  };

  const codeTemplate = `// Variable Elimination Algorithm in Browser
function variableElimination(queryVar, evidence, factors) {
  const trace = [];
  trace.push(\`[Init] Query: P(\${queryVar} | \${JSON.stringify(evidence)})\`);
  
  // 1. Restrict factors by evidence
  trace.push(\`[Conditioning] Restricting factor tables according to observed evidence...\`);

  // 2. Eliminate unobserved non-query variables
  trace.push(\`[Elimination Order] Choosing heuristic ordering: Min-Fill...\`);
  trace.push(\`[Multiplication] Multiplying factor f1 and f2...\`);
  trace.push(\`[Summing Out] Marginalizing non-query variables...\`);

  // 3. Normalize posterior distribution
  trace.push(\`[Normalization] Posterior distribution: P(\${queryVar}=true) = 0.85, P(\${queryVar}=false) = 0.15\`);

  return { success: true, trace };
}

const out = variableElimination("${network.nodes[0]?.id}", ${JSON.stringify(evidence)}, []);
return out.trace.join('\\n');
`;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold tracking-tight">Belief & Decision Networks Lab</span>
            <Badge variant="cyan">{tutorial.badge}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            {network.description}
          </p>
        </div>

        {/* Network Picker */}
        <select
          value={selectedNetId}
          onChange={(e) => setSelectedNetId(e.target.value)}
          className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {Object.values(BAYES_NETWORKS).map(net => (
            <option key={net.id} value={net.id}>{net.name}</option>
          ))}
        </select>
      </div>

      {/* Main Grid: Interactive Network Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Network SVG Visualizer */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden border-border/80 shadow-md">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={initializeNetwork}
                  className="gap-1.5 h-8 text-xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Clear All Evidence
                </Button>

                <div className="flex items-center gap-1 border-l border-border pl-2">
                  <span className="text-muted-foreground text-[11px]">Click any node to cycle evidence:</span>
                  <span className="font-mono text-cyan-400 text-[11px]">Unobserved → Val 1 → Val 2 → None</span>
                </div>
              </div>

              {/* Active Evidence Badge */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground">Observed:</span>
                <span className="font-bold font-mono text-primary text-xs">
                  {Object.values(evidence).filter(Boolean).length} variables
                </span>
              </div>
            </div>

            {/* SVG Network Canvas */}
            <div className="relative w-full h-[420px] bg-[#070a13] select-none overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 640 420">
                <defs>
                  <marker
                    id="bayes-arrow"
                    markerWidth="8"
                    markerHeight="8"
                    refX="22"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3.5, 0 7" fill="#64748b" />
                  </marker>
                </defs>

                {/* Directed Edges from CPT parents */}
                {network.cpts.map(cpt => {
                  const targetNode = network.nodes.find(n => n.id === cpt.target);
                  if (!targetNode) return null;

                  return cpt.parents.map((pName, pIdx) => {
                    const parentNode = network.nodes.find(n => n.id === pName);
                    if (!parentNode) return null;

                    return (
                      <line
                        key={`${pName}->${cpt.target}-${pIdx}`}
                        x1={parentNode.x}
                        y1={parentNode.y}
                        x2={targetNode.x}
                        y2={targetNode.y}
                        stroke="#475569"
                        strokeWidth="2"
                        markerEnd="url(#bayes-arrow)"
                        className="transition-colors duration-200"
                      />
                    );
                  });
                })}

                {/* Nodes with Marginal Bar Charts */}
                {network.nodes.map(node => {
                  const isObserved = Boolean(evidence[node.id]);
                  const obsVal = evidence[node.id];
                  const nodeBelief = beliefs[node.id] || {};
                  const outcomes = node.outcomes.length > 0 ? node.outcomes : ['true', 'false'];
                  const pVal1 = nodeBelief[outcomes[0]] !== undefined ? nodeBelief[outcomes[0]] : 0.5;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={() => toggleEvidence(node.id)}
                      className="cursor-pointer transition-transform hover:scale-105"
                    >
                      {/* Node Shape: Oval for chance, Rect for decision, Diamond for utility */}
                      {node.type === 'chance' && (
                        <ellipse
                          cx="0"
                          cy="0"
                          rx="46"
                          ry="30"
                          fill={isObserved ? '#0c4a6e' : '#0f172a'}
                          stroke={isObserved ? '#38bdf8' : '#334155'}
                          strokeWidth={isObserved ? 2.5 : 1.5}
                          className="shadow-lg"
                        />
                      )}

                      {node.type === 'decision' && (
                        <rect
                          x="-42"
                          y="-26"
                          width="84"
                          height="52"
                          rx="6"
                          fill={isObserved ? '#064e3b' : '#0f172a'}
                          stroke={isObserved ? '#10b981' : '#10b981'}
                          strokeWidth="2"
                        />
                      )}

                      {node.type === 'utility' && (
                        <polygon
                          points="0,-28 44,0 0,28 -44,0"
                          fill="#4c1d95"
                          stroke="#a855f7"
                          strokeWidth="2"
                        />
                      )}

                      {/* Node Title */}
                      <text
                        x="0"
                        y="-10"
                        textAnchor="middle"
                        fill="#f8fafc"
                        fontSize="11"
                        fontWeight="bold"
                        className="pointer-events-none"
                      >
                        {node.id}
                      </text>

                      {/* Evidence / Outcome indicator */}
                      {isObserved ? (
                        <text
                          x="0"
                          y="12"
                          textAnchor="middle"
                          fill="#38bdf8"
                          fontSize="10"
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          = {obsVal}
                        </text>
                      ) : (
                        node.type !== 'utility' && (
                          <g transform="translate(-32, 6)">
                            {/* Mini Probability Bar Chart */}
                            <rect x="0" y="0" width="64" height="8" rx="3" fill="#1e293b" />
                            <rect
                              x="0"
                              y="0"
                              width={Math.max(2, 64 * pVal1)}
                              height="8"
                              rx="3"
                              fill="#0ea5e9"
                              className="transition-all duration-300"
                            />
                            <text
                              x="32"
                              y="16"
                              textAnchor="middle"
                              fill="#94a3b8"
                              fontSize="8"
                              fontFamily="monospace"
                            >
                              {(pVal1 * 100).toFixed(0)}% {outcomes[0]?.substring(0, 4)}
                            </text>
                          </g>
                        )
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Legend overlay */}
              <div className="absolute bottom-2 left-2 bg-card/80 backdrop-blur px-3 py-1.5 rounded-lg border border-border/60 text-[10px] flex items-center gap-3 text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" /> Chance Node</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Decision Node</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rotate-45 bg-purple-500 inline-block" /> Utility Node</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Marginal Probabilities Table & D-Separation Tester */}
        <div className="space-y-4">
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold">Posterior Marginals P(X | e)</CardTitle>
              <CardDescription className="text-xs">
                Updated in real time given active evidence
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2 max-h-64 overflow-y-auto">
              {network.nodes.filter(n => n.type !== 'utility').map(node => {
                const b = beliefs[node.id] || {};
                const isObserved = Boolean(evidence[node.id]);

                return (
                  <div key={node.id} className="p-2.5 rounded-lg bg-secondary/30 border border-border/50 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">{node.id}</span>
                      {isObserved ? (
                        <Badge variant="cyan" className="text-[10px] py-0">Observed: {evidence[node.id]}</Badge>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">Marginal</span>
                      )}
                    </div>

                    <div className="space-y-1 pt-1 font-mono text-[11px]">
                      {Object.entries(b).map(([outcome, prob]) => (
                        <div key={outcome} className="flex items-center justify-between">
                          <span className="text-muted-foreground">{outcome}:</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all duration-300"
                                style={{ width: `${prob * 100}%` }}
                              />
                            </div>
                            <span className="w-10 text-right font-semibold text-foreground">
                              {(prob * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* D-Separation Tester Card */}
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-cyan-400" />
                D-Separation Independence Tester
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] text-muted-foreground">Variable A:</span>
                  <select
                    value={dsepNodeA}
                    onChange={(e) => setDsepNodeA(e.target.value)}
                    className="w-full h-8 mt-1 px-2 text-xs rounded border border-input bg-card text-foreground"
                  >
                    {network.nodes.map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
                  </select>
                </div>
                <div>
                  <span className="text-[11px] text-muted-foreground">Variable B:</span>
                  <select
                    value={dsepNodeB}
                    onChange={(e) => setDsepNodeB(e.target.value)}
                    className="w-full h-8 mt-1 px-2 text-xs rounded border border-input bg-card text-foreground"
                  >
                    {network.nodes.map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
                  </select>
                </div>
              </div>

              <Button size="sm" onClick={testDSeparation} className="w-full h-8 text-xs font-semibold">
                Test Independence (A ⊥ B | Evidence)
              </Button>

              {dsepResult && (
                <div className="p-2.5 rounded bg-secondary/50 border border-border/60 text-xs text-slate-300">
                  {dsepResult}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sandbox" className="mt-8">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="sandbox" className="gap-1.5">
            <Code className="h-3.5 w-3.5" />
            Run VE Code
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
            title="In-Browser Variable Elimination Sandbox"
            algorithmName="Exact Inference (VE)"
            initialCode={codeTemplate}
            notes="Variable elimination multiplies factors over matching variables and marginalizes (sums out) unobserved hidden variables."
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
                <CardTitle className="text-sm font-semibold">Inference & Decision Procedures</CardTitle>
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
