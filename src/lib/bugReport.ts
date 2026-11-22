import { formatLogsForReport, getConsoleLogs } from "./consoleLogger";

const GITHUB_REPO_ISSUES_URL =
  "https://github.com/mrishab/ai-playground/issues/new";
const MAX_URL_BODY_LENGTH = 3500;

export function buildBugReport(): string {
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "Unknown";
  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent : "Unknown";
  const screenResolution =
    typeof window !== "undefined"
      ? `${window.innerWidth}x${window.innerHeight}`
      : "Unknown";
  const timestamp = new Date().toISOString();

  const currentView =
    typeof window !== "undefined" && window.location.hash
      ? window.location.hash.replace(/^#\/?/, "").trim() || "overview"
      : "overview";

  const isDarkMode =
    (typeof localStorage !== "undefined" &&
      localStorage.getItem("ai-playground-theme") === "dark") ||
    (typeof document !== "undefined" &&
      (document.documentElement?.classList?.contains("dark") ||
        Boolean(document.querySelector(".dark"))));

  const totalLogs = getConsoleLogs().length;
  const consoleLogs = formatLogsForReport(50);

  return `## 🐛 Bug Report

### Description
<!-- Please briefly describe what went wrong or what you experienced -->

### Steps to Reproduce
1.
2.
3.

### 📊 Application State
- **URL:** \`${currentUrl}\`
- **Active View:** \`${currentView}\`
- **Theme:** ${isDarkMode ? "Dark" : "Light"}

### 🖥️ Environment
- **Timestamp:** ${timestamp}
- **Browser / User Agent:** ${userAgent}
- **Window Size:** ${screenResolution}

### 📜 Console Logs (${totalLogs} captured)
\`\`\`text
${consoleLogs}
\`\`\`
`;
}

export async function copyReportToClipboard(report: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(report);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export function openGitHubIssueWithReport(fullReport: string): void {
  let issueBody = fullReport;
  if (issueBody.length > MAX_URL_BODY_LENGTH) {
    const truncatedNotice = `\n\n> 📋 **Note:** Full diagnostics and complete console logs were copied to your clipboard. Paste them directly into this issue description if needed.\n`;
    issueBody =
      issueBody.substring(0, MAX_URL_BODY_LENGTH - truncatedNotice.length) +
      truncatedNotice;
  }

  const issueTitle = "Bug: [Brief description of the issue]";
  const params = new URLSearchParams({
    title: issueTitle,
    body: issueBody,
  });

  const url = `${GITHUB_REPO_ISSUES_URL}?${params.toString()}`;
  if (typeof window !== "undefined" && typeof window.open === "function") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

export async function triggerBugReport(): Promise<{
  copied: boolean;
}> {
  const report = buildBugReport();
  openGitHubIssueWithReport(report);
  const copied = await copyReportToClipboard(report);
  return { copied };
}
