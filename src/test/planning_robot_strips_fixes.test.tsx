import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { solveStripsCsp } from "@/components/strips_to_csp/stripsCspSolver";
import { StripsToCspTool } from "@/components/strips_to_csp/StripsToCspTool";
import { ROBOT_WORLDS } from "@/data/robotProblems";
import { computeNextRobotStep } from "@/components/robot/robotController";
import { RobotTool } from "@/components/robot/RobotTool";
import { synthesizePlan } from "@/components/planning/planningSynthesizer";
import { isGoalContradictory } from "@/components/planning/planningSearch";
import { PLANNING_PROBLEMS } from "@/data/planningProblems";
import { PlanningTool } from "@/components/planning/PlanningTool";

describe("P1-2 Planning, Robot Control & STRIPS to CSP Fixes Verification", () => {
  describe("1. STRIPS to CSP Solver & Fluent Assignments", () => {
    it("assigns solved state fluents for t=1..k on Coffee Delivery Robot (k=4)", () => {
      const res = solveStripsCsp("coffeeDelivery", 4, "bounded_csp");
      expect(res.isSolved).toBe(true);
      expect(res.plan.length).toBe(4);
      expect(res.stepFluents).toBeDefined();
      expect(res.stepFluents?.length).toBe(5);

      // t=0: initial state
      expect(res.stepFluents?.[0]).toEqual({
        location: "cs",
        hasCoffee: "false",
        userHasCoffee: "false",
      });
      // t=1: after PUC
      expect(res.stepFluents?.[1]).toEqual({
        location: "cs",
        hasCoffee: "true",
        userHasCoffee: "false",
      });
      // t=2: after mcc
      expect(res.stepFluents?.[2]).toEqual({
        location: "hallway",
        hasCoffee: "true",
        userHasCoffee: "false",
      });
      // t=3: after mo
      expect(res.stepFluents?.[3]).toEqual({
        location: "office",
        hasCoffee: "true",
        userHasCoffee: "false",
      });
      // t=4: after DelC
      expect(res.stepFluents?.[4]).toEqual({
        location: "office",
        hasCoffee: "false",
        userHasCoffee: "true",
      });
    });

    it("assigns solved state fluents for t=1..k on Two-Floor Elevator (k=3)", () => {
      const res = solveStripsCsp("elevator", 3, "bounded_csp");
      expect(res.isSolved).toBe(true);
      expect(res.plan.length).toBe(3);
      expect(res.stepFluents).toBeDefined();
      expect(res.stepFluents?.length).toBe(4);

      // t=0: initial
      expect(res.stepFluents?.[0]).toEqual({
        liftFloor: "floor1",
        passengerLoc: "floor1",
      });
      // t=1: after board
      expect(res.stepFluents?.[1]).toEqual({
        liftFloor: "floor1",
        passengerLoc: "inLift",
      });
      // t=2: after moveUp
      expect(res.stepFluents?.[2]).toEqual({
        liftFloor: "floor2",
        passengerLoc: "inLift",
      });
      // t=3: after unboard
      expect(res.stepFluents?.[3]).toEqual({
        liftFloor: "floor2",
        passengerLoc: "floor2",
      });
    });

    it("supports SATPlan Reduction option with CNF boolean encoding logs and stats", () => {
      const satRes = solveStripsCsp("coffeeDelivery", 4, "sat_plan");
      expect(satRes.isSolved).toBe(true);
      expect(satRes.log).toContain("SATPlan");
      expect(satRes.log).toContain("boolean variables");
      expect(satRes.encodingStats?.solverType).toBe("SATPlan");

      const satResUnsat = solveStripsCsp("coffeeDelivery", 2, "sat_plan");
      expect(satResUnsat.isSolved).toBe(false);
      expect(satResUnsat.log).toContain("unsatisfiable");
    });

    it("renders solved state fluents in StripsToCspTool UI without domain wipeout placeholders", () => {
      render(<StripsToCspTool />);
      // Initially at k=0, domain shows
      expect(screen.getByText("Planning Horizon (k):")).toBeInTheDocument();
      // Step to k=4
      const stepBtn = screen.getByRole("button", { name: /Step Horizon/i });
      fireEvent.click(stepBtn); // k=1
      fireEvent.click(stepBtn); // k=2
      fireEvent.click(stepBtn); // k=3
      fireEvent.click(stepBtn); // k=4
      expect(screen.getAllByText(/hallway/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/office/i).length).toBeGreaterThan(0);
    });
  });

  describe("2. Robot Control (Prototype)", () => {
    it("ensures U-Shaped Trap map initial spawn coordinate matches start marker outside U-trap", () => {
      const trap = ROBOT_WORLDS.trapMaze;
      expect(trap.locations[0].name).toBe("start");
      expect(trap.locations[0].x).toBe(100);
      expect(trap.locations[0].y).toBe(250);
      expect(trap.robot.x).toBe(100);
      expect(trap.robot.y).toBe(250);
      expect(trap.robot.angle).toBe(0);
    });

    it("executes Reactive Wall Following controller to turn away from front wall and maintain side distance", () => {
      const world = ROBOT_WORLDS.trapMaze;
      // Place robot facing the wall directly ahead
      const poseFacingWall = { x: 180, y: 150, angle: 0 };
      const target = { x: 500, y: 80 };

      const resWallFollowing = computeNextRobotStep(poseFacingWall, target, world, {
        algo: "wall_following",
        steeringGain: 1.2,
        obstacleSensitivity: 35,
      });

      // Front sensor detects wall at x=200 (distance ~20 < 35), so it turns away!
      expect(resWallFollowing.sensorWhiskers.front).toBeLessThan(35);
      expect(resWallFollowing.newPose.angle).not.toBe(poseFacingWall.angle);
    });

    it("renders steering gain and obstacle avoidance sensitivity sliders in RobotTool", () => {
      render(<RobotTool />);
      expect(screen.getByText(/Controller Tuning/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Steering Gain/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Obstacle Avoidance Sensitivity/i)).toBeInTheDocument();
    });
  });

  describe("3. STRIPS Planning (Prototype)", () => {
    it("discovers plans via genuine state-space search for sussman, simpleSwap, and fiveBlocks", () => {
      const sussmanPlan = synthesizePlan("sussman", "forward");
      expect(sussmanPlan.length).toBe(6);
      expect(sussmanPlan[0].name).toBe("unstack");
      expect(sussmanPlan[sussmanPlan.length - 1].name).toBe("stack");

      const swapPlan = synthesizePlan("simpleSwap", "forward");
      expect(swapPlan.length).toBe(2);
      expect(swapPlan[0].name).toBe("pickup");
      expect(swapPlan[1].name).toBe("stack");

      const fivePlan = synthesizePlan("fiveBlocks", "forward");
      expect(fivePlan.length).toBeGreaterThanOrEqual(10);
      expect(fivePlan.length).toBeLessThanOrEqual(12);
    });

    it("supports secondary Goal Regression planning dropdown option", () => {
      const regPlan = synthesizePlan("sussman", "regression");
      expect(regPlan.length).toBe(6);
    });

    it("detects Contradictory Goal Test and flags it as contradictory/unsolvable", () => {
      const impossibleProblem = PLANNING_PROBLEMS.impossible;
      const check = isGoalContradictory(impossibleProblem);
      expect(check.contradictory).toBe(true);
      expect(check.reason).toContain("simultaneously");

      const plan = synthesizePlan("impossible");
      expect(plan).toEqual([]);
    });

    it("displays 'Goal: Unsolvable' in PlanningTool for impossible problem", () => {
      render(<PlanningTool />);
      // Switch problem to impossible
      const select = screen.getByLabelText(/Select Blocks World Problem/i);
      fireEvent.change(select, { target: { value: "impossible" } });
      expect(screen.getAllByText(/Unsolvable/i).length).toBeGreaterThan(0);
      expect(screen.queryByText(/In Progress/i)).not.toBeInTheDocument();
    });

    it("resets pause button / isExecuting after plan execution completes", () => {
      render(<PlanningTool />);
      // On sussman problem, click Step Action through all 6 steps
      const stepBtn = screen.getByRole("button", { name: /Step Action/i });
      for (let i = 0; i < 6; i++) {
        fireEvent.click(stepBtn);
      }
      // Goal should be Achieved, and Animate Plan button should not be "Pause"
      expect(screen.getByText(/Achieved/i)).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /^Pause$/i })).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Animate Plan/i })).toBeInTheDocument();
    });
  });
});
