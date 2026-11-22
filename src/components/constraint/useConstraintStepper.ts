import { useCallback, useRef } from "react";
import { CSPProblem } from "@/data/cspProblems";
import { executeFineStep } from "./ac3Engine";
import { useConstraintState } from "./useConstraintState";
import { findMrvVariable, isCspFullySolved, hasAnyWipeout, handleCspSolved } from "./ac3MacStep";

export function useConstraintStepper(s: ReturnType<typeof useConstraintState>, problem: CSPProblem) {
  const solvedRef = useRef(false);
  const resetSolved = useCallback(() => { solvedRef.current = false; }, []);

  const fineStep = useCallback((): boolean => {
    const res = executeFineStep(s.arcQueue, s.domains, problem);
    s.setArcQueue(res.updatedQueue);
    s.setDomains(res.updatedDomains);
    s.setCurrentArc(res.currentArc);
    s.setLog(res.log);
    if (res.isWipeout) s.markCurrentSplitFailed();
    if (isCspFullySolved(res.updatedDomains) && res.updatedQueue.length === 0) {
      handleCspSolved(s, solvedRef);
    }
    return !res.done;
  }, [s, problem]);

  const stepMacSearch = useCallback((): boolean => {
    if (isCspFullySolved(s.domains) && s.arcQueue.length === 0) {
      handleCspSolved(s, solvedRef, "CSP solution found!");
      return false;
    }
    if (hasAnyWipeout(s.domains)) {
      if (s.domainBackups.length > 0) {
        s.backtrack();
        return true;
      }
      s.setLog("Wipeout reached and no backups remain. CSP has no solution.");
      return false;
    }
    if (s.arcQueue.length > 0) return fineStep();
    const mrv = findMrvVariable(problem, s.domains);
    if (mrv) {
      s.performDomainSplit(mrv);
      return true;
    }
    return false;
  }, [s, problem, fineStep]);

  return { fineStep, stepMacSearch, resetSolved };
}
