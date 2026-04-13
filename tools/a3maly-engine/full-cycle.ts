import config from "./config.json" with { type: "json" };
import { runScanner } from "./scanner.ts";
import { runFixer } from "./fixer.ts";
import { runGenerator } from "./generator.ts";
import { runRegenerator } from "./regenerator.ts";
import { runUIIntegrityCheck } from "./ui-integrity/index.ts";
import { runFullDiagnostic } from "./test-suite.ts";
import { report } from "./reporter.ts";

async function main() {
  console.log("?? A3MALY FULL CYCLE — START");

  const scan = await runScanner();
  const fixes = await runFixer(scan);
  const generated = await runGenerator(scan);
  const regenActions = await runRegenerator(scan);

  runUIIntegrityCheck();

  const diagnostic = await runFullDiagnostic();

  report({
    scan,
    fixes,
    generated,
    regenerated: regenActions,
    diagnostic,
  });

  console.log("? A3MALY FULL CYCLE — DONE");
}

main().catch((err) => {
  console.error("? FULL CYCLE FAILED:", err);
});
