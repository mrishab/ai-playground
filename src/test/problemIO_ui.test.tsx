import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchTool } from "../components/search/SearchTool";
import { ConstraintTool } from "../components/constraint/ConstraintTool";
import { BayesTool } from "../components/bayes/BayesTool";
import { GraphBuilder } from "../components/graph_builder/GraphBuilder";

// Mock canvas-confetti
vi.mock("canvas-confetti", () => ({ default: vi.fn() }));

describe("Problem Export, Reset, and Import UI Integration", () => {
  it("1. SearchTool exports problem to JSON and XML", () => {
    render(<SearchTool />);

    // Export JSON button exists
    const exportJsonBtn = screen.getByTestId("export-json-btn");
    expect(exportJsonBtn).toBeInTheDocument();
    fireEvent.click(exportJsonBtn);

    // Modal with exported JSON appears
    expect(screen.getByTestId("exported-modal")).toBeInTheDocument();
    const output = screen.getByTestId("last-exported-output") as HTMLTextAreaElement;
    expect(output.value).toContain('"format": "ai-playground-problem"');
    expect(output.value).toContain('"toolType": "search"');
    expect(output.value).toContain("Vancouver Travel Map");

    // Close modal
    fireEvent.click(screen.getByTestId("close-exported-modal"));
    expect(screen.queryByTestId("exported-modal")).not.toBeInTheDocument();

    // Export XML button exists
    const exportXmlBtn = screen.getByTestId("export-xml-btn");
    fireEvent.click(exportXmlBtn);
    expect(screen.getByTestId("exported-modal")).toBeInTheDocument();
    const xmlOutput = screen.getByTestId("last-exported-output") as HTMLTextAreaElement;
    expect(xmlOutput.value).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xmlOutput.value).toContain('<ai-playground-problem');
    expect(xmlOutput.value).toContain('toolType="search"');
  });

  it("2. SearchTool exports, resets, and imports problem via JSON and XML and steps", async () => {
    render(<SearchTool />);

    // Step 1: Export current Vancouver graph as XML
    fireEvent.click(screen.getByTestId("export-xml-btn"));
    const exportedXml = (screen.getByTestId("last-exported-output") as HTMLTextAreaElement).value;
    fireEvent.click(screen.getByTestId("close-exported-modal"));

    // Step 2: Reset Problem
    const resetBtn = screen.getByTestId("reset-problem-btn");
    fireEvent.click(resetBtn);

    // After reset, description indicates reset
    expect(screen.getByText(/Reset empty graph/i)).toBeInTheDocument();

    // Step 3: Import exported XML
    const importBtn = screen.getByTestId("import-problem-btn");
    fireEvent.click(importBtn);

    expect(screen.getByTestId("import-modal")).toBeInTheDocument();
    const textarea = screen.getByTestId("problem-import-textarea");
    fireEvent.change(textarea, { target: { value: exportedXml } });

    const submitBtn = screen.getByTestId("problem-import-submit");
    fireEvent.click(submitBtn);

    // Modal closes
    await waitFor(() => {
      expect(screen.queryByTestId("import-modal")).not.toBeInTheDocument();
    });

    // Vancouver Travel Map is restored!
    expect(screen.getByText(/Vancouver Travel Map/i)).toBeInTheDocument();

    // And algorithm can step forward!
    const stepBtn = screen.getByRole("button", { name: /Step Forward/i });
    expect(stepBtn).toBeEnabled();
    fireEvent.click(stepBtn);
    expect(screen.getAllByText(/Expanded/i).length).toBeGreaterThan(0);
  });

  it("3. ConstraintTool exports, resets, and imports CSP problem via XML", async () => {
    render(<ConstraintTool />);

    // 1. Export XML
    fireEvent.click(screen.getByTestId("export-xml-btn"));
    const exportedXml = (screen.getByTestId("last-exported-output") as HTMLTextAreaElement).value;
    fireEvent.click(screen.getByTestId("close-exported-modal"));

    // 2. Reset Problem
    fireEvent.click(screen.getByTestId("reset-problem-btn"));
    expect(screen.getByText(/Reset empty CSP problem/i)).toBeInTheDocument();

    // 3. Import XML
    fireEvent.click(screen.getByTestId("import-problem-btn"));
    fireEvent.change(screen.getByTestId("problem-import-textarea"), { target: { value: exportedXml } });
    fireEvent.click(screen.getByTestId("problem-import-submit"));

    await waitFor(() => {
      expect(screen.queryByTestId("import-modal")).not.toBeInTheDocument();
    });

    // Simple Problem 1 description restored!
    expect(screen.getByText(/This simple CSP uses three integer variables/i)).toBeInTheDocument();

    // Step algorithm works!
    const stepBtn = screen.getByRole("button", { name: /Advance Arc/i });
    expect(stepBtn).toBeEnabled();
    fireEvent.click(stepBtn);
  });

  it("4. BayesTool exports, resets, and imports BayesNetwork via JSON", async () => {
    render(<BayesTool />);

    // 1. Export JSON
    fireEvent.click(screen.getByTestId("export-json-btn"));
    const exportedJson = (screen.getByTestId("last-exported-output") as HTMLTextAreaElement).value;
    fireEvent.click(screen.getByTestId("close-exported-modal"));

    // 2. Reset Problem
    fireEvent.click(screen.getByTestId("reset-problem-btn"));
    expect(screen.getByText(/Reset empty Bayesian network/i)).toBeInTheDocument();

    // 3. Import JSON
    fireEvent.click(screen.getByTestId("import-problem-btn"));
    fireEvent.change(screen.getByTestId("problem-import-textarea"), { target: { value: exportedJson } });
    fireEvent.click(screen.getByTestId("problem-import-submit"));

    await waitFor(() => {
      expect(screen.queryByTestId("import-modal")).not.toBeInTheDocument();
    });

    // Umbrella network description restored!
    expect(screen.getByText(/Decision network modeling whether to bring an umbrella/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Weather/i).length).toBeGreaterThan(0);
  });

  it("5. GraphBuilder exports graph to XML, resets canvas, and imports it back", async () => {
    render(<GraphBuilder />);

    // Initial Triangle preset has 3 nodes
    expect(screen.getByText(/3 Nodes/i)).toBeInTheDocument();

    // 1. Export XML from GraphBuilder
    const exportXmlBtn = screen.getByTestId("gb-export-xml");
    fireEvent.click(exportXmlBtn);

    // Check window.__lastExportedProblem
    const exportedXml = (window as any).__lastExportedProblem;
    expect(exportedXml).toContain("<ai-playground-problem");

    // 2. Reset GraphBuilder Canvas
    const resetBtn = screen.getByTestId("gb-reset-btn");
    fireEvent.click(resetBtn);
    expect(screen.getByText(/0 Nodes/i)).toBeInTheDocument();

    // 3. Import Graph
    const importBtn = screen.getByTestId("gb-import-btn");
    fireEvent.click(importBtn);

    const textarea = screen.getByTestId("gb-import-textarea");
    fireEvent.change(textarea, { target: { value: exportedXml } });

    const submitBtn = screen.getByTestId("gb-import-submit");
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.queryByTestId("gb-import-modal")).not.toBeInTheDocument();
    });

    // 3 Nodes restored!
    expect(screen.getByText(/3 Nodes/i)).toBeInTheDocument();
    expect(screen.getByTestId("gb-node-S")).toBeInTheDocument();
    expect(screen.getByTestId("gb-node-A")).toBeInTheDocument();
    expect(screen.getByTestId("gb-node-G")).toBeInTheDocument();
  });
});
