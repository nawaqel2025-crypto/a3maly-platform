import { runScanner } from "../scanner.ts";
import { runRegenerator } from "../regenerator.ts";

export async function regenCommand() {
  console.log("?? Running A3MALY Regenerator...");

  const scan = await runScanner();
  const actions = await runRegenerator(scan);

  console.log("?? Regenerator actions:", actions.length);
  console.log("? Regeneration completed.");
}
