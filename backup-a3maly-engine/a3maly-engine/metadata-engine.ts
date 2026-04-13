import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export interface A3malyModuleMeta {
  name: string;
  version: number;
  architecture: string;

  config: {
    settings: Record<string, any>;
    permissions: Record<string, string[]>;
    navigation: { label: string; href: string }[];
  };

  domain: {
    schema: Record<string, string>;
    types: string[];
  };

  infra: {
    api: {
      dto: Record<string, any>;
      handlers: string[];
    };
    repository: string[];
  };

  operations: {
    actions: string[];
    workflows: string[];
    automation: string[];
  };

  reports: {
    queries: string[];
    metrics: string[];
    dashboards: string[];
  };

  ui: {
    pages: string[];
    components: string[];
    hooks: string[];
  };
}

export async function loadAllModulesMetadata(): Promise<A3malyModuleMeta[]> {
  const root = process.cwd();
  const modulesRoot = path.join(root, "src/modules");

  if (!fs.existsSync(modulesRoot)) return [];

  const modules = fs
    .readdirSync(modulesRoot)
    .filter((m) => fs.statSync(path.join(modulesRoot, m)).isDirectory());

  const metadata: A3malyModuleMeta[] = [];

  for (const module of modules) {
    const base = path.join(modulesRoot, module);

    const configPath = path.join(base, "module.config.json");
    const config = fs.existsSync(configPath)
      ? JSON.parse(fs.readFileSync(configPath, "utf8"))
      : { name: module, version: 1, architecture: "unknown" };

    const meta: A3malyModuleMeta = {
      name: module,
      version: config.version ?? 1,
      architecture: config.architecture ?? "unknown",

      config: {
        settings: safeImport(path.join(base, "config/settings.ts")),
        permissions: safeImport(path.join(base, "config/permissions.ts")),
        navigation: safeImport(path.join(base, "config/navigation.ts")),
      },

      domain: {
        schema: safeImport(path.join(base, "domain/schema.ts")),
        types: listFiles(path.join(base, "domain")),
      },

      infra: {
        api: {
          dto: safeImport(path.join(base, "infra/api/dto.ts")),
          handlers: listFiles(path.join(base, "infra/api")),
        },
        repository: listFiles(path.join(base, "infra/repository")),
      },

      operations: {
        actions: listFiles(path.join(base, "operations")),
        workflows: listFiles(path.join(base, "operations")),
        automation: listFiles(path.join(base, "operations")),
      },

      reports: {
        queries: listFiles(path.join(base, "reports")),
        metrics: listFiles(path.join(base, "reports")),
        dashboards: listFiles(path.join(base, "reports")),
      },

      ui: {
        pages: listFiles(path.join(base, "ui/pages")),
        components: listFiles(path.join(base, "ui/components")),
        hooks: listFiles(path.join(base, "ui/hooks")),
      },
    };

    metadata.push(meta);
  }

  return metadata;
}

function safeImport(file: string): any {
  if (!fs.existsSync(file)) return {};
  try {
    return require(file);
  } catch {
    return {};
  }
}

function listFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));
}
