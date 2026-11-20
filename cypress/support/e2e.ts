import "@cypress/code-coverage/support";

// Support baseURLs with subpaths like https://mrishab.github.io/ai-playground
Cypress.Commands.overwrite("visit", (originalFn: any, url: any, options?: any) => {
  const baseUrl = Cypress.config("baseUrl");
  if (baseUrl) {
    try {
      const parsed = new URL(baseUrl);
      if (parsed.pathname && parsed.pathname !== "/") {
        const subpath = parsed.pathname.endsWith("/") ? parsed.pathname : `${parsed.pathname}/`;
        if (typeof url === "string" && (url === "/" || url === "")) {
          return originalFn(subpath, options);
        }
        if (typeof url === "object" && url && (url.url === "/" || url.url === "")) {
          return originalFn({ ...url, url: subpath }, options);
        }
      }
    } catch {}
  }
  return originalFn(url, options);
});
