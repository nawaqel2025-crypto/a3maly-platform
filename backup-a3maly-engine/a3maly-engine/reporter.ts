export function report(data: any) {
  console.log("\n📊 A3MALY ENGINE REPORT");
  console.log("----------------------------------");

  console.log(`📁 Scanned files: ${data.scan.files.length}`);

  if (data.scan.brokenImports.length > 0) {
    console.log(`❌ Broken imports: ${data.scan.brokenImports.length}`);
  }

  if (data.scan.missingFiles.length > 0) {
    console.log(`📄 Missing files: ${data.scan.missingFiles.length}`);
  }

  if (data.scan.conflicts.length > 0) {
    console.log(`⚠ Conflicts: ${data.scan.conflicts.length}`);
  }

  if (data.scan.unusedFiles.length > 0) {
    console.log(`🗑 Unused files: ${data.scan.unusedFiles.length}`);
  }

  console.log("\n🔧 Fixes applied:");
  console.log(data.fixes);

  console.log("\n🛠 Generated:");
  console.log(data.generated);

  if (data.regenerated) {
    console.log("\n♻ Full Regeneration:");
    console.log(data.regenerated);
  }

  console.log("----------------------------------\n");
}
