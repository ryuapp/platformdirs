/**
 * @file Platform-specific directory paths library for TypeScript
 * @module platformdirs
 *
 * A TypeScript implementation of Python's platformdirs library.
 * Provides platform-appropriate directories for application data, config, cache, etc.
 *
 * @example
 * ```ts
 * import { userDataDir, userConfigDir } from "@ryu/platformdirs";
 *
 * const dataPath = userDataDir({ appName: "MyApp", appAuthor: "MyCompany" });
 * const configPath = userConfigDir({ appName: "MyApp", ensureExists: true });
 * ```
 */

import type {
  DirectoryOptions,
  MultipathDirectoryOptions,
  UserDirectoryOptions,
} from "./types.ts";
import {
  windowsSiteCacheDir,
  windowsSiteConfigDir,
  windowsSiteDataDir,
  windowsSiteRuntimeDir,
  windowsUserCacheDir,
  windowsUserConfigDir,
  windowsUserDataDir,
  windowsUserDesktopDir,
  windowsUserDocumentsDir,
  windowsUserDownloadsDir,
  windowsUserLogDir,
  windowsUserMusicDir,
  windowsUserPicturesDir,
  windowsUserRuntimeDir,
  windowsUserStateDir,
  windowsUserVideosDir,
} from "./windows.ts";
import {
  macosSiteCacheDir,
  macosSiteConfigDir,
  macosSiteDataDir,
  macosSiteRuntimeDir,
  macosUserCacheDir,
  macosUserConfigDir,
  macosUserDataDir,
  macosUserDesktopDir,
  macosUserDocumentsDir,
  macosUserDownloadsDir,
  macosUserLogDir,
  macosUserMusicDir,
  macosUserPicturesDir,
  macosUserRuntimeDir,
  macosUserStateDir,
  macosUserVideosDir,
} from "./macos.ts";
import {
  unixSiteCacheDir,
  unixSiteConfigDir,
  unixSiteDataDir,
  unixSiteRuntimeDir,
  unixUserCacheDir,
  unixUserConfigDir,
  unixUserDataDir,
  unixUserDesktopDir,
  unixUserDocumentsDir,
  unixUserDownloadsDir,
  unixUserLogDir,
  unixUserMusicDir,
  unixUserPicturesDir,
  unixUserRuntimeDir,
  unixUserStateDir,
  unixUserVideosDir,
} from "./unix.ts";
import { platform } from "node:os";

// Export types
export type {
  DirectoryOptions,
  MultipathDirectoryOptions,
  UserDirectoryOptions,
} from "./types.ts";

/**
 * Return full path to the user-specific data directory.
 *
 * @param options - Directory options
 * @returns Path to user data directory
 *
 * @example
 * ```ts
 * userDataDir({ appName: "MyApp", appAuthor: "MyCompany" })
 * // Windows: C:\Users\Username\AppData\Local\MyCompany\MyApp
 * // macOS: ~/Library/Application Support/MyApp
 * // Linux: ~/.local/share/MyApp
 * ```
 */
export function userDataDir(options?: UserDirectoryOptions): string {
  switch (platform()) {
    case "win32":
      return windowsUserDataDir(options);
    case "darwin":
      return macosUserDataDir(options);
    default:
      return unixUserDataDir(options);
  }
}

/**
 * Return full path to the user-specific config directory.
 *
 * @param options - Directory options
 * @returns Path to user config directory
 *
 * @example
 * ```ts
 * userConfigDir({ appName: "MyApp", roaming: true })
 * // Windows: C:\Users\Username\AppData\Roaming\MyApp
 * // macOS: ~/Library/Preferences/MyApp
 * // Linux: ~/.config/MyApp
 * ```
 */
export function userConfigDir(options?: DirectoryOptions): string {
  switch (platform()) {
    case "win32":
      return windowsUserConfigDir(options);
    case "darwin":
      return macosUserConfigDir(options);
    default:
      return unixUserConfigDir(options);
  }
}

/**
 * Return full path to the user-specific cache directory.
 *
 * @param options - Directory options
 * @returns Path to user cache directory
 *
 * @example
 * ```ts
 * userCacheDir({ appName: "MyApp" })
 * // Windows: C:\Users\Username\AppData\Local\cache\MyApp
 * // macOS: ~/Library/Caches/MyApp
 * // Linux: ~/.cache/MyApp
 * ```
 */
