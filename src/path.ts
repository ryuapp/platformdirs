import { join } from "node:path";
import { homedir, platform } from "node:os";
import type { DirectoryOptions } from "./types.ts";
import { optionallyCreateDirectory } from "./fs.ts";

/**
 * Expand user home directory in path.
 * Similar to Python's os.path.expanduser()
 *
 * @param path - Path that may contain ~ for home directory
 * @returns Expanded path with home directory
 *
 * @example
 * ```ts
 * expandUser("~/Documents")
 * // Returns: "/home/username/Documents" (Linux)
 * // Returns: "/Users/username/Documents" (macOS)
 * // Returns: "C:\Users\username\Documents" (Windows)
 *
 * expandUser("/absolute/path")
 * // Returns: "/absolute/path" (unchanged)
 * ```
 */
export function expandUser(path: string): string {
  if (path.startsWith("~/")) {
    return join(homedir(), path.slice(2));
  }
  if (path === "~") {
    return homedir();
  }
  return path;
}

interface AppendOptions extends DirectoryOptions {
  /* Optional opinion value to insert (e.g., "Cache", "Logs") */
  opinionValue?: string;
}

/**
 * Append app name and version to a base path.
 *
 * @param basePath - Base directory path
 * @param options - Directory options containing appName, appAuthor, version, optionValue
 * @returns Path with app name and version appended
 *
 * @example
 * ```ts
 * appendAppNameAndVersion("/base/path", { appName: "MyApp", version: "1.0" })
 * // Returns: "/base/path/MyApp/1.0"
 *
 * appendAppNameAndVersion("/base", { appName: "MyApp", appAuthor: "Company" }, "Cache")
 * // Returns: "/base/Company/MyApp/Cache" (Windows-style with author)
 * ```
 */
export function appendAppNameAndVersion(
  basePath: string,
  options: AppendOptions = {},
): string {
  let path = basePath;

  if (options.appName) {
    // App author is only for windows
    if (platform() === "win32" && options.appAuthor) {
      path = join(path, options.appAuthor);
    }
    path = join(path, options.appName);
    if (options.opinionValue) {
      path = join(path, options.opinionValue);
    }
    if (options.version) {
      path = join(path, options.version);
    }
  }

  if (options.ensureExists) {
    optionallyCreateDirectory(path);
  }

  return path;
}
