import { runScanner } from "../../scanner.ts";

export async function generateCommand() {
  console.log("⚙️ Running A3MALY Generator...");

  const scan = await runScanner();

  console.log("📁 Files scanned:", scan.files.length);
  console.log("❌ Broken imports:", scan.brokenImports.length);
  console.log("📄 Missing files:", scan.missingFiles.length);

  console.log("✨ Generation completed.");
}
