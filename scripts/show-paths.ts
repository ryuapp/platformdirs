/**
 * CLI tool to test all platformdirs functions
 */

import {
  siteCacheDir,
  siteConfigDir,
  siteDataDir,
  siteRuntimeDir,
  userCacheDir,
  userConfigDir,
  userDataDir,
  userDesktopDir,
  userDocumentsDir,
  userDownloadsDir,
  userLogDir,
  userMusicDir,
  userPicturesDir,
  userRuntimeDir,
  userStateDir,
  userVideosDir,
} from "../src/mod.ts";
import { platform } from "node:os";

const DEFAULT_OPTIONS = {
  appName: "MyApp",
  appAuthor: "MyCompany",
};

function printFunction(name: string, fn: () => string | string[]) {
  const result = fn();
  console.log(`${name}:`);
  console.log(Array.isArray(result) ? result.join(", ") : result);
}

function main() {
  console.log(`Platform: ${platform()}`);
  console.log("Options:");
  console.log(DEFAULT_OPTIONS, "\n");

  printFunction("userDataDir", () => userDataDir(DEFAULT_OPTIONS));
  printFunction(
    "userDataDir(roaming)",
    () => userDataDir({ ...DEFAULT_OPTIONS, roaming: true }),
  );
  printFunction("userConfigDir", () => userConfigDir(DEFAULT_OPTIONS));
  printFunction("userCacheDir", () => userCacheDir(DEFAULT_OPTIONS));
  printFunction("userLogDir", () => userLogDir(DEFAULT_OPTIONS));
  printFunction("userStateDir", () => userStateDir(DEFAULT_OPTIONS));
  printFunction("userRuntimeDir", () => userRuntimeDir(DEFAULT_OPTIONS));
  printFunction("siteDataDir", () => siteDataDir(DEFAULT_OPTIONS));
  printFunction(
    "siteDataDir(multipath)",
    () => siteDataDir({ ...DEFAULT_OPTIONS, multipath: true }),
  );
  printFunction("siteConfigDir", () => siteConfigDir(DEFAULT_OPTIONS));
  printFunction(
    "siteConfigDir(multipath)",
    () => siteConfigDir({ ...DEFAULT_OPTIONS, multipath: true }),
  );
  printFunction("siteCacheDir", () => siteCacheDir(DEFAULT_OPTIONS));
  printFunction("siteRuntimeDir", () => siteRuntimeDir(DEFAULT_OPTIONS));
  printFunction("userDocumentsDir", () => userDocumentsDir());
  printFunction("userDownloadsDir", () => userDownloadsDir());
  printFunction("userPicturesDir", () => userPicturesDir());
  printFunction("userVideosDir", () => userVideosDir());
  printFunction("userMusicDir", () => userMusicDir());
  printFunction("userDesktopDir", () => userDesktopDir());
}

if (import.meta.main) {
  main();
}
