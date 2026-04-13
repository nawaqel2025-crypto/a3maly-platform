import { loadAllModulesMetadata, A3malyModuleMeta } from "./metadata-engine";

export interface A3malyNavItem {
  label: string;
  href: string;
  module: string;
  type: "module" | "page" | "report" | "operation";
}

export interface A3malyNavigationTree {
  modules: {
    name: string;
    label: string;
    basePath: string;
    items: A3malyNavItem[];
  }[];
}

export async function buildNavigation(): Promise<A3malyNavigationTree> {
  const metadata = await loadAllModulesMetadata();

  const modules = metadata.map((mod) => {
    const basePath = `/${mod.name}`;

    const items: A3malyNavItem[] = [];

    for (const nav of mod.config.navigation || []) {
      items.push({
        label: nav.label,
        href: nav.href.startsWith("/") ? nav.href : `${basePath}${nav.href}`,
        module: mod.name,
        type: "module",
      });
    }

    for (const page of mod.ui.pages || []) {
      items.push({
        label: normalizeLabel(page),
        href: `${basePath}/${stripExt(page).replace("-page", "")}`,
        module: mod.name,
        type: "page",
      });
    }

    for (const dash of mod.reports.dashboards || []) {
      items.push({
        label: normalizeLabel(dash),
        href: `${basePath}/reports/${stripExt(dash)}`,
        module: mod.name,
        type: "report",
      });
    }

    return {
      name: mod.name,
      label: capitalize(mod.name),
      basePath,
      items,
    };
  });

  return { modules };
}

function stripExt(file: string) {
  return file.replace(/\.(tsx|ts)$/, "");
}

function normalizeLabel(file: string) {
  const base = stripExt(file)
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/page$/i, "")
    .trim();
  return capitalizeWords(base || "Page");
}

function capitalizeWords(str: string) {
  return str
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
