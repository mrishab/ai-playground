import { describe, it, expect } from "vitest";
import { executeSLDProof } from "../components/deduction/sldEngine";
import { generateSLDSteps } from "../components/deduction/sldStepRecorder";
import { executeBottomUp, generateBottomUpSteps } from "../components/deduction/bottomUpRunner";
import { DEDUCTION_KBS } from "../data/deductionProblems";

describe("SLD Engine Deduction Fixes", () => {
  it("1. proves ancestor(tom, jim) with backtracking in Family Relationships", () => {
    const res = executeSLDProof("ancestor(tom, jim)", DEDUCTION_KBS.family.code);
    expect(res.root.status).toBe("success");
    expect(res.foundAnswers.length).toBe(1);
  });

  it("2. evaluates dif/2 properly: sibling(ann, pat) succeeds and sibling(ann, ann) fails", () => {
    const resPat = executeSLDProof("sibling(ann, pat)", DEDUCTION_KBS.family.code);
    expect(resPat.root.status).toBe("success");

    const resAnn = executeSLDProof("sibling(ann, ann)", DEDUCTION_KBS.family.code);
    expect(resAnn.root.status).toBe("failed");
    expect(resAnn.foundAnswers.length).toBe(0);
  });

  it("3. finds all 5 wires for open query live(W)", () => {
    const res = executeSLDProof("live(W)", DEDUCTION_KBS.elect.code);
    expect(res.root.status).toBe("success");
    const wires = res.foundAnswers.map((a) => a.W).sort();
    expect(wires).toEqual(["l1", "outside", "w0", "w1", "w3"].sort());
    expect(res.foundAnswers.length).toBe(5);
  });

  it("4. finds all 2 ancestors for ancestor(A, bob)", () => {
    const res = executeSLDProof("ancestor(A, bob)", DEDUCTION_KBS.family.code);
    expect(res.root.status).toBe("success");
    const ancestors = res.foundAnswers.map((a) => a.A).sort();
    expect(ancestors).toEqual(["pam", "tom"].sort());
    expect(res.foundAnswers.length).toBe(2);
  });

  it("5. finds all 2 courses for eligible(alice, Course)", () => {
    const res = executeSLDProof("eligible(alice, Course)", DEDUCTION_KBS.courses.code);
    expect(res.root.status).toBe("success");
    const courses = res.foundAnswers.map((a) => a.Course).sort();
    expect(courses).toEqual(["cs102", "cs201"].sort());
    expect(res.foundAnswers.length).toBe(2);
  });

  it("6. finds all 4 prerequisites for requires(Pre, cs320)", () => {
    const res = executeSLDProof("requires(Pre, cs320)", DEDUCTION_KBS.courses.code);
    expect(res.root.status).toBe("success");
    const prereqs = res.foundAnswers.map((a) => a.Pre).sort();
    expect(prereqs).toEqual(["cs101", "cs102", "cs201", "math101"].sort());
    expect(res.foundAnswers.length).toBe(4);
  });

  it("7. records backtracking steps in generateSLDSteps for ancestor(tom, jim)", () => {
    const steps = generateSLDSteps("ancestor(tom, jim)", DEDUCTION_KBS.family.code);
    expect(steps.length).toBeGreaterThan(1);
    const hasBacktrack = steps.some((s) => s.action === "Backtrack");
    expect(hasBacktrack).toBe(true);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.log).toMatch(/Proved: ancestor\(tom, jim\)/i);
  });

  it("8. generates steps for lit(l1) matching usability tests", () => {
    const steps = generateSLDSteps("?- lit(l1)", DEDUCTION_KBS.elect.code);
    expect(steps.length).toBeGreaterThan(1);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.log).toMatch(/Proved: lit\(l1\)/i);
  });

  it("9. executes Bottom-Up Chaining until fixed point saturation", () => {
    const buElect = executeBottomUp("live(W)", DEDUCTION_KBS.elect.code);
    expect(buElect.root.status).toBe("success");
    expect(buElect.consequences.length).toBeGreaterThan(5);
    const wires = buElect.foundAnswers.map((a) => a.W).sort();
    expect(wires).toEqual(["l1", "outside", "w0", "w1", "w3"].sort());

    const buFamily = executeBottomUp("ancestor(tom, jim)", DEDUCTION_KBS.family.code);
    expect(buFamily.root.status).toBe("success");

    const buSteps = generateBottomUpSteps("lit(l1)", DEDUCTION_KBS.elect.code);
    expect(buSteps.length).toBeGreaterThan(1);
    const lastBuStep = buSteps[buSteps.length - 1];
    expect(lastBuStep.log).toMatch(/Proved: lit\(l1\)/i);
  });
});
