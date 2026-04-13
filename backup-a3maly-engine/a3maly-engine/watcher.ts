import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const config = require("./config.json");

import { runScanner } from "./scanner";
import { runFixer } from "./fixer";
import { runGenerator } from "./generator";

let isRunning = false;

export function startWatcher() {
  const root = process.cwd();
  const srcPath = path.join(root, config.paths.src);

  console.log("👀 A3MALY ENGINE Watcher is active...");

  fs.watch(
    srcPath,
    { recursive: true },
    async (eventType, filename) => {
      if (!filename) return;
      if (isRunning) return;

      isRunning = true;

      console.log(`🔄 Change detected in: ${filename}`);
      console.log("⚙ Running engine cycle...");

      const scan = await runScanner();
      await runFixer(scan);
      await runGenerator(scan);

      console.log("✅ Engine cycle completed.");

      setTimeout(() => {
        isRunning = false;
      }, 500);
    }
  );
}
