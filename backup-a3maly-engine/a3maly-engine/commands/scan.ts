import { runScanner } from "../../scanner.ts";

export async function scanCommand() {
  console.log("🔮 Running A3MALY Scanner...");

  const scan = await runScanner();

  console.log("📁 Files scanned:", scan.files.length);
  console.log("❌ Broken imports:", scan.brokenImports.length);
  console.log("📄 Missing files:", scan.missingFiles.length);

  console.log("✅ Scan completed.");
}
