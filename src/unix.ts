import type { DirectoryOptions, MultipathDirectoryOptions } from "./types.ts";
import { delimiter, join } from "node:path";
import { platform, userInfo } from "node:os";
import { env } from "node:process";
import { existsSync } from "node:fs";
import { appendAppNameAndVersion, expandUser } from "./path.ts";

export function unixUserDataDir(options: DirectoryOptions = {}): string {
  const xdgDataHome = env.XDG_DATA_HOME?.trim();
  const baseDir = xdgDataHome || expandUser("~/.local/share");
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function unixUserConfigDir(options: DirectoryOptions = {}): string {
  const xdgConfigHome = env.XDG_CONFIG_HOME?.trim();
  const baseDir = xdgConfigHome || expandUser("~/.config");
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function unixUserCacheDir(options: DirectoryOptions = {}): string {
  const xdgCacheHome = env.XDG_CACHE_HOME?.trim();
  const baseDir = xdgCacheHome || expandUser("~/.cache");
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function unixUserLogDir(options: DirectoryOptions = {}): string {
  const xdgStateHome = env.XDG_STATE_HOME?.trim();
  const stateBaseDir = xdgStateHome || expandUser("~/.local/state");
  const path = appendAppNameAndVersion(stateBaseDir, {
    ...options,
    opinionValue: "log",
  });

  return path;
}

export function unixUserStateDir(options: DirectoryOptions = {}): string {
  const xdgStateHome = env.XDG_STATE_HOME?.trim();
  const baseDir = xdgStateHome || expandUser("~/.local/state");
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function unixSiteDataDir(
  options: MultipathDirectoryOptions = {},
): string | string[] {
  const xdgDataDirs = env.XDG_DATA_DIRS?.trim() ||
    `/usr/local/share${delimiter}/usr/share`;

  if (options.multipath) {
    return xdgDataDirs.split(delimiter).map((dir) =>
      appendAppNameAndVersion(dir, options)
    );
  }

  const baseDir = xdgDataDirs.split(delimiter)[0];
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function unixSiteConfigDir(
  options: MultipathDirectoryOptions = {},
): string | string[] {
  const xdgConfigDirs = env.XDG_CONFIG_DIRS?.trim() || "/etc/xdg";

  if (options.multipath) {
    return xdgConfigDirs.split(delimiter).map((dir) =>
      appendAppNameAndVersion(dir, options)
    );
  }

  const baseDir = xdgConfigDirs.split(delimiter)[0];
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function unixSiteCacheDir(options: DirectoryOptions = {}): string {
  const baseDir = "/var/cache";
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function unixUserDocumentsDir(): string {
  return expandUser("~/Documents");
}

export function unixUserDownloadsDir(): string {
  return expandUser("~/Downloads");
}

export function unixUserPicturesDir(): string {
  return expandUser("~/Pictures");
}

export function unixUserVideosDir(): string {
  return expandUser("~/Videos");
}

export function unixUserMusicDir(): string {
  return expandUser("~/Music");
}

export function unixUserDesktopDir(): string {
  return expandUser("~/Desktop");
}

export function unixUserRuntimeDir(options: DirectoryOptions = {}): string {
  const xdgRuntimeDir = env.XDG_RUNTIME_DIR?.trim();
  if (xdgRuntimeDir) {
    const path = appendAppNameAndVersion(xdgRuntimeDir, options);
    return path;
  }

  const uid = userInfo().uid;
  const platformName = platform();
  let runtimeDir: string;

  // Handle BSD variants (FreeBSD, OpenBSD, NetBSD)
  if (
    platformName === "freebsd" || platformName === "openbsd" ||
    platformName === "netbsd"
  ) {
    const bsdRuntimeDir = join("/var/run/user", uid.toString());
    if (existsSync(bsdRuntimeDir)) {
      runtimeDir = bsdRuntimeDir;
    } else {
      // Fallback to /tmp/runtime-$(id -u) for BSD systems
      runtimeDir = join("/tmp", `runtime-${uid}`);
    }
  } else {
    // Default Linux path
    runtimeDir = join("/run/user", uid.toString());
  }

  const path = appendAppNameAndVersion(runtimeDir, options);

  return path;
}

export function unixSiteRuntimeDir(options: DirectoryOptions = {}): string {
  return unixUserRuntimeDir(options);
}
