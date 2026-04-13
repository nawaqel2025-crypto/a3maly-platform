import fs from "fs";
import path from "path";
import { loadAllModulesMetadata } from "./metadata-engine.ts";
import { runGenerator } from "./generator.ts";
import { runRegenerator } from "./regenerator.ts";

export async function runFullDiagnostic() {
  const root = process.cwd();
  const report = {
    timestamp: new Date().toISOString(),
    modules: [],
    summary: {
      totalModules: 0,
      passed: 0,
      failed: 0,
    },
  };

  const metadata = await loadAllModulesMetadata();
  report.summary.totalModules = metadata.length;

  for (const mod of metadata) {
    const moduleReport = runModuleDiagnostics(mod);
    report.modules.push(moduleReport);

    if (moduleReport.status === "passed") report.summary.passed++;
    else report.summary.failed++;
  }

  writeConsoleReport(report);
  writeJsonReport(report, root);
  writeHtmlReport(report, root);

  return report;
}

function runModuleDiagnostics(mod) {
  const errors = [];
  const warnings = [];

  checkStructure(mod, errors);
  checkDomain(mod, errors, warnings);
  checkInfra(mod, errors, warnings);
  checkUI(mod, errors, warnings);
  checkReports(mod, errors, warnings);
  checkNavigation(mod, errors, warnings);

  const status = errors.length === 0 ? "passed" : "failed";

  return {
    module: mod.name,
    status,
    errors,
    warnings,
  };
}

function checkStructure(mod, errors) {
  const required = [
    "config",
    "domain",
    "infra",
    "operations",
    "reports",
    "ui",
  ];

  for (const key of required) {
    if (!mod[key]) errors.push(`Missing section: ${key}`);
  }
}

function checkDomain(mod, errors, warnings) {
  if (!mod.domain.schema || Object.keys(mod.domain.schema).length === 0) {
    errors.push("Domain schema is missing or empty");
  }

  if (!mod.domain.types || mod.domain.types.length === 0) {
    warnings.push("Domain types missing");
  }
}

function checkInfra(mod, errors, warnings) {
  if (!mod.infra.api.handlers.length) {
    warnings.push("No API handlers found");
  }

  if (!mod.infra.repository.length) {
    warnings.push("Repository is empty");
  }
}

function checkUI(mod, errors, warnings) {
  if (!mod.ui.pages.length) {
    errors.push("UI pages missing");
  }

  if (!mod.ui.components.length) {
    warnings.push("UI components missing");
  }
}

function checkReports(mod, errors, warnings) {
  if (!mod.reports.dashboards.length) {
    warnings.push("No dashboards found");
  }
}

function checkNavigation(mod, errors, warnings) {
  if (!mod.config.navigation.length) {
    warnings.push("Navigation missing");
  }
}

function writeConsoleReport(report) {
  console.log("\n=== A3MALY ENGINE — FULL DIAGNOSTIC REPORT ===\n");
  console.log(`Modules: ${report.summary.totalModules}`);
  console.log(`Passed: ${report.summary.passed}`);
  console.log(`Failed: ${report.summary.failed}\n`);

  for (const mod of report.modules) {
    console.log(`Module: ${mod.module}`);
    console.log(`Status: ${mod.status}`);
    if (mod.errors.length) console.log("Errors:", mod.errors);
    if (mod.warnings.length) console.log("Warnings:", mod.warnings);
    console.log("----------------------------------------");
  }
}

function writeJsonReport(report, root) {
  const file = path.join(root, "a3maly-diagnostic.json");
  fs.writeFileSync(file, JSON.stringify(report, null, 2));
}

function writeHtmlReport(report, root) {
  const file = path.join(root, "a3maly-diagnostic.html");

  const html = `
  <html>
  <head>
    <title>A3MALY Diagnostic Report</title>
    <style>
      body { font-family: Arial; padding: 20px; }
      .module { margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; }
      .passed { color: green; }
      .failed { color: red; }
    </style>
  </head>
  <body>
    <h1>A3MALY Diagnostic Report</h1>
    <p>Total Modules: ${report.summary.totalModules}</p>
    <p>Passed: ${report.summary.passed}</p>
    <p>Failed: ${report.summary.failed}</p>

    ${report.modules
      .map(
        (m) => `
      <div class="module">
        <h2>${m.module}</h2>
        <p class="${m.status}">Status: ${m.status}</p>
        <p><strong>Errors:</strong> ${m.errors.join("<br>") || "None"}</p>
        <p><strong>Warnings:</strong> ${m.warnings.join("<br>") || "None"}</p>
      </div>
    `
      )
      .join("")}
  </body>
  </html>
  `;

  fs.writeFileSync(file, html);
}
