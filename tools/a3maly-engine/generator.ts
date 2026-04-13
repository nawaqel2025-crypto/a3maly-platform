import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
import config from "./config.json" with { type: "json" };

// ----------------------------------------------------
// MAIN GENERATOR (MODULE ARCHITECTURE v2)
// ----------------------------------------------------
export async function runGenerator(scan: any) {
  const generated: string[] = [];

  const modules = detectModules(scan.files);

  for (const module of modules) {
    generateModuleV2(module, generated);
  }

  return generated;
}

// ----------------------------------------------------
// MODULE ARCHITECTURE v2 BUILDER
// ----------------------------------------------------
function generateModuleV2(module: string, generated: string[]) {
  const root = process.cwd();
  const base = path.join(root, "src/modules", module);

  const structure = {
    config: path.join(base, "config"),
    setup: path.join(base, "setup"),
    domain: path.join(base, "domain"),
    infra: path.join(base, "infra"),
    infraApi: path.join(base, "infra/api"),
    infraRepo: path.join(base, "infra/repository"),
    operations: path.join(base, "operations"),
    reports: path.join(base, "reports"),
    ui: path.join(base, "ui"),
    uiPages: path.join(base, "ui/pages"),
    uiComponents: path.join(base, "ui/components"),
    uiHooks: path.join(base, "ui/hooks"),
  };

  // Create folders
  for (const key in structure) {
    fs.mkdirSync(structure[key], { recursive: true });
  }

  // CONFIG
  writeIfMissing(path.join(structure.config, "settings.ts"), generateSettings(module), generated);
  writeIfMissing(path.join(structure.config, "permissions.ts"), generatePermissions(module), generated);
  writeIfMissing(path.join(structure.config, "navigation.ts"), generateNavigation(module), generated);

  // SETUP
  writeIfMissing(path.join(structure.setup, "seed.ts"), generateSeed(module), generated);
  writeIfMissing(path.join(structure.setup, "defaults.ts"), generateDefaults(module), generated);

  // DOMAIN
  writeIfMissing(path.join(structure.domain, "types.ts"), generateDomainTypes(module), generated);
  writeIfMissing(path.join(structure.domain, "schema.ts"), generateDomainSchema(module), generated);
  writeIfMissing(path.join(structure.domain, "service.ts"), generateDomainService(module), generated);

  // INFRA
  writeIfMissing(path.join(structure.infraApi, "dto.ts"), generateDto(module), generated);
  writeIfMissing(path.join(structure.infraApi, "handlers.ts"), generateApiHandlers(module), generated);
  writeIfMissing(path.join(structure.infraRepo, "index.ts"), generateRepository(module), generated);

  // OPERATIONS
  writeIfMissing(path.join(structure.operations, "actions.ts"), generateActions(module), generated);
  writeIfMissing(path.join(structure.operations, "workflows.ts"), generateWorkflows(module), generated);
  writeIfMissing(path.join(structure.operations, "automation.ts"), generateAutomation(module), generated);

  // REPORTS
  writeIfMissing(path.join(structure.reports, "queries.ts"), generateQueries(module), generated);
  writeIfMissing(path.join(structure.reports, "metrics.ts"), generateMetrics(module), generated);
  writeIfMissing(path.join(structure.reports, "dashboards.tsx"), generateDashboards(module), generated);

  // UI
  writeIfMissing(path.join(structure.uiPages, "index-page.tsx"), generateIndexPage(module), generated);
  writeIfMissing(path.join(structure.uiPages, "create-page.tsx"), generateCreatePage(module), generated);
  writeIfMissing(path.join(structure.uiPages, "edit-page.tsx"), generateEditPage(module), generated);

  writeIfMissing(path.join(structure.uiComponents, "Table.tsx"), generateTable(module), generated);
  writeIfMissing(path.join(structure.uiComponents, "Form.tsx"), generateForm(module), generated);
  writeIfMissing(path.join(structure.uiComponents, "Filters.tsx"), generateFilters(module), generated);

  writeIfMissing(path.join(structure.uiHooks, `use${capitalize(module)}.ts`), generateHook(module), generated);

  // MODULE CONFIG
  writeIfMissing(path.join(base, "module.config.json"), generateModuleConfig(module), generated);
}

// ----------------------------------------------------
// WRITE HELPERS
// ----------------------------------------------------
function writeIfMissing(file: string, content: string, generated: string[]) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, content);
    generated.push(`Generated: ${file}`);
  }
}

