import path from "node:path";

export function repoRoot(override?: string): string {
  return override ?? path.resolve(process.cwd(), "../..");
}

export function dataDir(root?: string): string {
  return path.join(repoRoot(root), "data");
}

export function journalDir(root?: string): string {
  return path.join(dataDir(root), "journal");
}

export function derivedDir(root?: string): string {
  return path.join(dataDir(root), "derived");
}

export function journalFilePath(date: string, root?: string): string {
  return path.join(journalDir(root), `${date}.md`);
}

export function indexFilePath(root?: string): string {
  return path.join(dataDir(root), "index.json");
}

export function derivedFeaturesPath(date: string, root?: string): string {
  return path.join(derivedDir(root), `${date}.features.json`);
}
