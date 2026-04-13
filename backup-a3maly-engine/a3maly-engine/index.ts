import { runScanner } from "./scanner";
import { runFixer } from "./fixer";
import { runGenerator } from "./generator";
import { runRegenerator } from "./regenerator";
import { startWatcher } from "./watcher";
import { report } from "./reporter";
import config from "./config.json";

async function main() {
  console.log("🚀 A3MALY ENGINE — Starting...");

  const scan = await runScanner();
  const fixes = await runFixer(scan);
  const generated = await runGenerator(scan);
  const regenerated = config.fullRegen ? await runRegenerator() : null;

  report({
    scan,
    fixes,
    generated,
    regenerated,
  });

  if (config.watchMode) {
    console.log("👀 Watch mode enabled...");
    startWatcher();
  }
}

main().catch((err) => {
  console.error("❌ Engine crashed:", err);
});