// ----------------------------------------------------
// MODULE DETECTION
// ----------------------------------------------------
function detectModules(files: string[]) {
  const modules = new Set<string>();

  for (const file of files) {
    if (file.includes("src/modules/")) {
      const parts = file.split("src/modules/")[1].split("/");
      const module = parts[0];
      if (module) modules.add(module);
    }
  }

  return Array.from(modules);
}

// ----------------------------------------------------
// CONFIG GENERATORS
// ----------------------------------------------------
function generateSettings(module: string) {
  return `export const ${module}Settings = {
  enabled: true,
  version: 1,
};`;
}

function generatePermissions(module: string) {
  return `export const ${module}Permissions = {
  view: ["admin", "manager"],
  edit: ["admin"],
};`;
}

function generateNavigation(module: string) {
  return `export const ${module}Navigation = [
  { label: "${capitalize(module)}", href: "/${module}" }
];`;
}

// ----------------------------------------------------
// SETUP GENERATORS
// ----------------------------------------------------
function generateSeed(module: string) {
  return `export async function seed${capitalize(module)}() {
  return true;
}`;
}

function generateDefaults(module: string) {
  return `export const ${module}Defaults = {
  active: true,
};`;
}

// ----------------------------------------------------
// DOMAIN GENERATORS
// ----------------------------------------------------
function generateDomainTypes(module: string) {
  return `export interface ${capitalize(module)} {
  id: string;
  name: string;
}`;
}

function generateDomainSchema(module: string) {
  return `export const ${module}Schema = {
  name: "string",
};`;
}

function generateDomainService(module: string) {
  return `export class ${capitalize(module)}Service {
  async validate(data: any) {
    return true;
  }
}`;
}

// ----------------------------------------------------
// INFRA GENERATORS
// ----------------------------------------------------
function generateDto(module: string) {
  return `export interface Create${capitalize(module)}Dto {
  name: string;
}`;
}

function generateApiHandlers(module: string) {
  return `export async function handleGet${capitalize(module)}() {
  return [];
}`;
}

function generateRepository(module: string) {
  return `export class ${capitalize(module)}Repository {
  async findAll() { return []; }
}`;
}

// ----------------------------------------------------
// OPERATIONS GENERATORS
// ----------------------------------------------------
function generateActions(module: string) {
  return `export async function create${capitalize(module)}(data: any) {
  return data;
}`;
}

function generateWorkflows(module: string) {
  return `export async function run${capitalize(module)}Workflow() {
  return true;
}`;
}

function generateAutomation(module: string) {
  return `export async function auto${capitalize(module)}() {
  return true;
}`;
}

// ----------------------------------------------------
// REPORTS GENERATORS
// ----------------------------------------------------
function generateQueries(module: string) {
  return `export async function query${capitalize(module)}() {
  return [];
}`;
}

function generateMetrics(module: string) {
  return `export const ${module}Metrics = {
  total: 0,
};`;
}

function generateDashboards(module: string) {
  return `export default function ${capitalize(module)}Dashboard() {
  return <div>Dashboard for ${module}</div>;
}`;
}

// ----------------------------------------------------
// UI GENERATORS
// ----------------------------------------------------
function generateIndexPage(module: string) {
  return `export default function ${capitalize(module)}IndexPage() {
  return <div>${module} index</div>;
}`;
}

function generateCreatePage(module: string) {
  return `export default function Create${capitalize(module)}Page() {
  return <div>Create ${module}</div>;
}`;
}

function generateEditPage(module: string) {
  return `export default function Edit${capitalize(module)}Page() {
  return <div>Edit ${module}</div>;
}`;
}

function generateTable(module: string) {
  return `export default function ${capitalize(module)}Table() {
  return <div>Table for ${module}</div>;
}`;
}

function generateForm(module: string) {
  return `export default function ${capitalize(module)}Form() {
  return <div>Form for ${module}</div>;
}`;
}

function generateFilters(module: string) {
  return `export default function ${capitalize(module)}Filters() {
  return <div>Filters for ${module}</div>;
}`;
}

function generateHook(module: string) {
  return `export function use${capitalize(module)}() {
  return { items: [] };
}`;
}

// ----------------------------------------------------
// MODULE CONFIG
// ----------------------------------------------------
function generateModuleConfig(module: string) {
  return JSON.stringify(
    {
      name: module,
      version: 2,
      architecture: "A3MALY MODULE ARCHITECTURE v2",
    },
    null,
    2
  );
}

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
