import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, renderHook, act } from "@testing-library/react";
import { NavbarBrand } from "../components/navbar/NavbarBrand";
import { SidebarFooter } from "../components/sidebar/SidebarFooter";
import { ExerciseFiltersHeader } from "../components/exercises/ExerciseFiltersHeader";
import { App } from "../App";
import { useAppTheme } from "../hooks/useAppTheme";
import { exportProblemXml, exportProblemJson, parseProblemXml, parseProblemJson } from "../lib/problemIO";

// Mock canvas-confetti
vi.mock("canvas-confetti", () => ({ default: vi.fn() }));

describe("AI Playground Rebranding Verification Suite", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("1. NavbarBrand displays 'AI Playground' and handles navigation via click and keyboard", () => {
    const onToggleSidebar = vi.fn();
    const onSelectOverview = vi.fn();

    render(
      <NavbarBrand
        onToggleSidebar={onToggleSidebar}
        onSelectOverview={onSelectOverview}
      />
    );

    const brandTitle = screen.getByText("AI Playground");
    expect(brandTitle).toBeInTheDocument();
    expect(screen.getByText("Interactive AI Algorithm Lab")).toBeInTheDocument();

    // Click brand to select overview
    fireEvent.click(brandTitle);
    expect(onSelectOverview).toHaveBeenCalledTimes(1);

    // Enter key triggers overview
    fireEvent.keyDown(brandTitle, { key: "Enter" });
    expect(onSelectOverview).toHaveBeenCalledTimes(2);

    // Space key triggers overview
    fireEvent.keyDown(brandTitle, { key: " " });
    expect(onSelectOverview).toHaveBeenCalledTimes(3);

    // Toggle sidebar button
    const toggleBtn = screen.getByRole("button", { name: /toggle sidebar/i });
    fireEvent.click(toggleBtn);
    expect(onToggleSidebar).toHaveBeenCalledTimes(1);
  });

  it("2. SidebarFooter displays 'AI Playground' brand", () => {
    render(<SidebarFooter />);
    const footerBrand = screen.getByText("AI Playground");
    expect(footerBrand).toBeInTheDocument();
    expect(footerBrand.tagName).toBe("SPAN");
  });

  it("3. ExerciseFiltersHeader references 'AI Playground' curriculum without legacy branding", () => {
    render(
      <ExerciseFiltersHeader
        searchQuery=""
        onSearchChange={vi.fn()}
        chapters={["All"]}
        selectedChapter="All"
        onSelectChapter={vi.fn()}
      />
    );

    expect(
      screen.getByText(/David Poole and Alan Mackworth's curriculum on AI Playground/i)
    ).toBeInTheDocument();

    // Verify absence of old name
    expect(screen.queryByText(/AISpace/i)).not.toBeInTheDocument();
  });

  it("4. useAppTheme stores and retrieves theme under 'ai-playground-theme' in localStorage", () => {
    const { result } = renderHook(() => useAppTheme());

    // Defaults to dark
    expect(result.current.isDarkMode).toBe(true);
    expect(localStorage.getItem("ai-playground-theme")).toBe("dark");
    expect(localStorage.getItem("aispace-theme")).toBeNull();

    // Toggle theme to light
    act(() => {
      result.current.toggleDarkMode();
    });

    expect(result.current.isDarkMode).toBe(false);
    expect(localStorage.getItem("ai-playground-theme")).toBe("light");
    expect(localStorage.getItem("aispace-theme")).toBeNull();
  });

  it("5. Full App shell renders 'AI Playground' and contains zero occurrences of old branding", () => {
    const { container } = render(<App />);

    // Brand and footer present
    const brandOccurrences = screen.getAllByText("AI Playground");
    expect(brandOccurrences.length).toBeGreaterThanOrEqual(2);

    // Zero occurrences of 'aispace' or 'ai space' across entire rendered HTML
    const html = container.innerHTML;
    const oldBrandRegex = /(aispace|ai[ _-]?space)/i;
    expect(html).not.toMatch(oldBrandRegex);
  });

  it("6. Problem serialization formats use 'ai-playground-problem'", () => {
    const sample = { id: "test", val: 42 };

    const xml = exportProblemXml(sample, "search");
    expect(xml).toContain("<ai-playground-problem");
    expect(xml).not.toContain("aispace");

    const parsedXml = parseProblemXml(xml);
    expect(parsedXml.toolType).toBe("search");
    expect(parsedXml.problem.id).toBe("test");

    const json = exportProblemJson(sample, "bayes");
    expect(json).toContain('"format": "ai-playground-problem"');
    expect(json).not.toContain("aispace");

    const parsedJson = parseProblemJson(json);
    expect(parsedJson.toolType).toBe("bayes");
    expect(parsedJson.problem.id).toBe("test");
  });

  it("7. Repository configuration, homepage, and package name use lowercase 'ai-playground'", async () => {
    const pkg = await import("../../package.json");
    expect(pkg.name).toBe("ai-playground");
    expect(pkg.homepage).toBe("https://mrishab.github.io/ai-playground/");
    expect(pkg.repository.url).toContain("ai-playground");
    expect(pkg.repository.url).not.toMatch(/[A-Z]/);
  });
});