export function userCacheDir(options?: DirectoryOptions): string {
  switch (platform()) {
    case "win32":
      return windowsUserCacheDir(options);
    case "darwin":
      return macosUserCacheDir(options);
    default:
      return unixUserCacheDir(options);
  }
}

/**
 * Return full path to the user-specific log directory.
 *
 * @param options - Directory options
 * @returns Path to user log directory
 *
 * @example
 * ```ts
 * userLogDir({ appName: "MyApp" })
 * // Windows: C:\Users\Username\AppData\Local\logs\MyApp
 * // macOS: ~/Library/Logs/MyApp
 * // Linux: ~/.local/state/log/MyApp
 * ```
 */
export function userLogDir(options?: DirectoryOptions): string {
  switch (platform()) {
    case "win32":
      return windowsUserLogDir(options);
    case "darwin":
      return macosUserLogDir(options);
    default:
      return unixUserLogDir(options);
  }
}

/**
 * Return full path to the site-specific data directory.
 *
 * @param options - Directory options
 * @returns Path to site data directory, or array of paths if multipath is true
 *
 * @example
 * ```ts
 * siteDataDir({ appName: "MyApp" })
 * // Windows: C:\ProgramData\MyApp
 * // macOS: /Library/Application Support/MyApp
 * // Linux: /usr/local/share/MyApp
 *
 * siteDataDir({ appName: "MyApp", multipath: true })
 * // Linux: ["/usr/local/share/MyApp", "/usr/share/MyApp"]
 * ```
 */
export function siteDataDir(
  options: MultipathDirectoryOptions & { multipath: true },
): string[];
export function siteDataDir(options?: MultipathDirectoryOptions): string;
export function siteDataDir(
  options?: MultipathDirectoryOptions,
): string | string[] {
  switch (platform()) {
    case "win32":
      return windowsSiteDataDir(options);
    case "darwin":
      return macosSiteDataDir(options);
    default:
      return unixSiteDataDir(options);
  }
}

/**
 * Return full path to the site-specific config directory.
 *
 * @param options - Directory options
 * @returns Path to site config directory, or array of paths if multipath is true
 *
 * @example
 * ```ts
 * siteConfigDir({ appName: "MyApp" })
 * // Windows: C:\ProgramData\MyApp
 * // macOS: /Library/Application Support/MyApp
 * // Linux: /etc/xdg/MyApp
 *
 * siteConfigDir({ appName: "MyApp", multipath: true })
 * // Linux: ["/etc/xdg/MyApp", "/usr/local/etc/xdg/MyApp"]
 * ```
 */
export function siteConfigDir(
  options: MultipathDirectoryOptions & { multipath: true },
): string[];
export function siteConfigDir(options?: MultipathDirectoryOptions): string;
export function siteConfigDir(
  options?: MultipathDirectoryOptions,
): string | string[] {
  switch (platform()) {
    case "win32":
      return windowsSiteConfigDir(options);
    case "darwin":
      return macosSiteConfigDir(options);
    default:
      return unixSiteConfigDir(options);
  }
}

/**
 * Return full path to the site-specific cache directory.
 *
 * @param options - Directory options
 * @returns Path to site cache directory
 *
 * @example
 * ```ts
 * siteCacheDir({ appName: "MyApp" })
 * // Windows: C:\ProgramData\cache\MyApp
 * // macOS: /Library/Caches/MyApp
 * // Linux: /var/cache/MyApp
 * ```
 */
export function siteCacheDir(options?: DirectoryOptions): string {
  switch (platform()) {
    case "win32":
      return windowsSiteCacheDir(options);
    case "darwin":
      return macosSiteCacheDir(options);
    default:
      return unixSiteCacheDir(options);
  }
}

/**
 * Return full path to the user documents directory.
 *
 * @returns Path to user documents directory
 *
 * @example
 * ```ts
 * userDocumentsDir()
 * // Windows: C:\Users\Username\Documents
 * // macOS: ~/Documents
 * // Linux: ~/Documents
 * ```
 */
export function userDocumentsDir(): string {
  switch (platform()) {
    case "win32":
      return windowsUserDocumentsDir();
    case "darwin":
      return macosUserDocumentsDir();
    default:
      return unixUserDocumentsDir();
  }
}

/**
 * Return full path to the user downloads directory.
 *
 * @returns Path to user downloads directory
 *
 * @example
 * ```ts
 * userDownloadsDir()
 * // Windows: C:\Users\Username\Downloads
 * // macOS: ~/Downloads
 * // Linux: ~/Downloads
 * ```
 */
