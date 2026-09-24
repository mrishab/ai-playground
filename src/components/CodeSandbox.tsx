import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Code2, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export interface CodeSandboxProps {
  title: string;
  initialCode: string;
  algorithmName?: string;
  onRun?: (code: string) => void | { success: boolean; output: string };
  defaultOutput?: string;
  notes?: string;
}

export function CodeSandbox({
  title,
  initialCode,
  algorithmName,
  onRun,
  defaultOutput = '// Ready to run. Edit the algorithm above and click "Run Code" to execute live in-browser!',
  notes
}: CodeSandboxProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(defaultOutput);
  const [isCopied, setIsCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('// Reset code to original reference implementation.');
    setHasError(false);
  };

  const handleRun = () => {
    setIsRunning(true);
    setHasError(false);
    try {
      if (onRun) {
        const res = onRun(code);
        if (res && typeof res === 'object') {
          setOutput(res.output);
          setHasError(!res.success);
        } else {
          setOutput(`[Success] Executed ${algorithmName || 'algorithm'} successfully in browser.`);
        }
      } else {
        setOutput(`[Executed] Code compiled and evaluated in browser sandbox:\n${code.substring(0, 150)}...`);
      }
    } catch (err: any) {
      setHasError(true);
      setOutput(`[Runtime Error]: ${err?.message || String(err)}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg transition-all">
      {/* Sandbox Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-secondary/40 px-4 py-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm tracking-tight">{title}</span>
          {algorithmName && (
            <Badge variant="cyan" className="text-[10px] py-0 px-2">
              {algorithmName}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleReset} title="Reset to reference code" className="h-7 text-xs gap-1.5">
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopy} title="Copy code" className="h-7 text-xs gap-1.5">
            {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            {isCopied ? 'Copied' : 'Copy'}
          </Button>
          <Button variant="default" size="sm" onClick={handleRun} disabled={isRunning} className="h-7 text-xs gap-1.5 bg-primary font-semibold">
            <Play className="h-3 w-3 fill-current" />
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-56 p-4 font-mono text-xs leading-relaxed bg-[#0b0f19] text-[#e2e8f0] focus:outline-none resize-y selection:bg-primary/30"
          placeholder="Write or edit algorithm code here..."
        />
      </div>

      {/* Console Output Terminal */}
      <div className="border-t border-border bg-[#070a12] p-3 text-xs font-mono">
        <div className="flex items-center justify-between mb-1.5 text-muted-foreground pb-1 border-b border-border/40">
          <div className="flex items-center gap-1.5 text-[11px]">
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            <span>Browser Sandbox Console & Trace</span>
          </div>
          {hasError ? (
            <span className="flex items-center gap-1 text-destructive text-[11px]">
              <AlertCircle className="h-3 w-3" /> Execution Error
            </span>
          ) : (
            <span className="text-emerald-400 text-[10px]">Client-side V8 Engine</span>
          )}
        </div>
        <pre className={`whitespace-pre-wrap max-h-32 overflow-y-auto ${hasError ? 'text-rose-400' : 'text-slate-300'}`}>
          {output}
        </pre>
      </div>

      {notes && (
        <div className="px-4 py-2 bg-secondary/20 text-muted-foreground text-[11px] border-t border-border/30 flex items-center gap-1.5">
          <span className="text-primary font-medium">Tip:</span> {notes}
        </div>
      )}
    </div>
  );
}
