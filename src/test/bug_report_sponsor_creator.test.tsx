import React, { createRef } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BugReportBubble } from "../components/feedback/BugReportBubble";
import BugReportBubbleDefault from "../components/feedback/BugReportBubble";
import { AuthorLink } from "../components/navbar/AuthorLink";
import AuthorLinkDefault from "../components/navbar/AuthorLink";
import { AuthorLink as HeaderAuthorLink } from "../components/site-header/AuthorLink";
import HeaderAuthorLinkDefault from "../components/site-header/AuthorLink";
import { SponsorButton } from "../components/navbar/SponsorButton";
import SponsorButtonDefault from "../components/navbar/SponsorButton";
import { SponsorButton as HeaderSponsorButton } from "../components/site-header/SponsorButton";
import HeaderSponsorButtonDefault from "../components/site-header/SponsorButton";
import { NavbarActions } from "../components/navbar/NavbarActions";
import { Button } from "../components/ui/Button";
import { App } from "../App";
import {
  buildBugReport,
  copyReportToClipboard,
  openGitHubIssueWithReport,
  triggerBugReport,
} from "../lib/bugReport";
import {
  initConsoleLogger,
  getConsoleLogs,
  clearConsoleLogs,
  formatLogsForReport,
} from "../lib/consoleLogger";

// Mock canvas-confetti
vi.mock("canvas-confetti", () => ({ default: vi.fn() }));

