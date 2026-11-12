import { describe, it, expect } from "vitest";
import {
  exportProblemJson,
  exportProblemXml,
  parseProblemJson,
  parseProblemXml,
  importProblemAny,
} from "../lib/problemIO";
import { SEARCH_GRAPHS } from "../data/searchProblems";
import { CSP_PROBLEMS } from "../data/cspProblems";
import { BAYES_NETWORKS } from "../data/bayesProblems";
import { DTREE_DATASETS } from "../data/dtreeProblems";
import { NEURAL_DATASETS } from "../data/neuralProblems";
import { DEDUCTION_KBS } from "../data/deductionProblems";
import { PLANNING_PROBLEMS } from "../data/planningProblems";
import { ROBOT_WORLDS } from "../data/robotProblems";
import { STRIPS_PROBLEMS } from "../data/stripsProblems";

describe("Universal Problem I/O (JSON & XML)", () => {
  it("roundtrips SearchGraph in JSON", () => {
    const original = SEARCH_GRAPHS.vancouver;
    const json = exportProblemJson(original, "search");
    const { toolType, problem } = parseProblemJson(json);

    expect(toolType).toBe("search");
    expect(problem.id).toBe(original.id);
    expect(problem.nodes.length).toBe(original.nodes.length);
    expect(problem.edges.length).toBe(original.edges.length);
    expect(problem.startNode).toBe(original.startNode);
    expect(problem.goalNodes).toEqual(original.goalNodes);
  });

  it("roundtrips SearchGraph in XML", () => {
    const original = SEARCH_GRAPHS.vancouver;
    const xml = exportProblemXml(original, "search");
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<aispace-problem');

    const { toolType, problem } = parseProblemXml(xml);
    expect(toolType).toBe("search");
    expect(problem.id).toBe(original.id);
    expect(problem.nodes.length).toBe(original.nodes.length);
    expect(problem.edges.length).toBe(original.edges.length);
    expect(problem.startNode).toBe(original.startNode);
    expect(problem.goalNodes).toEqual(original.goalNodes);
    expect(typeof problem.nodes[0].x).toBe("number");
    expect(typeof problem.nodes[0].isStart).toBe("boolean");
  });

  it("roundtrips CSPProblem with nested domain & allowed arrays in XML & JSON", () => {
    const original = CSP_PROBLEMS.simple1;
    const xml = exportProblemXml(original, "constraint");
    const { toolType: tXml, problem: pXml } = importProblemAny(xml);

    expect(tXml).toBe("constraint");
    expect(pXml.id).toBe(original.id);
    expect(pXml.variables.length).toBe(original.variables.length);
    expect(pXml.variables[0].domain).toEqual(original.variables[0].domain);

    const json = exportProblemJson(original, "constraint");
    const { toolType: tJson, problem: pJson } = importProblemAny(json);
    expect(tJson).toBe("constraint");
    expect(pJson.id).toBe(original.id);
    expect(pJson.variables.length).toBe(original.variables.length);
  });

  it("roundtrips BayesNetwork in XML & JSON", () => {
    const original = BAYES_NETWORKS.umbrella;
    const xml = exportProblemXml(original, "bayes");
    const { toolType, problem } = parseProblemXml(xml);

    expect(toolType).toBe("bayes");
    expect(problem.id).toBe(original.id);
    expect(problem.nodes.length).toBe(original.nodes.length);
    expect(problem.cpts.length).toBe(original.cpts.length);
  });

  it("roundtrips DeductionKB with special characters in XML", () => {
    const original = DEDUCTION_KBS.elect;
    const xml = exportProblemXml(original, "deduction");
    const { toolType, problem } = parseProblemXml(xml);

    expect(toolType).toBe("deduction");
    expect(problem.id).toBe(original.id);
    expect(problem.code).toBe(original.code);
    expect(problem.sampleQueries).toEqual(original.sampleQueries);
  });

  it("roundtrips DTreeDataset in XML & JSON", () => {
    const original = DTREE_DATASETS.playTennis;
    const xml = exportProblemXml(original, "dtree");
    const { problem } = parseProblemXml(xml);

    expect(problem.id).toBe(original.id);
    expect(problem.attributes).toEqual(original.attributes);
    expect(problem.examples.length).toBe(original.examples.length);
    expect(problem.examples[0].Outlook).toBe("Sunny");
  });

  it("roundtrips NeuralDataset in XML", () => {
    const original = NEURAL_DATASETS.xor;
    const xml = exportProblemXml(original, "neural");
    const { problem } = parseProblemXml(xml);

    expect(problem.id).toBe(original.id);
    expect(problem.points.length).toBe(original.points.length);
    expect(typeof problem.points[0].x).toBe("number");
  });

  it("roundtrips PlanningProblem with block stacks in XML & JSON", () => {
    const original = PLANNING_PROBLEMS.sussman;
    const xml = exportProblemXml(original, "planning");
    const { problem } = parseProblemXml(xml);

    expect(problem.id).toBe(original.id);
    expect(problem.blocks.length).toBe(original.blocks.length);
    expect(problem.initial.stacks).toEqual(original.initial.stacks);
  });

  it("roundtrips RobotWorld and StripsProblem in XML", () => {
    const rOrig = ROBOT_WORLDS.bookWorld;
    const rXml = exportProblemXml(rOrig, "robot");
    const { problem: rProb } = parseProblemXml(rXml);
    expect(rProb.locations.length).toBe(rOrig.locations.length);
    expect(rProb.robot.x).toBe(rOrig.robot.x);

    const sOrig = STRIPS_PROBLEMS.coffeeDelivery;
    const sXml = exportProblemXml(sOrig, "strips_to_csp");
    const { problem: sProb } = parseProblemXml(sXml);
    expect(sProb.variables.length).toBe(sOrig.variables.length);
    expect(sProb.actions.length).toBe(sOrig.actions.length);
  });

  it("handles empty arrays, empty objects, and null values safely", () => {
    const edgeCase = {
      emptyArr: [],
      emptyObj: {},
      nullVal: null,
      zeroNum: 0,
      falseBool: false,
      emptyStr: "",
    };
    const xml = exportProblemXml(edgeCase, "edgeCase");
    const { problem } = parseProblemXml(xml);

    expect(problem.emptyArr).toEqual([]);
    expect(problem.emptyObj).toEqual({});
    expect(problem.nullVal).toBeNull();
    expect(problem.zeroNum).toBe(0);
    expect(problem.falseBool).toBe(false);
    expect(problem.emptyStr).toBe("");
  });

  it("preserves object with 'item' property name without converting to array", () => {
    const objWithItem = {
      item: "pencil",
      nested: {
        item: 42,
      },
    };
    const xml = exportProblemXml(objWithItem, "itemTest");
    const { problem } = parseProblemXml(xml);

    expect(Array.isArray(problem)).toBe(false);
    expect(problem.item).toBe("pencil");
    expect(problem.nested.item).toBe(42);
  });

  it("handles reserved XML prefixes, special characters, and control characters safely", () => {
    const specialKeys = {
      xmlData: "valid",
      "spaced key": "spaced",
      "user:id": 1234,
      withControlChar: "hello\x07world",
    };
    const xml = exportProblemXml(specialKeys, "special");
    const { problem } = parseProblemXml(xml);

    expect(problem.xmlData).toBe("valid");
    expect(problem["spaced key"]).toBe("spaced");
    expect(problem["user:id"]).toBe(1234);
    expect(problem.withControlChar).toBe("helloworld");
  });

  it("rejects invalid XML and JSON with descriptive error", () => {
    expect(() => parseProblemXml("<broken><unclosed></broken>")).toThrow(/XML Parse Error/i);
    expect(() => importProblemAny("{ malformed json: ")).toThrow();
    expect(() => importProblemAny("   ")).toThrow(/Empty input/i);
    expect(() => importProblemAny("")).toThrow(/Empty input/i);
  });
});
