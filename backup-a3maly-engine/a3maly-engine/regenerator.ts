import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const config = require("./config.json");

export async function runRegenerator(scan: any) {
  const actions: string[] = [];

  const root = process.cwd();
  const src = path.join(root, config.paths.src);
  const app = path.join(root, config.paths.app);
  const api = path.join(root, config.paths.api);
  const components = path.join(root, config.paths.components);
  const lib = path.join(root, config.paths.lib);
  const modulesRoot = path.join(root, "src/modules");

  ensureDir(src, actions, "src");
  ensureDir(app, actions, "app");
  ensureDir(api, actions, "api");
  ensureDir(components, actions, "components");
  ensureDir(lib, actions, "lib");
  ensureDir(modulesRoot, actions, "modules");

  const modules = detectModulesFromScan(scan.files, modulesRoot);

  for (const module of modules) {
    regenModuleSmart(modulesRoot, module, actions);
  }

  rebuildAppShell(app, actions);
  rebuildApiHealth(api, actions);
  cleanupTempFiles(src, actions);

  return actions;
}

function ensureDir(dir: string, actions: string[], label: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    actions.push(`Created directory: ${label}`);
  }
}

function detectModulesFromScan(files: string[], modulesRoot: string) {
  const modules = new Set<string>();

  for (const file of files) {
    if (file.includes("src/modules/")) {
      const parts = file.split("src/modules/")[1].split("/");
      const module = parts[0];
      if (module) modules.add(module);
    }
  }

  if (fs.existsSync(modulesRoot)) {
    for (const entry of fs.readdirSync(modulesRoot)) {
      const full = path.join(modulesRoot, entry);
      if (fs.statSync(full).isDirectory()) {
        modules.add(entry);
      }
    }
  }

  return Array.from(modules);
}

function regenModuleSmart(modulesRoot: string, module: string, actions: string[]) {
  const base = path.join(modulesRoot, module);

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

  for (const key in structure) {
    if (!fs.existsSync(structure[key])) {
      fs.mkdirSync(structure[key], { recursive: true });
      actions.push(`Created missing directory for module '${module}': ${key}`);
    }
  }

  smartFile(structure.config, "settings.ts", generateSettings(module), actions);
  smartFile(structure.config, "permissions.ts", generatePermissions(module), actions);
  smartFile(structure.config, "navigation.ts", generateNavigation(module), actions);

  smartFile(structure.setup, "seed.ts", generateSeed(module), actions);
  smartFile(structure.setup, "defaults.ts", generateDefaults(module), actions);

  smartFile(structure.domain, "types.ts", generateDomainTypes(module), actions);
  smartFile(structure.domain, "schema.ts", generateDomainSchema(module), actions);
  smartFile(structure.domain, "service.ts", generateDomainService(module), actions);

  smartFile(structure.infraApi, "dto.ts", generateDto(module), actions);
  smartFile(structure.infraApi, "handlers.ts", generateApiHandlers(module), actions);
  smartFile(structure.infraRepo, "index.ts", generateRepository(module), actions);

  smartFile(structure.operations, "actions.ts", generateActions(module), actions);
  smartFile(structure.operations, "workflows.ts", generateWorkflows(module), actions);
  smartFile(structure.operations, "automation.ts", generateAutomation(module), actions);

  smartFile(structure.reports, "queries.ts", generateQueries(module), actions);
  smartFile(structure.reports, "metrics.ts", generateMetrics(module), actions);
  smartFile(structure.reports, "dashboards.tsx", generateDashboards(module), actions);

  smartFile(structure.uiPages, "index-page.tsx", generateIndexPage(module), actions);
  smartFile(structure.uiPages, "create-page.tsx", generateCreatePage(module), actions);
  smartFile(structure.uiPages, "edit-page.tsx", generateEditPage(module), actions);

  smartFile(structure.uiComponents, "Table.tsx", generateTable(module), actions);
  smartFile(structure.uiComponents, "Form.tsx", generateForm(module), actions);
  smartFile(structure.uiComponents, "Filters.tsx", generateFilters(module), actions);

  smartFile(structure.uiHooks, `use${capitalize(module)}.ts`, generateHook(module), actions);

  const moduleConfigPath = path.join(base, "module.config.json");
  if (!fs.existsSync(moduleConfigPath)) {
    fs.writeFileSync(moduleConfigPath, generateModuleConfig(module));
    actions.push(`Created module.config.json for module '${module}'`);
  } else {
    try {
      const current = JSON.parse(fs.readFileSync(moduleConfigPath, "utf8"));
      if (!current.architecture || current.architecture !== "A3MALY MODULE ARCHITECTURE v2") {
        const merged = {
          ...current,
          architecture: "A3MALY MODULE ARCHITECTURE v2",
          version: current.version ?? 2,
        };
        fs.writeFileSync(moduleConfigPath, JSON.stringify(merged, null, 2));
        actions.push(`Updated module.config.json for module '${module}' to v2 architecture`);
      }
    } catch {
      fs.writeFileSync(moduleConfigPath, generateModuleConfig(module));
      actions.push(`Repaired invalid module.config.json for module '${module}'`);
    }
  }
}

function smartFile(dir: string, fileName: string, template: string, actions: string[]) {
  const full = path.join(dir, fileName);

  if (!fs.existsSync(full)) {
    fs.writeFileSync(full, template);
    actions.push(`Created missing file: ${full}`);
    return;
  }

  const content = fs.readFileSync(full, "utf8");
  if (!content.includes("Auto-generated by A3MALY") && content.trim().length > 0) {
    return;
  }

  fs.writeFileSync(full, template);
  actions.push(`Refreshed auto-generated file: ${full}`);
}

