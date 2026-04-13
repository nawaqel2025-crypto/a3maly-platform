import { runScanner } from "../../scanner.ts";

export async function doctorCommand() {
  console.log("🩺 Running A3MALY Doctor...");

  const scan = await runScanner();

  console.log("📊 Project Health Report:");
  console.log("📁 Files:", scan.files.length);
  console.log("❌ Broken imports:", scan.brokenImports.length);
  console.log("📄 Missing files:", scan.missingFiles.length);

  console.log("🟢 Status: Doctor check completed.");
}
