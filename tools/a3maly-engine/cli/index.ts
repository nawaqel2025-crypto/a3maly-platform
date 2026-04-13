#!/usr/bin/env node

import { runCommand } from "./utils/runner.ts";
import { runUIIntegrityCheck } from "../ui-integrity/index.ts";

const args = process.argv.slice(2);

// إضافة أمر ui:check إلى نظام الأوامر
if (args[0] === "ui:check") {
  runUIIntegrityCheck();
  process.exit(0);
}

// تشغيل النظام الأساسي للأوامر
runCommand(args);
