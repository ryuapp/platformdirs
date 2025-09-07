import { existsSync, mkdirSync } from "node:fs";

/**
 * Optionally create a directory if it doesn't exist (sync)
 */
export function optionallyCreateDirectory(path: string): void {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}