describe("Report Bug, Sponsor, and Creator buttons Suite", () => {
  beforeEach(() => {
    clearConsoleLogs();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("1. Creator Button (AuthorLink)", () => {
    it("renders creator GitHub link with correct attributes and icon", () => {
      render(<AuthorLink />);

      const link = screen.getByRole("link", { name: /Rishab Manocha on GitHub/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://github.com/mrishab");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAttribute("title", "Rishab Manocha on GitHub");
      expect(screen.getByText("Rishab Manocha")).toBeInTheDocument();
    });

    it("supports default and site-header alias imports", () => {
      const { container: c1 } = render(<AuthorLinkDefault />);
      const { container: c2 } = render(<HeaderAuthorLink />);
      const { container: c3 } = render(<HeaderAuthorLinkDefault />);
      expect(c1.querySelector("a")).toHaveAttribute("href", "https://github.com/mrishab");
      expect(c2.querySelector("a")).toHaveAttribute("href", "https://github.com/mrishab");
      expect(c3.querySelector("a")).toHaveAttribute("href", "https://github.com/mrishab");
    });
  });

  describe("2. Sponsor Button (SponsorButton)", () => {
    it("renders Ko-fi sponsor link with correct attributes and styling", () => {
      render(<SponsorButton />);

      const link = screen.getByRole("link", { name: /Sponsor project on Ko-fi/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://ko-fi.com/mrishab");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAttribute("title", "Sponsor this project on Ko-fi");
      expect(screen.getByText("Sponsor")).toBeInTheDocument();
    });

    it("supports default and site-header alias imports", () => {
      const { container: c1 } = render(<SponsorButtonDefault />);
      const { container: c2 } = render(<HeaderSponsorButton />);
      const { container: c3 } = render(<HeaderSponsorButtonDefault />);
      expect(c1.querySelector("a")).toHaveAttribute("href", "https://ko-fi.com/mrishab");
      expect(c2.querySelector("a")).toHaveAttribute("href", "https://ko-fi.com/mrishab");
      expect(c3.querySelector("a")).toHaveAttribute("href", "https://ko-fi.com/mrishab");
    });
  });

  describe("3. Button asChild and Ref Forwarding", () => {
    it("preserves Button.displayName as 'Button'", () => {
      expect(Button.displayName).toBe("Button");
    });

    it("forwards ref to child element when asChild is true", () => {
      const ref = createRef<HTMLAnchorElement>();
      render(
        <Button asChild ref={ref as any}>
          <a href="https://example.com">Example</a>
        </Button>
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
      expect(ref.current?.getAttribute("href")).toBe("https://example.com");
    });

    it("handles asChild with non-element children gracefully", () => {
      render(<Button asChild>Simple text</Button>);
      expect(screen.getByRole("button")).toHaveTextContent("Simple text");
    });
  });

  describe("4. NavbarActions Integration", () => {
    it("renders both creator and sponsor buttons alongside existing actions", () => {
      render(
        <NavbarActions
          currentView="overview"
          onSelectView={vi.fn()}
          onOpenCommandPalette={vi.fn()}
          isDarkMode={false}
          onToggleDarkMode={vi.fn()}
        />
      );

      expect(screen.getByRole("link", { name: /Rishab Manocha on GitHub/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Sponsor project on Ko-fi/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Exercises/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Switch to dark theme/i })).toBeInTheDocument();
    });
  });

  describe("5. Floating BugReportBubble Component", () => {
    it("renders floating button with accessible name and title", () => {
      render(<BugReportBubble />);

      const btn = screen.getByRole("button", {
        name: /Report bug on GitHub with diagnostic logs/i,
      });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveAttribute("title", "Report bug (copies state & logs to GitHub issue)");
      expect(btn.className).toContain("fixed");
      expect(btn.className).toContain("right-");
      expect(screen.getByText("Report Bug")).toBeInTheDocument();
    });

    it("triggers bug report, shows feedback state and resets after timeout", async () => {
      vi.useFakeTimers();

      const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: writeTextMock,
        },
      });

      render(<BugReportBubble />);

      const btn = screen.getByRole("button", {
        name: /Report bug on GitHub with diagnostic logs/i,
      });

      await act(async () => {
        fireEvent.click(btn);
      });

      expect(writeTextMock).toHaveBeenCalled();
      expect(openSpy).toHaveBeenCalled();
      expect(screen.getByText("Diagnostics Copied!")).toBeInTheDocument();

      // Advance timers by 2800ms to verify reset
      act(() => {
        vi.advanceTimersByTime(2800);
      });

      expect(screen.getByText("Report Bug")).toBeInTheDocument();
    });

    it("resets timeout on rapid successive clicks and cleans up on unmount", async () => {
      vi.useFakeTimers();
      vi.spyOn(window, "open").mockImplementation(() => null);
      Object.assign(navigator, {
        clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
      });

      const { unmount } = render(<BugReportBubble />);
      const btn = screen.getByRole("button", {
        name: /Report bug on GitHub with diagnostic logs/i,
      });

      await act(async () => {
        fireEvent.click(btn);
      });
      expect(screen.getByText("Diagnostics Copied!")).toBeInTheDocument();

      // Click again after 1500ms
      act(() => {
        vi.advanceTimersByTime(1500);
      });
      await act(async () => {
        fireEvent.click(btn);
      });

      // At 2800ms (1300ms after second click), should STILL be in copied state
      act(() => {
        vi.advanceTimersByTime(1300);
      });
      expect(screen.getByText("Diagnostics Copied!")).toBeInTheDocument();

      // Advance remaining 1500ms to reach full 2800ms after second click
      act(() => {
        vi.advanceTimersByTime(1500);
      });
      expect(screen.getByText("Report Bug")).toBeInTheDocument();

      // Verify unmount does not throw
      unmount();
    });

    it("supports default export", () => {
      render(<BugReportBubbleDefault />);
      expect(screen.getByText("Report Bug")).toBeInTheDocument();
    });
  });

  describe("6. Console Logger and Bug Report Generation", () => {
    it("captures console logs across all log levels", () => {
      initConsoleLogger();
      clearConsoleLogs();

      console.log("standard log message");
      console.info("info log message");
      console.warn("warning log message");
      console.error("error log message");

      const captured = getConsoleLogs();
      expect(captured.length).toBe(4);
      expect(captured[0].level).toBe("log");
      expect(captured[0].message).toBe("standard log message");
      expect(captured[1].level).toBe("info");
      expect(captured[2].level).toBe("warn");
      expect(captured[3].level).toBe("error");

      const formatted = formatLogsForReport();
      expect(formatted).toContain("[LOG] standard log message");
      expect(formatted).toContain("[INFO] info log message");
      expect(formatted).toContain("[WARN] warning log message");
      expect(formatted).toContain("[ERROR] error log message");
    });

    it("accurately detects Dark and Light themes in report", () => {
      // Test dark mode via localStorage
      localStorage.setItem("ai-playground-theme", "dark");
      let report = buildBugReport();
      expect(report).toContain("- **Theme:** Dark");

      // Test light mode via localStorage
      localStorage.setItem("ai-playground-theme", "light");
      report = buildBugReport();
      expect(report).toContain("- **Theme:** Light");

      // Test dark mode fallback via DOM
      localStorage.clear();
      const div = document.createElement("div");
      div.className = "dark";
      document.body.appendChild(div);
      report = buildBugReport();
      expect(report).toContain("- **Theme:** Dark");
      document.body.removeChild(div);
    });

    it("handles clipboard copy success and fallback", async () => {
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined),
        },
      });
      const success = await copyReportToClipboard("test report");
      expect(success).toBe(true);

      // Clipboard rejection
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn().mockRejectedValue(new Error("Permission denied")),
        },
      });
      const failed = await copyReportToClipboard("test report");
      expect(failed).toBe(false);
    });

    it("opens GitHub issue with truncated body when report exceeds length limit", () => {
      const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
      const longBody = "A".repeat(5000);

      openGitHubIssueWithReport(longBody);

      expect(openSpy).toHaveBeenCalledTimes(1);
      const openedUrl = openSpy.mock.calls[0][0] as string;
      expect(openedUrl).toContain("https://github.com/mrishab/ai-playground/issues/new");
      expect(openedUrl).toContain("Full+diagnostics");
    });

    it("triggerBugReport executes open synchronously and then awaits copy to prevent popup blocking", async () => {
      const callOrder: string[] = [];
      vi.spyOn(window, "open").mockImplementation(() => {
        callOrder.push("window.open");
        return null;
      });
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn().mockImplementation(async () => {
            callOrder.push("clipboard.writeText");
          }),
        },
      });

      const result = await triggerBugReport();
      expect(result.copied).toBe(true);
      // Verify window.open was executed before clipboard async resolution for popup blocker safety
      expect(callOrder[0]).toBe("window.open");
      expect(callOrder[1]).toBe("clipboard.writeText");
    });
  });

  describe("7. Full App Integration", () => {
    it("renders App with creator button, sponsor button, and floating report bug button", () => {
      render(<App />);

      expect(screen.getByRole("link", { name: /Rishab Manocha on GitHub/i })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Sponsor project on Ko-fi/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Report bug on GitHub with diagnostic logs/i })).toBeInTheDocument();
    });
  });
});
