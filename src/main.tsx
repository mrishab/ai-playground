import React from "react";
import ReactDOM from "react-dom/client";
import { flushSync } from "react-dom";
import { App } from "./App";
import "./index.css";

// Test hook for deep coverage verification in Cypress
if (
  typeof window !== "undefined" &&
  ((window as any).Cypress ||
    import.meta.env.DEV ||
    Boolean(import.meta.env.VITE_COVERAGE) ||
    Boolean(import.meta.env.VITE_TEST_HARNESS))
) {
  Promise.all([
    import("@/lib/problemIO"),
    import("@/components/constraint/ac3Inequality"),
    import("@/components/constraint/ac3Support"),
    import("@/components/constraint/ac3MacStep"),
    import("@/components/constraint/ac3Engine"),
    import("@/components/constraint/ac3DependentArcs"),
    import("@/components/constraint/useConstraintStepper"),
    import("@/components/planning/planningSynthesizer"),
    import("@/components/planning/planningActionStack"),
    import("@/components/planning/planningExecutor"),
    import("@/components/planning/usePlanningExecution"),
    import("@/components/bayes/dSeparationTrails"),
    import("@/components/bayes/dSeparation"),
    import("@/components/bayes/bayesVeEngineHelper"),
    import("@/components/bayes/useBayesVe"),
    import("@/components/bayes/BayesNodeShape"),
    import("@/components/hill/stepGreedyDescent"),
    import("@/components/hill/stepTabu"),
    import("@/components/hill/stepRandomWalk"),
    import("@/components/hill/hillStepEngine"),
    import("@/components/hill/hillEvaluation"),
    import("@/components/hill/useHillStepper"),
    import("@/components/robot/robotStepHandler"),
    import("@/components/robot/robotStepApply"),
    import("@/components/robot/robotSensors"),
    import("@/components/dtree/dtreeBuildId3"),
    import("@/components/deduction/sldProveBody"),
    import("@/components/deduction/sldStepRecorder"),
    import("@/components/deduction/useDeductionStepper"),
    import("@/components/exercises/exerciseStepsA"),
    import("@/components/exercises/useExerciseStepper"),
    import("@/components/search/searchOrdering"),
    import("@/components/search/searchEngine"),
    import("@/components/search/searchNodeStyles"),
    import("@/components/strips_to_csp/stripsCspSolver"),
    import("@/components/strips_to_csp/useStripsToCsp"),
    import("@/components/ui/syntaxTokenizer"),
    import("@/components/ui/ModalHeader"),
    import("@/components/ToolViewRouter"),
    import("@/components/graph_builder/useGraphBuilderActions"),
    import("@/components/neural/useNeuralTraining"),
    import("@/components/neural/useNeuralNetwork"),
    import("@/hooks/useClipboardCopy"),
    import("@/components/ui/Slider"),
    import("@/components/ui/SyntaxHighlightEditor"),
    import("@/components/workspace/WorkspaceControls"),
    import("@/components/graph_builder/GraphBuilderRubberband"),
    import("@/components/graph_builder/GraphBuilderNodeModal"),
    import("@/components/graph_builder/GraphBuilderEdgeModal"),
    import("@/components/bayes/BayesVeCard"),
    import("@/components/dtree/DTreeSplitControl"),
  ]).then(([
    problemIO,
    ac3Inequality,
    ac3Support,
    ac3MacStep,
    ac3Engine,
    ac3DependentArcs,
    useConstraintStepper,
    planningSynthesizer,
    planningActionStack,
    planningExecutor,
    usePlanningExecution,
    dSeparationTrails,
    dSeparation,
    bayesVeEngineHelper,
    useBayesVe,
    BayesNodeShape,
    stepGreedyDescent,
    stepTabu,
    stepRandomWalk,
    hillStepEngine,
    hillEvaluation,
    useHillStepper,
    robotStepHandler,
    robotStepApply,
    robotSensors,
    dtreeBuildId3,
    sldProveBody,
    sldStepRecorder,
    useDeductionStepper,
    exerciseStepsA,
    useExerciseStepper,
    searchOrdering,
    searchEngine,
    searchNodeStyles,
    stripsCspSolver,
    useStripsToCsp,
    syntaxTokenizer,
    ModalHeader,
    ToolViewRouter,
    useGraphBuilderActions,
    useNeuralTraining,
    useNeuralNetwork,
    useClipboardCopy,
    Slider,
    SyntaxHighlightEditor,
    WorkspaceControls,
    GraphBuilderRubberband,
    GraphBuilderNodeModal,
    GraphBuilderEdgeModal,
    BayesVeCard,
    DTreeSplitControl,
  ]) => {
    const renderComponent = (element: React.ReactNode) => {
      const container = document.createElement("div");
      document.body.appendChild(container);
      const root = ReactDOM.createRoot(container);
      flushSync(() => {
        root.render(element);
      });
      const unmount = () => {
        flushSync(() => {
          root.unmount();
        });
        container.remove();
      };
      return Object.assign(unmount, { unmount, container });
    };

    const runHook = (setupHooks: () => (() => void) | void) => {
      let actionToRun: (() => void) | void;
      let err: any = null;
      const TestComponent = () => {
        try {
          actionToRun = setupHooks();
        } catch (e) {
          err = e;
        }
        React.useEffect(() => {
          if (actionToRun) {
            try {
              actionToRun();
            } catch (e) {
              err = e;
            }
          }
        }, []);
        return null;
      };
      const container = document.createElement("div");
      document.body.appendChild(container);
      const root = ReactDOM.createRoot(container);
      flushSync(() => {
        root.render(React.createElement(TestComponent));
      });
      flushSync(() => {
        root.unmount();
      });
      container.remove();
      if (err) throw err;
    };

    (window as any).__AI_PLAYGROUND_TEST_EXPORTS__ = {
      React,
      ReactDOM,
      flushSync,
      renderComponent,
      runHook,
      problemIO,
      ac3Inequality,
      ac3Support,
      ac3MacStep,
      ac3Engine,
      ac3DependentArcs,
      useConstraintStepper,
      planningSynthesizer,
      planningActionStack,
      planningExecutor,
      usePlanningExecution,
      dSeparationTrails,
      dSeparation,
      bayesVeEngineHelper,
      useBayesVe,
      BayesNodeShape,
      stepGreedyDescent,
      stepTabu,
      stepRandomWalk,
      hillStepEngine,
      hillEvaluation,
      useHillStepper,
      robotStepHandler,
      robotStepApply,
      robotSensors,
      dtreeBuildId3,
      sldProveBody,
      sldStepRecorder,
      useDeductionStepper,
      exerciseStepsA,
      useExerciseStepper,
      searchOrdering,
      searchEngine,
      searchNodeStyles,
      stripsCspSolver,
      useStripsToCsp,
      syntaxTokenizer,
      ModalHeader,
      ToolViewRouter,
      useGraphBuilderActions,
      useNeuralTraining,
      useNeuralNetwork,
      useClipboardCopy,
      Slider,
      SyntaxHighlightEditor,
      WorkspaceControls,
      GraphBuilderRubberband,
      GraphBuilderNodeModal,
      GraphBuilderEdgeModal,
      BayesVeCard,
      DTreeSplitControl,
    };
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