function rebuildAppShell(app: string, actions: string[]) {
  const layout = path.join(app, "layout.tsx");
  const page = path.join(app, "page.tsx");

  if (!fs.existsSync(layout)) {
    fs.writeFileSync(
      layout,
      `// Auto-generated by A3MALY ENGINE

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
`
    );
    actions.push("Rebuilt app/layout.tsx");
  }

  if (!fs.existsSync(page)) {
    fs.writeFileSync(
      page,
      `// Auto-generated by A3MALY ENGINE

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">منصة أعمالي</h1>
      <p className="text-gray-600 mt-2">تم إنشاء هذه الصفحة تلقائيًا بواسطة A3MALY ENGINE.</p>
    </div>
  );
}
`
    );
    actions.push("Rebuilt app/page.tsx");
  }
}

function rebuildApiHealth(api: string, actions: string[]) {
  const health = path.join(api, "health");
  const route = path.join(health, "route.ts");

  fs.mkdirSync(health, { recursive: true });

  if (!fs.existsSync(route)) {
    fs.writeFileSync(
      route,
      `// Auto-generated by A3MALY ENGINE

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok", engine: "A3MALY" });
}
`
    );
    actions.push("Rebuilt api/health/route.ts");
  }
}

function cleanupTempFiles(src: string, actions: string[]) {
  const walk = (dir: string) => {
    for (const file of fs.readdirSync(dir)) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) walk(filePath);
      else if (file.endsWith(".tmp") || file.endsWith(".bak")) {
        fs.unlinkSync(filePath);
        actions.push(`Removed temp file: ${filePath}`);
      }
    }
  };

  if (fs.existsSync(src)) walk(src);
}

function generateSettings(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export const ${module}Settings = {
  enabled: true,
  version: 1,
};
`;
}

function generatePermissions(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export const ${module}Permissions = {
  view: ["admin", "manager"],
  edit: ["admin"],
};
`;
}

function generateNavigation(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export const ${module}Navigation = [
  { label: "${capitalize(module)}", href: "/${module}" }
];
`;
}

function generateSeed(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export async function seed${capitalize(module)}() {
  return true;
}
`;
}

function generateDefaults(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export const ${module}Defaults = {
  active: true,
};
`;
}

function generateDomainTypes(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export interface ${capitalize(module)} {
  id: string;
  name: string;
  created_at?: string;
}
`;
}

function generateDomainSchema(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export const ${module}Schema = {
  name: "string",
};
`;
}

function generateDomainService(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export class ${capitalize(module)}Service {
  async validate(data: any) {
    return true;
  }
}
`;
}

function generateDto(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export interface Create${capitalize(module)}Dto {
  name: string;
}

export interface Update${capitalize(module)}Dto {
  name?: string;
}
`;
}

function generateApiHandlers(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export async function handleGet${capitalize(module)}() {
  return [];
}

export async function handleCreate${capitalize(module)}(data: any) {
  return data;
}
`;
}

function generateRepository(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export class ${capitalize(module)}Repository {
  async findAll() { return []; }
  async findById(id: string) { return null; }
  async create(data: any) { return data; }
  async update(id: string, data: any) { return data; }
  async delete(id: string) { return true; }
}
`;
}

function generateActions(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export async function create${capitalize(module)}(data: any) {
  return data;
}

export async function update${capitalize(module)}(id: string, data: any) {
  return data;
}

export async function delete${capitalize(module)}(id: string) {
  return true;
}
`;
}

function generateWorkflows(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export async function run${capitalize(module)}Workflow() {
  return true;
}
`;
}

function generateAutomation(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export async function auto${capitalize(module)}() {
  return true;
}
`;
}

function generateQueries(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export async function query${capitalize(module)}() {
  return [];
}
`;
}

function generateMetrics(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export const ${module}Metrics = {
  total: 0,
};
`;
}

function generateDashboards(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export default function ${capitalize(module)}Dashboard() {
  return <div>Dashboard for ${module}</div>;
}
`;
}

function generateIndexPage(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export default function ${capitalize(module)}IndexPage() {
  return <div>${module} index</div>;
}
`;
}

function generateCreatePage(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export default function Create${capitalize(module)}Page() {
  return <div>Create ${module}</div>;
}
`;
}

function generateEditPage(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export default function Edit${capitalize(module)}Page() {
  return <div>Edit ${module}</div>;
}
`;
}

function generateTable(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export default function ${capitalize(module)}Table() {
  return <div>Table for ${module}</div>;
}
`;
}

function generateForm(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export default function ${capitalize(module)}Form() {
  return <div>Form for ${module}</div>;
}
`;
}

function generateFilters(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export default function ${capitalize(module)}Filters() {
  return <div>Filters for ${module}</div>;
}
`;
}

function generateHook(module: string) {
  return `// Auto-generated by A3MALY ENGINE

export function use${capitalize(module)}() {
  return {
    items: [],
    loading: false,
  };
}
`;
}

function generateModuleConfig(module: string) {
  return JSON.stringify(
    {
      name: module,
      version: 2,
      architecture: "A3MALY MODULE ARCHITECTURE v2",
      generatedBy: "A3MALY ENGINE",
    },
    null,
    2
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
