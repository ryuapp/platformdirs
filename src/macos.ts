import type { DirectoryOptions, MultipathDirectoryOptions } from "./types.ts";
import { appendAppNameAndVersion, expandUser } from "./path.ts";

export function macosUserDataDir(options: DirectoryOptions = {}): string {
  const baseDir = expandUser("~/Library/Application Support");
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function macosUserConfigDir(options: DirectoryOptions = {}): string {
  const baseDir = expandUser("~/Library/Application Support");
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function macosUserCacheDir(options: DirectoryOptions = {}): string {
  const baseDir = expandUser("~/Library/Caches");
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function macosUserLogDir(options: DirectoryOptions = {}): string {
  const baseDir = expandUser("~/Library/Logs");
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function macosUserStateDir(options: DirectoryOptions = {}): string {
  return macosUserDataDir(options);
}

export function macosSiteDataDir(
  options: MultipathDirectoryOptions = {},
): string {
  const baseDir = "/Library/Application Support";
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function macosSiteConfigDir(
  options: MultipathDirectoryOptions = {},
): string {
  // Intentionally not using `~/Library/Preferences` here.
  // See: https://github.com/tox-dev/platformdirs/issues/98
  return macosSiteDataDir(options);
}

export function macosSiteCacheDir(options: DirectoryOptions = {}): string {
  const baseDir = "/Library/Caches";
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function macosUserDocumentsDir(): string {
  return expandUser("~/Documents");
}

export function macosUserDownloadsDir(): string {
  return expandUser("~/Downloads");
}

export function macosUserPicturesDir(): string {
  return expandUser("~/Pictures");
}

export function macosUserVideosDir(): string {
  return expandUser("~/Movies");
}

export function macosUserMusicDir(): string {
  return expandUser("~/Music");
}

export function macosUserDesktopDir(): string {
  return expandUser("~/Desktop");
}

export function macosUserRuntimeDir(options: DirectoryOptions = {}): string {
  const baseDir = expandUser("~/Library/Caches/TemporaryItems");
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function macosSiteRuntimeDir(options: DirectoryOptions = {}): string {
  return macosUserRuntimeDir(options);
}
