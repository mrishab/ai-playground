import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, RotateCcw, Navigation, Compass, Shield, Code, BookOpen, Settings2 } from 'lucide-react';
import { ROBOT_WORLDS, RobotWorld, RobotPose } from '@/data/robotProblems';
import { TOOL_TUTORIALS } from '@/data/toolTutorials';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import { CodeSandbox } from '../CodeSandbox';
import confetti from 'canvas-confetti';

export function RobotTool() {
  const [selectedWorldId, setSelectedWorldId] = useState<string>('bookWorld');
  const world: RobotWorld = ROBOT_WORLDS[selectedWorldId] || ROBOT_WORLDS.bookWorld;
  const tutorial = TOOL_TUTORIALS.robot;

  const [robotPose, setRobotPose] = useState<RobotPose>(world.robot);
  const [currentPlanIndex, setCurrentPlanIndex] = useState<number>(0);
  const [breadcrumbs, setBreadcrumbs] = useState<{ x: number; y: number }[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sensorWhiskers, setSensorWhiskers] = useState<{ left: number; front: number; right: number }>({ left: 50, front: 50, right: 50 });
  const [log, setLog] = useState<string>('Robot ready at start pose. Click Play or Step to navigate.');

  // Initialize world
  const initializeWorld = () => {
    setIsPlaying(false);
    setRobotPose(world.robot);
    setCurrentPlanIndex(0);
    setBreadcrumbs([{ x: world.robot.x, y: world.robot.y }]);
    setSensorWhiskers({ left: 50, front: 50, right: 50 });
    setLog(`Loaded "${world.name}". Current waypoint target: ${world.plan[0] || 'Goal'}.`);
  };

  useEffect(() => {
    initializeWorld();
  }, [selectedWorldId]);

  // Sense-Plan-Act cycle simulation step
  const stepSimulation = () => {
    if (currentPlanIndex >= world.plan.length) {
      setIsPlaying(false);
      setLog('Robot completed all plan waypoints successfully!');
      confetti({ particleCount: 60, spread: 70 });
      return;
    }

    const targetLocName = world.plan[currentPlanIndex];
    const targetLoc = world.locations.find(l => l.name === targetLocName);
    if (!targetLoc) return;

    // Distance to target
    const dx = targetLoc.x - robotPose.x;
    const dy = targetLoc.y - robotPose.y;
    const distToTarget = Math.sqrt(dx * dx + dy * dy);

    // If reached waypoint
    if (distToTarget < 20) {
      if (currentPlanIndex + 1 < world.plan.length) {
        setCurrentPlanIndex(prev => prev + 1);
        setLog(`Reached waypoint "${targetLocName}"! Heading to next: "${world.plan[currentPlanIndex + 1]}".`);
      } else {
        setCurrentPlanIndex(prev => prev + 1);
        setIsPlaying(false);
        setLog(`Final destination "${targetLocName}" reached! Mission complete.`);
        confetti({ particleCount: 70, spread: 80 });
      }
      return;
    }

    // Steering calculation (Middle Layer Controller)
    const desiredAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
    let angleDiff = desiredAngle - robotPose.angle;
    while (angleDiff > 180) angleDiff -= 360;
    while (angleDiff < -180) angleDiff += 360;

    // Obstacle check: distance to nearest wall
    let minFrontDist = 50;
    for (const w of world.walls) {
      // Approximate distance to wall line segment
      const midWx = (w.x1 + w.x2) / 2;
      const midWy = (w.y1 + w.y2) / 2;
      const dWall = Math.hypot(robotPose.x - midWx, robotPose.y - midWy);
      if (dWall < minFrontDist) minFrontDist = dWall;
    }

    setSensorWhiskers({
      front: Math.round(minFrontDist),
      left: Math.round(minFrontDist * 1.2),
      right: Math.round(minFrontDist * 0.9)
    });

    // Reactive avoidance if close to wall
    let steerStep = Math.sign(angleDiff) * Math.min(15, Math.abs(angleDiff));
    if (minFrontDist < 25) {
      steerStep = 30; // turn away
    }

    const newAngle = robotPose.angle + steerStep;
    const rad = (newAngle * Math.PI) / 180;
    const stepSpeed = 8;
    const newX = robotPose.x + stepSpeed * Math.cos(rad);
    const newY = robotPose.y + stepSpeed * Math.sin(rad);

    setRobotPose({ x: newX, y: newY, angle: newAngle });
    setBreadcrumbs(prev => [...prev.slice(-150), { x: newX, y: newY }]);
  };

  // Auto-run simulation
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && currentPlanIndex < world.plan.length) {
      timer = setTimeout(() => {
        stepSimulation();
      }, 80);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, robotPose, currentPlanIndex]);

  const codeTemplate = `// CILog Robot Controller in Browser
function robotController(sensors, target, currentPose) {
  // 1. Low Layer: Obstacle avoidance
  if (sensors.front < 20) {
    return { action: "turn", angle: 45, speed: 2 };
  }

  // 2. Middle Layer: Goal-directed steering
  const dx = target.x - currentPose.x;
  const dy = target.y - currentPose.y;
  const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  return {
    action: "moveForward",
    targetAngle: targetAngle,
    speed: 8
  };
}

const action = robotController({ front: 45, left: 60, right: 30 }, { x: 450, y: 80 }, { x: 60, y: 90, angle: 0 });
return JSON.stringify(action, null, 2);
`;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card/60 p-5 rounded-2xl border border-border backdrop-blur shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold tracking-tight">Autonomous Robot Control Lab</span>
            <Badge variant="cyan">{tutorial.badge}</Badge>
            {currentPlanIndex >= world.plan.length && <Badge variant="success">Mission Complete</Badge>}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            {world.description}
          </p>
        </div>

        {/* Map selector */}
        <select
          value={selectedWorldId}
          onChange={(e) => setSelectedWorldId(e.target.value)}
          className="h-9 px-3 text-xs rounded-lg border border-input bg-card text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
        >
          {Object.values(ROBOT_WORLDS).map(w => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
      </div>

      {/* Main Simulation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 2D Simulation Arena */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden border-border/80 shadow-md">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
              <div className="flex items-center gap-2">
                <Button
                  variant={isPlaying ? 'destructive' : 'default'}
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={currentPlanIndex >= world.plan.length}
                  className="gap-1.5 h-8 font-semibold"
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                  {isPlaying ? 'Pause' : 'Run Robot'}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={stepSimulation}
                  disabled={isPlaying || currentPlanIndex >= world.plan.length}
                  className="gap-1.5 h-8"
                >
                  <SkipForward className="h-3.5 w-3.5" />
                  Step Cycle
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={initializeWorld}
                  className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>

              {/* Waypoint Indicator */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-[11px]">Waypoint Target:</span>
                <Badge variant="purple" className="font-mono text-xs">
                  {world.plan[currentPlanIndex] || 'None (Arrived)'} ({Math.min(currentPlanIndex + 1, world.plan.length)}/{world.plan.length})
                </Badge>
              </div>
            </div>

            {/* SVG Arena Canvas */}
            <div className="relative w-full h-[380px] bg-[#070a13] select-none overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 600 380">
                {/* Grid dots */}
                <pattern id="dot-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="#1e293b" />
                </pattern>
                <rect width="600" height="380" fill="url(#dot-grid)" />

                {/* Breadcrumb Trail */}
                {breadcrumbs.map((b, i) => (
                  <circle key={i} cx={b.x} cy={b.y} r="1.5" fill="#38bdf8" opacity={0.4} />
                ))}

                {/* Obstacle Walls */}
                {world.walls.map((wall, i) => (
                  <line
                    key={i}
                    x1={wall.x1}
                    y1={wall.y1}
                    x2={wall.x2}
                    y2={wall.y2}
                    stroke="#e2e8f0"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="shadow-lg"
                  />
                ))}

                {/* Target Locations */}
                {world.locations.map(loc => {
                  const isCurrentTarget = world.plan[currentPlanIndex] === loc.name;
                  return (
                    <g key={loc.name} transform={`translate(${loc.x}, ${loc.y})`}>
                      <circle
                        cx="0"
                        cy="0"
                        r={isCurrentTarget ? 16 : 12}
                        fill={isCurrentTarget ? '#4c1d95' : '#0f172a'}
                        stroke={isCurrentTarget ? '#c084fc' : '#475569'}
                        strokeWidth="2"
                        className={isCurrentTarget ? 'animate-pulse' : ''}
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill="#f8fafc"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {loc.name}
                      </text>
                    </g>
                  );
                })}

                {/* Robot Agent */}
                <g transform={`translate(${robotPose.x}, ${robotPose.y}) rotate(${robotPose.angle})`}>
                  {/* Whisker sensor lines */}
                  <line x1="0" y1="0" x2="35" y2="-15" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
                  <line x1="0" y1="0" x2="40" y2="0" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.9" />
                  <line x1="0" y1="0" x2="35" y2="15" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />

                  {/* Robot Chassis */}
                  <circle cx="0" cy="0" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2.5" />
                  {/* Heading pointer */}
                  <polygon points="12,0 0,-5 0,5" fill="#f8fafc" />
                </g>
              </svg>
            </div>

            {/* Status footer */}
            <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs flex items-center justify-between">
              <span className="text-slate-300">{log}</span>
              <span className="text-[11px] text-muted-foreground">
                Pose: ({robotPose.x.toFixed(0)}, {robotPose.y.toFixed(0)}) @ {robotPose.angle.toFixed(0)}°
              </span>
            </div>
          </Card>
        </div>

        {/* Right Col: Sensors & Hierarchical Controller Info */}
        <div className="space-y-4">
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                <Compass className="h-4 w-4 text-primary" />
                Sensor Telemetry
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center p-2 rounded bg-secondary/30">
                <span className="text-muted-foreground">Front Range Sensor:</span>
                <span className="font-bold text-cyan-400">{sensorWhiskers.front} cm</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-secondary/30">
                <span className="text-muted-foreground">Left Whisker:</span>
                <span className="font-bold text-slate-300">{sensorWhiskers.left} cm</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-secondary/30">
                <span className="text-muted-foreground">Right Whisker:</span>
                <span className="font-bold text-slate-300">{sensorWhiskers.right} cm</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-secondary/30">
                <span className="text-muted-foreground">Heading Compass:</span>
                <span className="font-bold text-amber-400">{robotPose.angle.toFixed(1)}°</span>
              </div>
            </CardContent>
          </Card>

          {/* High-Level Plan List */}
          <Card className="border-border/80 shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-semibold">High Controller Plan</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1 space-y-1.5 text-xs">
              {world.plan.map((loc, idx) => {
                const isDone = idx < currentPlanIndex;
                const isCurrent = idx === currentPlanIndex;

                return (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg flex items-center justify-between font-mono ${
                      isCurrent
                        ? 'bg-purple-950/40 border border-purple-500/40 text-purple-200'
                        : isDone
                        ? 'bg-emerald-950/20 text-emerald-400/70'
                        : 'bg-secondary/30 text-muted-foreground'
                    }`}
                  >
                    <span>{idx + 1}. Navigate to "{loc}"</span>
                    {isDone && <span className="text-[10px] text-emerald-400">Reached</span>}
                    {isCurrent && <Badge variant="purple" className="text-[9px] py-0">Active</Badge>}
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
            Run Controller Code
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
            title="In-Browser Robot Controller Script Sandbox"
            algorithmName="Sense-Plan-Act Loop"
            initialCode={codeTemplate}
            notes="You can modify steering thresholds, wall repulsion forces, and waypoint tracking logic."
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
                <CardTitle className="text-sm font-semibold">Architectures & Control Loops</CardTitle>
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
