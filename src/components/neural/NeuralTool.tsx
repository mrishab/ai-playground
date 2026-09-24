import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, RotateCcw, Plus, Activity, Zap, Code, BookOpen, Settings2 } from 'lucide-react';
import { NEURAL_DATASETS, NeuralDataset, DataPoint } from '@/data/neuralProblems';
import { TOOL_TUTORIALS } from '@/data/toolTutorials';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { Slider } from '../ui/Inputs';
import { CodeSandbox } from '../CodeSandbox';
import confetti from 'canvas-confetti';

export function NeuralTool() {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>('xor');
  const initialDataset: NeuralDataset = NEURAL_DATASETS[selectedDatasetId] || NEURAL_DATASETS.xor;
  const tutorial = TOOL_TUTORIALS.neural;

  const [points, setPoints] = useState<DataPoint[]>([]);
  const [learningRate, setLearningRate] = useState<number>(0.3);
  const [momentum, setMomentum] = useState<number>(0.5);
  const [epoch, setEpoch] = useState<number>(0);
  const [loss, setLoss] = useState<number>(0);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Network weights: 2 inputs -> 4 hidden -> 1 output
  // w1: 2x4 matrix, b1: 4 vector; w2: 4x1 vector, b2: scalar
  const weightsRef = useRef<{
    w1: number[][];
    b1: number[];
    w2: number[];
    b2: number;
    prev_dw1: number[][];
    prev_db1: number[];
    prev_dw2: number[];
    prev_db2: number;
  }>({
    w1: [[0.5, -0.5, 0.2, -0.2], [-0.3, 0.4, -0.5, 0.6]],
    b1: [0, 0, 0, 0],
    w2: [0.7, -0.6, 0.5, -0.4],
    b2: 0,
    prev_dw1: [[0, 0, 0, 0], [0, 0, 0, 0]],
    prev_db1: [0, 0, 0, 0],
    prev_dw2: [0, 0, 0, 0],
    prev_db2: 0
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sigmoid activation
  const sigmoid = (x: number) => 1.0 / (1.0 + Math.exp(-Math.max(-15, Math.min(15, x))));
  const dSigmoid = (y: number) => y * (1.0 - y);

  // Initialize weights
  const resetNetwork = () => {
    setIsPlaying(false);
    weightsRef.current = {
      w1: [
        [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5],
        [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5]
      ],
      b1: [0, 0, 0, 0],
      w2: [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5],
      b2: 0,
      prev_dw1: [[0, 0, 0, 0], [0, 0, 0, 0]],
      prev_db1: [0, 0, 0, 0],
      prev_dw2: [0, 0, 0, 0],
      prev_db2: 0
    };
    setPoints([...(NEURAL_DATASETS[selectedDatasetId]?.points || NEURAL_DATASETS.xor.points)]);
    setEpoch(0);
    setLoss(0.5);
    setLossHistory([0.5]);
  };

  useEffect(() => {
    resetNetwork();
  }, [selectedDatasetId]);

  // Forward pass for single coordinate (x, y)
  const forwardPass = (x: number, y: number) => {
    const { w1, b1, w2, b2 } = weightsRef.current;
    const hidden: number[] = [];
    for (let j = 0; j < 4; j++) {
      const z = x * w1[0][j] + y * w1[1][j] + b1[j];
      hidden.push(sigmoid(z));
    }

    let outZ = b2;
    for (let j = 0; j < 4; j++) {
      outZ += hidden[j] * w2[j];
    }
    const output = sigmoid(outZ);
    return { hidden, output };
  };

  // Single epoch of backpropagation
  const trainEpoch = () => {
    if (points.length === 0) return;
    const { w1, b1, w2, b2, prev_dw1, prev_db1, prev_dw2, prev_db2 } = weightsRef.current;
    let totalError = 0;

    for (const p of points) {
      const { hidden, output } = forwardPass(p.x, p.y);
      const error = p.label - output;
      totalError += error * error;

      // Output gradient
      const deltaOut = error * dSigmoid(output);

      // Hidden gradients
      const deltaHidden: number[] = [];
      for (let j = 0; j < 4; j++) {
        deltaHidden.push(deltaOut * w2[j] * dSigmoid(hidden[j]));
      }

      // Update output weights
      for (let j = 0; j < 4; j++) {
        const dw = learningRate * deltaOut * hidden[j] + momentum * prev_dw2[j];
        w2[j] += dw;
        prev_dw2[j] = dw;
      }
      const db2 = learningRate * deltaOut + momentum * prev_db2;
      weightsRef.current.b2 += db2;
      weightsRef.current.prev_db2 = db2;

      // Update hidden weights
      for (let j = 0; j < 4; j++) {
        const dw0 = learningRate * deltaHidden[j] * p.x + momentum * prev_dw1[0][j];
        const dw1 = learningRate * deltaHidden[j] * p.y + momentum * prev_dw1[1][j];
        w1[0][j] += dw0;
        w1[1][j] += dw1;
        prev_dw1[0][j] = dw0;
        prev_dw1[1][j] = dw1;

        const db = learningRate * deltaHidden[j] + momentum * prev_db1[j];
        b1[j] += db;
        prev_db1[j] = db;
      }
    }

    const mse = totalError / points.length;
    setLoss(mse);
    setEpoch(prev => prev + 1);
    setLossHistory(prev => [...prev.slice(-60), mse]);

    if (mse < 0.02 && isPlaying) {
      setIsPlaying(false);
      confetti({ particleCount: 60, spread: 70 });
    }
  };

  // Render 2D Decision Boundary on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // Sample grid (resolution: 4px blocks for performance)
    const step = 4;
    for (let px = 0; px < width; px += step) {
      for (let py = 0; py < height; py += step) {
        // Map pixel to [-1, 1] range
        const x = (px / width) * 2 - 1;
        const y = -((py / height) * 2 - 1);

        const { output } = forwardPass(x, y);

        // Color based on probability: blue for 0, red for 1
        const r = Math.floor(output * 220 + 20);
        const g = Math.floor(40);
        const b = Math.floor((1 - output) * 220 + 20);

        for (let dx = 0; dx < step; dx++) {
          for (let dy = 0; dy < step; dy++) {
            if (px + dx < width && py + dy < height) {
              const idx = ((py + dy) * width + (px + dx)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
              data[idx + 3] = 200; // opacity
            }
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // Draw axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Draw training data points
    for (const p of points) {
      const cx = ((p.x + 1) / 2) * width;
      const cy = ((-p.y + 1) / 2) * height;

      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, 2 * Math.PI);
      ctx.fillStyle = p.label === 1 ? '#ef4444' : '#3b82f6';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
    }
  }, [points, epoch, selectedDatasetId]);

  // Auto-play timer
  useEffect(() => {
    let animId: any = null;
    if (isPlaying) {
      const loop = () => {
        for (let i = 0; i < 5; i++) {
          trainEpoch();
        }
        animId = requestAnimationFrame(loop);
      };
      animId = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, points, learningRate, momentum]);

  // Click on canvas to add custom point
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const x = Math.max(-0.95, Math.min(0.95, (px / canvas.width) * 2 - 1));
    const y = Math.max(-0.95, Math.min(0.95, -((py / canvas.height) * 2 - 1)));

    // Shift key or right click adds class 1, otherwise class 0
    const label = (e.shiftKey || e.button === 2) ? 1 : 0;
    setPoints(prev => [...prev, { x, y, label }]);
  };

  const codeTemplate = `// Multi-Layer Perceptron (2-4-1) with Backpropagation
function trainMLP(points, epochs = 200, lr = 0.3) {
  function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
  function dSigmoid(y) { return y * (1 - y); }

  let w1 = [[0.2, -0.3, 0.4, -0.1], [-0.5, 0.1, -0.2, 0.6]];
  let w2 = [0.5, -0.4, 0.6, -0.2];

  for (let ep = 0; ep < epochs; ep++) {
    let loss = 0;
    for (const p of points) {
      // Forward
      const h = [0, 1, 2, 3].map(j => sigmoid(p.x * w1[0][j] + p.y * w1[1][j]));
      const out = sigmoid(h.reduce((acc, v, j) => acc + v * w2[j], 0));
      const err = p.label - out;
      loss += err * err;

      // Backward
      const deltaOut = err * dSigmoid(out);
      h.forEach((hj, j) => w2[j] += lr * deltaOut * hj);
    }
  }

  return { success: true, finalEpochs: epochs, note: "Backpropagation weights updated" };
}

const res = trainMLP(${JSON.stringify(points.slice(0, 6))}, 100);
return JSON.stringify(res, null, 2);
`;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold tracking-tight">Neural Network & Backprop Lab</span>
            <Badge variant="cyan">{tutorial.badge}</Badge>
            {loss < 0.05 && <Badge variant="success">Converged</Badge>}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            {initialDataset.description}
          </p>
        </div>

        {/* Dataset selector */}
        <select
          value={selectedDatasetId}
          onChange={(e) => setSelectedDatasetId(e.target.value)}
          className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {Object.values(NEURAL_DATASETS).map(ds => (
            <option key={ds.id} value={ds.id}>{ds.name}</option>
          ))}
        </select>
      </div>

      {/* Main Visualizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 2D Classification Canvas & Animation Toolbar */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden border-border/80 shadow-md">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
              <div className="flex items-center gap-2">
                <Button
                  variant={isPlaying ? 'destructive' : 'default'}
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="gap-1.5 h-8 font-semibold"
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                  {isPlaying ? 'Pause' : 'Train Continuously'}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { for (let i = 0; i < 10; i++) trainEpoch(); }}
                  disabled={isPlaying}
                  className="gap-1.5 h-8"
                >
                  <SkipForward className="h-3.5 w-3.5" />
                  +10 Epochs
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetNetwork}
                  className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>

              {/* Instructions on adding custom points */}
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span>Click canvas to add:</span>
                <span className="text-sky-400 font-semibold">Click (Class 0)</span>
                <span>•</span>
                <span className="text-rose-400 font-semibold">Shift+Click (Class 1)</span>
              </div>
            </div>

            {/* 2D Canvas */}
            <div className="p-4 bg-[#070a13] flex flex-col items-center justify-center">
              <canvas
                ref={canvasRef}
                width={480}
                height={320}
                onClick={handleCanvasClick}
                className="rounded-xl border border-border shadow-2xl cursor-crosshair max-w-full"
              />
            </div>

            {/* Metrics footer */}
            <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span>Epoch: <strong className="text-primary">{epoch}</strong></span>
                <span>Loss (MSE): <strong className={loss < 0.05 ? 'text-emerald-400' : 'text-amber-400'}>{loss.toFixed(4)}</strong></span>
                <span>Points: <strong className="text-slate-300">{points.length}</strong></span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Hyperparameters & Loss History Curve */}
        <div className="space-y-4">
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold">Training Hyperparameters</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Learning Rate (η):</span>
                  <span className="font-mono text-primary font-bold">{learningRate.toFixed(2)}</span>
                </div>
                <Slider min={0.05} max={1.5} step={0.05} value={learningRate} onChange={setLearningRate} />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Momentum (α):</span>
                  <span className="font-mono text-purple-400 font-bold">{momentum.toFixed(2)}</span>
                </div>
                <Slider min={0.0} max={0.95} step={0.05} value={momentum} onChange={setMomentum} />
              </div>
            </CardContent>
          </Card>

          {/* Loss Trajectory Curve */}
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-amber-400" />
                Loss Curve (MSE vs Epoch)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              <div className="h-28 w-full bg-[#0b0f19] rounded-lg border border-border/50 relative overflow-hidden flex items-end p-2">
                {lossHistory.length > 1 ? (
                  <svg className="w-full h-full" viewBox={`0 0 ${Math.max(10, lossHistory.length * 10)} 100`} preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      points={lossHistory
                        .map((l, i) => `${i * 10},${Math.max(5, Math.min(95, 95 - l * 180))}`)
                        .join(' ')}
                    />
                  </svg>
                ) : (
                  <div className="w-full text-center text-xs text-muted-foreground py-8">
                    Train network to plot error curve.
                  </div>
                )}
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
            Run Backprop Code
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
            title="In-Browser Backpropagation Sandbox"
            algorithmName="Backpropagation (SGD)"
            initialCode={codeTemplate}
            notes="Backpropagation calculates calculus chain rule partial derivatives backwards from the output to hidden layers."
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
                <CardTitle className="text-sm font-semibold">Architectures & Learning Rules</CardTitle>
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
