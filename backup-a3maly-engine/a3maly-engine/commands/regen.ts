import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { runRegenerator } from "../regenerator.ts";

const config = require("../config.json");

export async function regenCommand() {
  console.log("🔁 Running A3MALY Regenerator...");

  const result = await runRegenerator(config);

  console.log("📄 Files regenerated:", result.files.length);
  console.log("✨ Regeneration completed.");
}
