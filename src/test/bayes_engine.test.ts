import { describe, it, expect } from "vitest";
import { BAYES_NETWORKS } from "@/data/bayesProblems";
import { computeBayesBeliefs, computeExactMarginal } from "@/components/bayes/bayesEngine";
import { generateVeSteps } from "@/components/bayes/bayesVeEngine";
import { isTrailActive, testDSeparationEngine, isDSeparated } from "@/components/bayes/dsepEngine";
import { computeNetworkDecisionAnalysis, computeExpectedUtilityForDecision } from "@/components/bayes/decisionNetworkEngine";

describe("1. Diagnostic Inference & Marginal Ground Truth", () => {
  it("Car Starting: setting Car Starts = T properly updates required subsystems", () => {
    const net = BAYES_NETWORKS.car;
    const beliefs = computeBayesBeliefs(net, { "Car Starts": "T" });

    expect(beliefs["Air System OK"]?.T).toBe(1.0);
    expect(beliefs["Fuel System OK"]?.T).toBe(1.0);
    expect(beliefs["Spark Adequate"]?.T).toBe(1.0);
  });

  it("Electrical Diagnosis: setting l1_lit = T maintains component operational probabilities", () => {
    const net = BAYES_NETWORKS.elec;
    const beliefs = computeBayesBeliefs(net, { l1_lit: "T" });

    expect(beliefs.l1_st?.ok).toBeGreaterThan(0.9);
    expect(beliefs.w0?.live).toBe(1.0);
  });

  it("Fire Alarm ground truth checks with alarm = T", () => {
    const net = BAYES_NETWORKS.basicfirealarm;
    const beliefs = computeBayesBeliefs(net, { alarm: "T" });

    expect(beliefs.tampering?.T).toBeCloseTo(0.633, 1);
    expect(beliefs.fire?.T).toBeCloseTo(0.367, 1);
    expect(beliefs.smoke?.T).toBeCloseTo(0.336, 1);
    expect(beliefs.leaving?.T).toBeCloseTo(0.880, 2);
  });

  it("Simple Umbrella ground truth check: Weather = Sunshine is 70.0%", () => {
    const net = BAYES_NETWORKS.umbrella;
    const beliefs = computeBayesBeliefs(net, {});

    expect(beliefs.Weather?.Sunshine).toBeCloseTo(0.700, 2);
    expect(beliefs.Weather?.Rain).toBeCloseTo(0.300, 2);
  });
});

describe("2. D-Separation Collider Rule & Independence Engine", () => {
  it("Simple graph collider rule (B -> C <- D, C -> F -> G)", () => {
    const net = BAYES_NETWORKS.simp1;

    // B and D given empty set ∅: D-separated
    expect(isDSeparated(net, "B", "D", new Set())).toBe(true);
    expect(testDSeparationEngine(net, {}, "B", "D")).toContain("D-SEPARATED");

    // B and D given collider C: DEPENDENT
    expect(isDSeparated(net, "B", "D", new Set(["C"]))).toBe(false);
    expect(testDSeparationEngine(net, { C: "T" }, "B", "D")).toContain("DEPENDENT");

    // B and D given descendant F: DEPENDENT
    expect(isDSeparated(net, "B", "D", new Set(["F"]))).toBe(false);
    expect(testDSeparationEngine(net, { F: "T" }, "B", "D")).toContain("DEPENDENT");

    // B and D given descendant G: DEPENDENT
    expect(isDSeparated(net, "B", "D", new Set(["G"]))).toBe(false);
    expect(testDSeparationEngine(net, { G: "T" }, "B", "D")).toContain("DEPENDENT");
  });

  it("Collider checks on Simple Umbrella and CI Quiz", () => {
    const umbrella = BAYES_NETWORKS.umbrella;
    // Weather and Umbrella given Forecast: D-separated
    expect(isTrailActive(umbrella, "Weather", "Umbrella", new Set(["Forecast"]))).toBe(false);
    // Weather and Umbrella given Forecast + Satisfaction (collider opens): DEPENDENT
    expect(isTrailActive(umbrella, "Weather", "Umbrella", new Set(["Forecast", "Satisfaction"]))).toBe(true);

    const quiz = BAYES_NETWORKS.independence;
    // G and J given empty set: D-separated
    expect(isTrailActive(quiz, "G", "J", new Set())).toBe(false);
    // G and J given collider H: DEPENDENT
    expect(isTrailActive(quiz, "G", "J", new Set(["H"]))).toBe(true);
    // G and J given descendant I: DEPENDENT
    expect(isTrailActive(quiz, "G", "J", new Set(["I"]))).toBe(true);
  });
});

describe("3. Expected Utility Math in Decision Networks", () => {
  it("Simple Umbrella: Decision = Take vs Leave, MEU = 77.00", () => {
    const net = BAYES_NETWORKS.umbrella;
    const euTake = computeExpectedUtilityForDecision(net, {}, { Umbrella: "Take_It" });
    const euLeave = computeExpectedUtilityForDecision(net, {}, { Umbrella: "Leave_At_Home" });

    expect(euTake).toBe(35.00);
    expect(euLeave).toBe(70.00);

    const analysis = computeNetworkDecisionAnalysis(net, {});
    expect(analysis.isDecisionNetwork).toBe(true);
    expect(analysis.meu).toBe(77.00);
  });

  it("Delivery Robot: optimal EU = 83.00 for (short, Wear Pads = T)", () => {
    const net = BAYES_NETWORKS.deliveryDecision;
    const analysis = computeNetworkDecisionAnalysis(net, {});

    expect(analysis.isDecisionNetwork).toBe(true);
    expect(analysis.optimalEU).toBe(83.00);
    expect(analysis.meu).toBe(83.00);

    const best = analysis.alternatives.find((a) => a.isOptimal);
    expect(best?.cfg["Which Way"]).toBe("short");
    expect(best?.cfg["Wear Pads"]).toBe("T");
  });
});

describe("4. Step-by-Step Variable Elimination", () => {
  it("Step-by-Step VE on Umbrella at step 4/4 has no 0.0% crash", () => {
    const net = BAYES_NETWORKS.umbrella;
    const steps = generateVeSteps(net, "Weather", {});

    expect(steps.length).toBe(4);
    const finalStep = steps[steps.length - 1];
    expect(finalStep.action).toBe("Normalize");
    expect(finalStep.normalizedResult?.Sunshine).toBeCloseTo(0.700, 2);
    expect(finalStep.normalizedResult?.Rain).toBeCloseTo(0.300, 2);
  });

  it("Dynamic factor query tables update accurately for queried variables", () => {
    const net = BAYES_NETWORKS.umbrella;
    const forecastSteps = generateVeSteps(net, "Forecast", {});
    const finalForecast = forecastSteps[forecastSteps.length - 1];

    expect(finalForecast.normalizedResult?.Sunny).toBeCloseTo(0.535, 2);
    expect(finalForecast.normalizedResult?.Cloudy).toBeCloseTo(0.215, 2);
    expect(finalForecast.normalizedResult?.Rainy).toBeCloseTo(0.250, 2);
  });

  it("Handles observed query variable gracefully", () => {
    const net = BAYES_NETWORKS.basicfirealarm;
    const steps = generateVeSteps(net, "alarm", { alarm: "T" });
    const last = steps[steps.length - 1];

    expect(last.action).toBe("Observed Evidence");
    expect(last.normalizedResult?.T).toBe(1.0);
    expect(last.normalizedResult?.F).toBe(0.0);
  });
});
