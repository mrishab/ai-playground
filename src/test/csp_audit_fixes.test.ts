import { describe, it, expect } from "vitest";
import { CSP_PROBLEMS } from "@/data/cspProblems";
import { executeDomainSplit, executeBacktrack } from "@/components/constraint/ac3Splitter";
import { stepRandomWalk } from "@/components/hill/stepRandomWalk";
import { stepTabu } from "@/components/hill/stepTabu";
import { getDTreeCodeTemplate } from "@/components/dtree/dtreeCodeTemplate";
import { getNeuralCodeTemplate } from "@/components/neural/neuralCodeTemplate";
import { DTREE_DATASETS } from "@/data/dtreeProblems";

describe("CSP & SLS Audit Fixes", () => {
  describe("1. Consistency for CSP True Domain Splitting & Backtracking", () => {
    it("splits domain into disjoint subset halves instead of a single value", () => {
      const problem = CSP_PROBLEMS.simple1;
      const initialDomains = {
        A: ["1", "2", "3", "4"],
        B: ["1", "2", "3", "4"],
        C: ["1", "2", "3", "4"],
      };

      const res = executeDomainSplit("A", initialDomains, null, problem);
      expect(res).not.toBeNull();
      // Left branch has first half: ["1", "2"]
      expect(res?.updatedDomains.A).toEqual(["1", "2"]);
      expect(res?.newNode.value).toBe("{1, 2}");
      // Alternate branch saved in backup has second half: ["3", "4"]
      expect(res?.backup.alternateBranch?.A).toEqual(["3", "4"]);
      expect(res?.newArcs.length).toBe(4);
    });

    it("restores alternate branch on backtrack instead of resetting to initial unpruned state", () => {
      const problem = CSP_PROBLEMS.simple1;
      const initialDomains = {
        A: ["1", "2", "3", "4"],
        B: ["1", "2", "3", "4"],
        C: ["1", "2", "3", "4"],
      };

      const splitRes = executeDomainSplit("A", initialDomains, null, problem);
      expect(splitRes).not.toBeNull();
      const backups = [splitRes!.backup];

      const backRes = executeBacktrack(backups, problem);
      expect(backRes).not.toBeNull();
      expect(backRes?.remainingBackups.length).toBe(0);
      // Restored domains explores the alternate branch ["3", "4"]!
      expect(backRes?.restoredDomains.A).toEqual(["3", "4"]);
    });

    it("all constraints in simple1, simple2, scheduling1, and scheduling2 have non-empty names", () => {
      const probIds = ["simple1", "simple2", "scheduling1", "scheduling2"];
      for (const id of probIds) {
        const p = CSP_PROBLEMS[id];
        expect(p).toBeDefined();
        for (const c of p.constraints) {
          expect(c.name.trim().length).toBeGreaterThan(0);
          expect(c.name).not.toBe("");
        }
      }
    });
  });

  describe("2. SLS No-Op Assignment Prevention", () => {
    it("stepRandomWalk never chooses the variable's currently assigned value", () => {
      const problem = CSP_PROBLEMS.simple1;
      const assignment = { A: "1", B: "2", C: "3" };

      // Test 50 random walk steps with p = 1.0 (pure random walk)
      for (let i = 0; i < 50; i++) {
        const res = stepRandomWalk(problem, assignment, 1.0);
        // Find which variable was changed
        const changedVar = Object.keys(assignment).find(
          (k) => res.nextAssign[k] !== assignment[k as keyof typeof assignment],
        );
        expect(changedVar).toBeDefined();
        // The new assignment must be strictly different from the previous one
        expect(res.nextAssign[changedVar!]).not.toBe(
          assignment[changedVar as keyof typeof assignment],
        );
      }
    });

    it("stepTabu never moves to the variable's currently assigned value", () => {
      const problem = CSP_PROBLEMS.simple1;
      const assignment = { A: "1", B: "2", C: "3" };
      const tabuList: { varName: string; val: string }[] = [];

      for (let i = 0; i < 50; i++) {
        const res = stepTabu(problem, assignment, tabuList, 3);
        const changedVar = Object.keys(assignment).find(
          (k) => res.nextAssign[k] !== assignment[k as keyof typeof assignment],
        );
        expect(changedVar).toBeDefined();
        expect(res.nextAssign[changedVar!]).not.toBe(
          assignment[changedVar as keyof typeof assignment],
        );
      }
    });
  });

  describe("3. Code Area & Shell Dropdown Synchronization", () => {
    it("getDTreeCodeTemplate generates distinct reference code for id3, c45, and cart", () => {
      const dataset = DTREE_DATASETS.playTennis;
      const id3Code = getDTreeCodeTemplate(dataset, "id3");
      const c45Code = getDTreeCodeTemplate(dataset, "c45");
      const cartCode = getDTreeCodeTemplate(dataset, "cart");

      expect(id3Code).toContain("ID3 Decision Tree");
      expect(c45Code).toContain("C4.5 Decision Tree");
      expect(c45Code).toContain("GainRatio");
      expect(cartCode).toContain("CART Decision Tree");
      expect(cartCode).toContain("GiniReduction");
    });

    it("getNeuralCodeTemplate generates distinct reference code for perceptron vs mlp_sgd", () => {
      const perceptronCode = getNeuralCodeTemplate([], "perceptron");
      const mlpCode = getNeuralCodeTemplate([], "mlp_sgd");

      expect(perceptronCode).toContain("Single-Layer Perceptron");
      expect(mlpCode).toContain("Multi-Layer Perceptron");
      expect(mlpCode).toContain("sigmoid");
    });
  });
});
