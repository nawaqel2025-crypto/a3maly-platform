import fs from "fs";
import path from "path";
import ts from "typescript";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const config = require("./a3maly-engine/config.json");

export async function runScanner() {
  const root = process.cwd();
  const srcPath = path.join(root, config.paths.src);

  const allFiles: string[] = [];
  const brokenImports: string[] = [];
  const missingFiles: string[] = [];
  const conflicts: string[] = [];
  const unusedFiles: string[] = [];
  const nextErrors: string[] = [];
  const supabaseErrors: string[] = [];
  const tsErrors: string[] = [];

  function walk(dir: string) {
    const list = fs.readdirSync(dir);

    for (const file of list) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walk(filePath);
      } else {
        allFiles.push(filePath);
      }
    }
  }

  walk(srcPath);

  for (const file of allFiles) {
    if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;

    const content = fs.readFileSync(file, "utf8");
    const source = ts.createSourceFile(file, content, ts.ScriptTarget.Latest, true);

    ts.forEachChild(source, (node) => {
      if (ts.isImportDeclaration(node)) {
        const importPath = (node.moduleSpecifier as ts.StringLiteral).text;

        if (!importPath.startsWith(".") && !importPath.startsWith("@")) return;

        const resolved = resolveImport(file, importPath);

        if (!resolved.exists) {
          brokenImports.push(`${file} → ${importPath}`);
          missingFiles.push(importPath);
        }
      }

      if (file.includes("/app/")) {
        if (path.basename(file) === "page.tsx") {
          if (!content.includes("export default")) {
            nextErrors.push(`Missing default export in page: ${file}`);
          }
        }
      }

      if (content.includes("createClient(") && !content.includes("supabase")) {
        supabaseErrors.push(`Suspicious Supabase usage in: ${file}`);
      }

      if (content.includes("any")) {
        tsErrors.push(`Usage of 'any' detected in: ${file}`);
      }
    });
  }

  const usedFiles = new Set<string>();

  for (const file of allFiles) {
    const content = fs.readFileSync(file, "utf8");

    for (const other of allFiles) {
      if (file === other) continue;
      if (content.includes(path.basename(other).replace(/\.(ts|tsx)$/, ""))) {
        usedFiles.add(other);
      }
    }
  }

  for (const file of allFiles) {
    if (!usedFiles.has(file)) {
      unusedFiles.push(file);
    }
  }

  const fileNames = allFiles.map((f) => path.basename(f));
  const duplicates = fileNames.filter((f, i) => fileNames.indexOf(f) !== i);

  for (const dup of duplicates) {
    conflicts.push(dup);
  }

  return {
    files: allFiles,
    brokenImports,
    missingFiles,
    conflicts,
    unusedFiles,
    nextErrors,
    supabaseErrors,
    tsErrors
  };
}

function resolveImport(currentFile: string, importPath: string) {
  const baseDir = path.dirname(currentFile);
  const fullPath = path.resolve(baseDir, importPath);

  const possible = [
    fullPath,
    fullPath + ".ts",
    fullPath + ".tsx",
    fullPath + "/index.ts",
    fullPath + "/index.tsx",
  ];

  for (const p of possible) {
    if (fs.existsSync(p)) {
      return { exists: true, path: p };
    }
  }

  return { exists: false };
}
