import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { initCypressCoverageHarness } from "./cypressHarness";
import { initConsoleLogger } from "./lib/consoleLogger";

initConsoleLogger();
initCypressCoverageHarness();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
