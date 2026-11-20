import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, renderHook, act } from "@testing-library/react";
import React from "react";
import { useExerciseStepper } from "@/components/exercises/useExerciseStepper";
import { ExerciseStepRunner } from "@/components/exercises/ExerciseStepRunner";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { EXERCISE_ALGORITHMS } from "@/data/exerciseAlgorithmsData";
import { EXERCISES_DATA } from "@/data/exercisesData";

describe("Practice Exercises Stepper Fixes & Full Logic Traces", () => {
  describe("1. useExerciseStepper & Stepper Control Reset behavior", () => {
    it("reset() jumps cleanly to stepIndex 0 instead of decrementing by 1", () => {
      const { result } = renderHook(() => useExerciseStepper("search", "vancouver", "3.B"));
      expect(result.current.stepIndex).toBe(0);

      // Advance to step 3 (0-indexed 3, 4th step)
      act(() => {
        result.current.stepForward();
        result.current.stepForward();
        result.current.stepForward();
      });
      expect(result.current.stepIndex).toBe(3);

      // Call reset()
      act(() => {
        result.current.reset();
      });
      // Must jump directly to 0, NOT decrement to 2
      expect(result.current.stepIndex).toBe(0);
      expect(result.current.isPlaying).toBe(false);
    });

    it("resets stepIndex to 0 when questionIdx or branch changes", () => {
      let qIdx: number | null = null;
      let branch: string | number | undefined = undefined;
      const { result, rerender } = renderHook(
        ({ q, b }: { q: number | null; b?: string | number }) =>
          useExerciseStepper("robot", "office", "2.A", q, b),
        { initialProps: { q: qIdx as number | null, b: branch as string | number | undefined } },
      );

      // Advance to step 2
      act(() => {
        result.current.stepForward();
        result.current.stepForward();
      });
      expect(result.current.stepIndex).toBe(2);

      // Switch question to 0
      rerender({ q: 0, b: undefined });
      expect(result.current.stepIndex).toBe(0);

      // Advance again to step 2
      act(() => {
        result.current.stepForward();
        result.current.stepForward();
      });
      expect(result.current.stepIndex).toBe(2);

      // Switch question to 1
      rerender({ q: 1, b: undefined });
      expect(result.current.stepIndex).toBe(0);

      // Advance to step 1
      act(() => {
        result.current.stepForward();
      });
      expect(result.current.stepIndex).toBe(1);

      // Switch branch
      rerender({ q: 1, b: "alt-branch" });
      expect(result.current.stepIndex).toBe(0);

      // Return to base steps (q = null)
      act(() => {
        result.current.stepForward();
      });
      expect(result.current.stepIndex).toBe(1);
      rerender({ q: null, b: undefined });
      expect(result.current.stepIndex).toBe(0);
    });

    it("clicking reset button (↺) in ExerciseStepRunner resets directly to 1/N", () => {
      render(
        <ExerciseStepRunner
          toolId="robot"
          sampleId="office"
          exerciseId="2.A"
        />,
      );

      // Open stepper
      const toggleBtn = screen.getByText(/Interactive Algorithm Execution:/i);
      fireEvent.click(toggleBtn);

      // Initial step: 1/4
      expect(screen.getByText("1/4")).toBeInTheDocument();

      // Click Step button multiple times to reach 4/4
      const stepBtn = screen.getByRole("button", { name: /Step$/i });
      fireEvent.click(stepBtn);
      expect(screen.getByText("2/4")).toBeInTheDocument();
      fireEvent.click(stepBtn);
      expect(screen.getByText("3/4")).toBeInTheDocument();
      fireEvent.click(stepBtn);
      expect(screen.getByText("4/4")).toBeInTheDocument();

      // Click reset button (↺)
      const resetBtn = screen.getByRole("button", { name: /Reset steps/i });
      fireEvent.click(resetBtn);

      // Must be back to 1/4 immediately, NOT 3/4
      expect(screen.getByText("1/4")).toBeInTheDocument();
      expect(screen.queryByText("3/4")).not.toBeInTheDocument();
    });

    it("switching active question inside ExerciseCard resets step index to step 1", () => {
      const exercise = EXERCISES_DATA.find((e) => e.id === "2.A")!;
      render(
        <ExerciseCard
          exercise={exercise}
          expandedHints={{}}
          expandedSolutions={{}}
          onToggleHint={() => {}}
          onToggleSolution={() => {}}
          onOpenTool={() => {}}
        />,
      );

      // Click Execute Logic on Q1
      const execBtns = screen.getAllByRole("button", { name: /Execute Logic/i });
      fireEvent.click(execBtns[0]);
      expect(screen.getByText(/Q1 Logic:/i)).toBeInTheDocument();
      expect(screen.getByText("1/4")).toBeInTheDocument();

      // Advance Q1 to 3/4
      const stepBtn = screen.getByRole("button", { name: /Step$/i });
      fireEvent.click(stepBtn);
      fireEvent.click(stepBtn);
      expect(screen.getByText("3/4")).toBeInTheDocument();

      // Click Execute Logic on Q2
      fireEvent.click(execBtns[1]);
      expect(screen.getByText(/Q2 Logic:/i)).toBeInTheDocument();

      // Must reset cleanly to 1/4, NOT start at leaked 3/4
      expect(screen.getByText("1/4")).toBeInTheDocument();
    });
  });

  describe("2. Six Mathematical and Logical Errors in Full Logic Traces", () => {
    it("Ex 2.A: front-left obstacle avoidance steers right with left wheel speed > right wheel speed", () => {
      const ex2a = EXERCISE_ALGORITHMS["2.A"];
      expect(ex2a).toBeDefined();
      const step4 = ex2a.steps[3];
      expect(step4.label).toBe("Execute Wheel Actuation");
      // Must steer right: left=0.55 m/s, right=0.45 m/s
      expect(step4.detail).toContain("left wheel = 0.55 m/s, right wheel = 0.45 m/s");
      expect(step4.queueOrFrontier).toContain("0.55, 0.45");
    });

    it("Ex 3.C: h(start) = 4 <= optimal cost 5, satisfying admissibility definition", () => {
      const ex3c = EXERCISE_ALGORITHMS["3.C"];
      expect(ex3c).toBeDefined();
      const step1 = ex3c.steps[0];
      const step4 = ex3c.steps[3];
      // Step 4 extracts optimal cost 5
      expect(step4.metric).toBe("Cost: 5");
      // Step 1 h(start) <= 5 (e.g. 4)
      expect(step1.queueOrFrontier).toBe("h(start) = 4");
      expect(step1.metric).toBe("f = 0 + 4");
    });

    it("Ex 5.A: explicitly states unification of connected_to(w1, P) with KB fact connected_to(w1, p1) where P = p1", () => {
      const ex5a = EXERCISE_ALGORITHMS["5.A"];
      expect(ex5a).toBeDefined();
      const step2 = ex5a.steps[1];
      const step3 = ex5a.steps[2];
      expect(step2.detail).toContain("live(w1) <- connected_to(w1, P) & live(P)");
      expect(step3.detail).toContain("connected_to(w1, p1)");
      expect(step3.detail).toContain("P = p1");
      expect(step3.queueOrFrontier).toContain("connected_to(w1, p1)");
    });

    it("Ex 6.C: LHS includes hidden variable M in f_prod(A, B, E, M)", () => {
      const ex6c = EXERCISE_ALGORITHMS["6.C"];
      expect(ex6c).toBeDefined();
      const step3 = ex6c.steps[2];
      expect(step3.detail).toContain("f_prod(A, B, E, M) = f3(A, B, E) * f4_obs(A) * f5(M, A)");
      expect(step3.queueOrFrontier).toContain("{A, B, E, M}");
    });

    it("Ex 7.B: delta_out rounded to 0.090 and change badge labeled ΔLoss: -0.016", () => {
      const ex7b = EXERCISE_ALGORITHMS["7.B"];
      expect(ex7b).toBeDefined();
      const step2 = ex7b.steps[1];
      const step4 = ex7b.steps[3];
      expect(step2.detail).toContain("delta_out = (y - y_hat) * dSigmoid(y_hat) = 0.090");
      expect(step2.metric).toBe("delta_out = 0.090");
      expect(step4.metric).toBe("ΔLoss: -0.016");
    });

    it("Ex 8.A: Unstack(C, A) adds clear(A) and plan executes Pickup(A) before Stack(A, B)", () => {
      const ex8a = EXERCISE_ALGORITHMS["8.A"];
      expect(ex8a).toBeDefined();
      expect(ex8a.steps.length).toBe(5);

      const step2 = ex8a.steps[1];
      expect(step2.label).toBe("Action: Unstack(C, A)");
      expect(step2.detail).toContain("clear(A)");

      const step3 = ex8a.steps[2];
      expect(step3.label).toBe("Action: Putdown(C)");

      const step4 = ex8a.steps[3];
      expect(step4.label).toBe("Action: Pickup(A)");
      expect(step4.metric).toBe("Arm: Holding(A)");

      const step5 = ex8a.steps[4];
      expect(step5.label).toBe("Action: Stack(A, B)");
      expect(step5.metric).toBe("Goal Achieved");
    });
  });

  describe("3. Pedagogical Imprecisions Polish", () => {
    it("Ex 3.B: states non-negative edge weights for Dijkstra / Lowest-Cost-First", () => {
      const ex3bData = EXERCISES_DATA.find((e) => e.id === "3.B")!;
      const q3 = ex3bData.questions[2];
      expect(q3.solution).toContain("non-negative");

      const ex3bAlgo = EXERCISE_ALGORITHMS["3.B"];
      const q3Steps = ex3bAlgo.questionSteps![2];
      expect(q3Steps[1].detail).toContain("non-negative");
      expect(q3Steps[3].detail).toContain("non-negative");
    });

    it("Ex 4.C: clarifies simulated annealing convergence behavior under sufficiently slow schedule", () => {
      const ex4cData = EXERCISES_DATA.find((e) => e.id === "4.C")!;
      const q3 = ex4cData.questions[2];
      expect(q3.solution).toContain("logarithmic");
      expect(q3.solution).toContain("global optimum");

      const ex4cAlgo = EXERCISE_ALGORITHMS["4.C"];
      const q3Steps = ex4cAlgo.questionSteps![2];
      expect(q3Steps[3].detail).toContain("sufficiently slow cooling schedule");
      expect(q3Steps[3].detail).toContain("global optimum");
    });

    it("Ex 8.C: refers to explanatory frame axioms properly", () => {
      const ex8cData = EXERCISES_DATA.find((e) => e.id === "8.C")!;
      expect(ex8cData.questions[0].solution).toContain("Explanatory Frame Axioms");
      expect(ex8cData.questions[0].solution).toContain("Add or Delete");

      const ex8cAlgo = EXERCISE_ALGORITHMS["8.C"];
      expect(ex8cAlgo.steps[1].detail).toContain("explanatory frame axioms");
      expect(ex8cAlgo.steps[3].detail).toContain("explanatory frame axioms");
      expect(ex8cAlgo.questionSteps![0][2].detail).toContain("Explanatory frame axioms");
    });
  });
});
