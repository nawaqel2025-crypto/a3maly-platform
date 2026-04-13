import { scanCommand } from "../../commands/scan.ts";
import { fixCommand } from "../../commands/fix.ts";
import { generateCommand } from "../../commands/generate.ts";
import { regenCommand } from "../../commands/regen.ts";
import { doctorCommand } from "../../commands/doctor.ts";
import { helpCommand } from "../../commands/help.ts";

// استيراد UI Integrity Engine
import { runUIIntegrityCheck } from "../../ui-integrity/index.ts";

export function runCommand(args: string[]) {
  const [cmd, ...rest] = args;

  switch (cmd) {
    case "scan":
      return scanCommand(rest);

    case "fix":
      return fixCommand(rest);

    case "generate":
      return generateCommand(rest);

    case "regen":
      return regenCommand(rest);

    case "doctor":
      return doctorCommand(rest);

    // ⭐ دمج أمر ui:check داخل النظام الأساسي
    case "ui:check":
      return runUIIntegrityCheck();

    case "help":
    default:
      return helpCommand(rest);
  }
}
