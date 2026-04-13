import fs from "fs";
import path from "path";

export function runUIIntegrityCheck() {
  const report: string[] = [];

  // -------------------------------
  // 1) Tailwind Config Check
  // -------------------------------
  try {
    const tailwindPath = path.join(process.cwd(), "tailwind.config.js");
    const tailwindContent = fs.readFileSync(tailwindPath, "utf8");

    if (!tailwindContent.includes("./app/") ||
        !tailwindContent.includes("./components/") ||
        !tailwindContent.includes("./src/")) {
      report.push("❌ Tailwind content paths incomplete");
    } else {
      report.push("✓ Tailwind config valid");
    }
  } catch {
    report.push("❌ tailwind.config.js not found");
  }

  // -------------------------------
  // 2) PostCSS Config Check
  // -------------------------------
  try {
    const postcssPath = path.join(process.cwd(), "postcss.config.cjs");
    const postcssContent = fs.readFileSync(postcssPath, "utf8");

    if (!postcssContent.includes("tailwindcss") ||
        !postcssContent.includes("autoprefixer")) {
      report.push("❌ PostCSS missing required plugins");
    } else {
      report.push("✓ PostCSS config valid");
    }
  } catch {
    report.push("❌ postcss.config.cjs not found");
  }

  // -------------------------------
  // 3) globals.css Check
  // -------------------------------
  try {
    const globalsPath = path.join(process.cwd(), "app/globals.css");
    const globalsContent = fs.readFileSync(globalsPath, "utf8");

    if (!globalsContent.includes("@tailwind base") ||
        !globalsContent.includes("@tailwind components") ||
        !globalsContent.includes("@tailwind utilities")) {
      report.push("❌ globals.css missing Tailwind directives");
    }

    if (globalsContent.includes("body {") && !globalsContent.includes("@layer base")) {
      report.push("⚠ body override missing @layer base (may break Tailwind)");
    } else {
      report.push("✓ globals.css structure valid");
    }
  } catch {
    report.push("❌ globals.css not found");
  }

  // -------------------------------
  // 4) layout.tsx Check
  // -------------------------------
  try {
    const layoutPath = path.join(process.cwd(), "app/layout.tsx");
    const layoutContent = fs.readFileSync(layoutPath, "utf8");

    if (!layoutContent.includes("<html") || !layoutContent.includes("<body")) {
      report.push("❌ layout.tsx missing html/body structure");
    } else {
      report.push("✓ layout.tsx structure valid");
    }
  } catch {
    report.push("❌ layout.tsx not found");
  }

  // -------------------------------
  // 5) menuTree Check
  // -------------------------------
  try {
    const menuPath = path.join(process.cwd(), "src/config/menu/menuTree.ts");
    const menuContent = fs.readFileSync(menuPath, "utf8");

    if (!menuContent.trim().endsWith("];")) {
      report.push("❌ menuTree.ts not properly closed");
    } else {
      report.push("✓ menuTree.ts structure valid");
    }
  } catch {
    report.push("❌ menuTree.ts not found");
  }

  // -------------------------------
  // Final Report
  // -------------------------------
  console.log("\n\n=== A3MALY UI Integrity Report ===\n");
  report.forEach((line) => console.log(line));
  console.log("\n=================================\n");
}