export function userDownloadsDir(): string {
  switch (platform()) {
    case "win32":
      return windowsUserDownloadsDir();
    case "darwin":
      return macosUserDownloadsDir();
    default:
      return unixUserDownloadsDir();
  }
}

/**
 * Return full path to the user pictures directory.
 *
 * @returns Path to user pictures directory
 *
 * @example
 * ```ts
 * userPicturesDir()
 * // Windows: C:\Users\Username\Pictures
 * // macOS: ~/Pictures
 * // Linux: ~/Pictures
 * ```
 */
export function userPicturesDir(): string {
  switch (platform()) {
    case "win32":
      return windowsUserPicturesDir();
    case "darwin":
      return macosUserPicturesDir();
    default:
      return unixUserPicturesDir();
  }
}

/**
 * Return full path to the user videos directory.
 *
 * @returns Path to user videos directory
 *
 * @example
 * ```ts
 * userVideosDir()
 * // Windows: C:\Users\Username\Videos
 * // macOS: ~/Movies
 * // Linux: ~/Videos
 * ```
 */
export function userVideosDir(): string {
  switch (platform()) {
    case "win32":
      return windowsUserVideosDir();
    case "darwin":
      return macosUserVideosDir();
    default:
      return unixUserVideosDir();
  }
}

/**
 * Return full path to the user music directory.
 *
 * @returns Path to user music directory
 *
 * @example
 * ```ts
 * userMusicDir()
 * // Windows: C:\Users\Username\Music
 * // macOS: ~/Music
 * // Linux: ~/Music
 * ```
 */
export function userMusicDir(): string {
  switch (platform()) {
    case "win32":
      return windowsUserMusicDir();
    case "darwin":
      return macosUserMusicDir();
    default:
      return unixUserMusicDir();
  }
}

/**
 * Return full path to the user desktop directory.
 *
 * @returns Path to user desktop directory
 *
 * @example
 * ```ts
 * userDesktopDir()
 * // Windows: C:\Users\Username\Desktop
 * // macOS: ~/Desktop
 * // Linux: ~/Desktop
 * ```
 */
export function userDesktopDir(): string {
  switch (platform()) {
    case "win32":
      return windowsUserDesktopDir();
    case "darwin":
      return macosUserDesktopDir();
    default:
      return unixUserDesktopDir();
  }
}

/**
 * Return full path to the user runtime directory.
 *
 * @param options - Directory options
 * @returns Path to user runtime directory
 *
 * @example
 * ```ts
 * userRuntimeDir({ appName: "MyApp" })
 * // Windows: C:\Users\Username\AppData\Local\Temp\MyApp
 * // macOS: ~/Library/Application Support/MyApp
 * // Linux: /run/user/1000/MyApp or /tmp/user-1000/MyApp
 * ```
 */
export function userRuntimeDir(options?: DirectoryOptions): string {
  switch (platform()) {
    case "win32":
      return windowsUserRuntimeDir(options);
    case "darwin":
      return macosUserRuntimeDir(options);
    default:
      return unixUserRuntimeDir(options);
  }
}

/**
 * Return full path to the user-specific state directory.
 *
 * @param options - Directory options
 * @returns Path to user state directory
 *
 * @example
 * ```ts
 * userStateDir({ appName: "MyApp" })
 * // Windows: C:\Users\Username\AppData\Local\MyApp (same as userDataDir)
 * // macOS: ~/Library/Application Support/MyApp (same as userDataDir)
 * // Linux: ~/.local/state/MyApp
 * ```
 */
export function userStateDir(options?: DirectoryOptions): string {
  switch (platform()) {
    case "win32":
      return windowsUserStateDir(options);
    case "darwin":
      return macosUserStateDir(options);
    default:
      return unixUserStateDir(options);
  }
}

/**
 * Return full path to the site runtime directory.
 *
 * @param options - Directory options
 * @returns Path to site runtime directory
 *
 * @example
 * ```ts
 * siteRuntimeDir({ appName: "MyApp" })
 * // Same as userRuntimeDir on all platforms
 * ```
 */
export function siteRuntimeDir(options?: DirectoryOptions): string {
  switch (platform()) {
    case "win32":
      return windowsSiteRuntimeDir(options);
    case "darwin":
      return macosSiteRuntimeDir(options);
    default:
      return unixSiteRuntimeDir(options);
  }
}
