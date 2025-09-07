import type {
  DirectoryOptions,
  MultipathDirectoryOptions,
  UserDirectoryOptions,
} from "./types.ts";
import { join } from "node:path";
import { env } from "node:process";
import { appendAppNameAndVersion } from "./path.ts";
import { optionallyCreateDirectory } from "./fs.ts";

export function windowsUserDataDir(options: UserDirectoryOptions = {}): string {
  let baseDir: string;

  if (options.roaming) {
    if (!env.APPDATA) {
      throw new Error("APPDATA environment variable is not set");
    }
    baseDir = env.APPDATA;
  } else {
    if (!env.LOCALAPPDATA) {
      throw new Error("LOCALAPPDATA environment variable is not set");
    }
    baseDir = env.LOCALAPPDATA;
  }

  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function windowsUserConfigDir(options: DirectoryOptions = {}): string {
  return windowsUserDataDir(options);
}

export function windowsUserCacheDir(options: DirectoryOptions = {}): string {
  if (!env.LOCALAPPDATA) {
    throw new Error("LOCALAPPDATA environment variable is not set");
  }
  const path = appendAppNameAndVersion(env.LOCALAPPDATA, {
    ...options,
    opinionValue: "Cache",
  });

  return path;
}

export function windowsUserLogDir(options: DirectoryOptions = {}): string {
  const userDataPath = windowsUserDataDir(options);
  const path = join(userDataPath, "Logs");

  if (options.ensureExists) {
    optionallyCreateDirectory(path);
  }

  return path;
}

export function windowsUserStateDir(options: DirectoryOptions = {}): string {
  return windowsUserDataDir(options);
}

export function windowsSiteDataDir(
  options: MultipathDirectoryOptions = {},
): string {
  if (!env.PROGRAMDATA) {
    throw new Error("PROGRAMDATA environment variable is not set");
  }
  const path = appendAppNameAndVersion(env.PROGRAMDATA, options);

  return path;
}

export function windowsSiteConfigDir(
  options: MultipathDirectoryOptions = {},
): string {
  return windowsSiteDataDir(options);
}

export function windowsSiteCacheDir(options: DirectoryOptions = {}): string {
  if (!env.PROGRAMDATA) {
    throw new Error("PROGRAMDATA environment variable is not set");
  }
  const path = appendAppNameAndVersion(env.PROGRAMDATA, {
    ...options,
    opinionValue: "Cache",
  });

  return path;
}

export function windowsUserDocumentsDir(): string {
  if (!env.USERPROFILE) {
    throw new Error("USERPROFILE environment variable is not set");
  }
  return join(env.USERPROFILE, "Documents");
}

export function windowsUserDownloadsDir(): string {
  if (!env.USERPROFILE) {
    throw new Error("USERPROFILE environment variable is not set");
  }
  return join(env.USERPROFILE, "Downloads");
}

export function windowsUserPicturesDir(): string {
  if (!env.USERPROFILE) {
    throw new Error("USERPROFILE environment variable is not set");
  }
  return join(env.USERPROFILE, "Pictures");
}

export function windowsUserVideosDir(): string {
  if (!env.USERPROFILE) {
    throw new Error("USERPROFILE environment variable is not set");
  }
  return join(env.USERPROFILE, "Videos");
}

export function windowsUserMusicDir(): string {
  if (!env.USERPROFILE) {
    throw new Error("USERPROFILE environment variable is not set");
  }
  return join(env.USERPROFILE, "Music");
}

export function windowsUserDesktopDir(): string {
  if (!env.USERPROFILE) {
    throw new Error("USERPROFILE environment variable is not set");
  }
  return join(env.USERPROFILE, "Desktop");
}

export function windowsUserRuntimeDir(options: DirectoryOptions = {}): string {
  if (!env.LOCALAPPDATA) {
    throw new Error("LOCALAPPDATA environment variable is not set");
  }
  const baseDir = join(env.LOCALAPPDATA, "Temp");
  const path = appendAppNameAndVersion(baseDir, options);

  return path;
}

export function windowsSiteRuntimeDir(options: DirectoryOptions = {}): string {
  return windowsUserRuntimeDir(options);
}
