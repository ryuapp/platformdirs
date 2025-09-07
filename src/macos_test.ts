import { assertEquals } from "@std/assert";
import { platform } from "node:os";
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
} from "./mod.ts";

// Only run tests on macOS
if (platform() === "darwin") {
  Deno.test("macOS: userDataDir uses ~/Library/Application Support", () => {
    const path = userDataDir();
    assertEquals(path.endsWith("/Library/Application Support"), true);
  });

  Deno.test("macOS: userDataDir with appName", () => {
    const path = userDataDir({ appName: "TestApp" });
    assertEquals(path.endsWith("/Library/Application Support/TestApp"), true);
  });

  Deno.test("macOS: userDataDir ignores appAuthor parameter", () => {
    const pathWithAuthor = userDataDir({
      appName: "TestApp",
      appAuthor: "TestCompany",
    });
    const pathWithoutAuthor = userDataDir({ appName: "TestApp" });

    // macOS implementation should ignore appAuthor
    assertEquals(pathWithAuthor, pathWithoutAuthor);

    // Should not contain company name
    assertEquals(pathWithAuthor.includes("TestCompany"), false);
  });

  Deno.test("macOS: userConfigDir uses ~/Library/Application Support", () => {
    const path = userConfigDir({ appName: "TestApp" });
    assertEquals(path.endsWith("/Library/Application Support/TestApp"), true);
  });

  Deno.test("macOS: userCacheDir uses ~/Library/Caches", () => {
    const path = userCacheDir({ appName: "TestApp" });
    assertEquals(path.endsWith("/Library/Caches/TestApp"), true);
  });

  Deno.test("macOS: userLogDir uses ~/Library/Logs", () => {
    const path = userLogDir({ appName: "TestApp" });
    assertEquals(path.endsWith("/Library/Logs/TestApp"), true);
  });

  Deno.test("macOS: siteDataDir uses /Library/Application Support", () => {
    const path = siteDataDir({ appName: "TestApp" });
    assertEquals(path, "/Library/Application Support/TestApp");
  });

  Deno.test("macOS: siteConfigDir uses /Library/Application Support", () => {
    const path = siteConfigDir({ appName: "TestApp" });
    assertEquals(path, "/Library/Application Support/TestApp");
  });

  Deno.test("macOS: siteCacheDir uses /Library/Caches", () => {
    const path = siteCacheDir({ appName: "TestApp" });
    assertEquals(path, "/Library/Caches/TestApp");
  });

  Deno.test("macOS: version parameter creates subfolder", () => {
    const path = userDataDir({ appName: "TestApp", version: "1.0.0" });
    assertEquals(
      path.endsWith("/Library/Application Support/TestApp/1.0.0"),
      true,
    );
  });

  Deno.test("macOS: roaming parameter is ignored", () => {
    const roamingPath = userDataDir({ appName: "TestApp", roaming: true });
    const nonRoamingPath = userDataDir({ appName: "TestApp", roaming: false });
    const defaultPath = userDataDir({ appName: "TestApp" });

    // All should be the same on macOS
    assertEquals(roamingPath, nonRoamingPath);
    assertEquals(roamingPath, defaultPath);
  });

  Deno.test("macOS: user directories follow expected patterns", () => {
    const dataPath = userDataDir({ appName: "TestApp" });
    const configPath = userConfigDir({ appName: "TestApp" });
    const cachePath = userCacheDir({ appName: "TestApp" });
    const logPath = userLogDir({ appName: "TestApp" });

    assertEquals(
      dataPath.endsWith("/Library/Application Support/TestApp"),
      true,
    );
    assertEquals(
      configPath.endsWith("/Library/Application Support/TestApp"),
      true,
    );
    assertEquals(cachePath.endsWith("/Library/Caches/TestApp"), true);
    assertEquals(logPath.endsWith("/Library/Logs/TestApp"), true);
  });

  Deno.test("macOS: site directories are system-wide", () => {
    const siteData = siteDataDir({ appName: "TestApp" });
    const siteConfig = siteConfigDir({ appName: "TestApp" });
    const siteCache = siteCacheDir({ appName: "TestApp" });

    // Should follow system-wide Library paths
    assertEquals(siteData, "/Library/Application Support/TestApp");
    assertEquals(siteConfig, "/Library/Application Support/TestApp");
    assertEquals(siteCache, "/Library/Caches/TestApp");
  });

  Deno.test("macOS: directory names follow Apple conventions", () => {
    const dataPath = userDataDir({ appName: "TestApp" });
    const configPath = userConfigDir({ appName: "TestApp" });
    const cachePath = userCacheDir({ appName: "TestApp" });
    const logPath = userLogDir({ appName: "TestApp" });

    // Check for proper Apple directory names
    assertEquals(
      dataPath.endsWith("/Library/Application Support/TestApp"),
      true,
    );
    assertEquals(
      configPath.endsWith("/Library/Application Support/TestApp"),
      true,
    );
    assertEquals(cachePath.endsWith("/Library/Caches/TestApp"), true);
    assertEquals(logPath.endsWith("/Library/Logs/TestApp"), true);
  });

  Deno.test("macOS: userDocumentsDir returns ~/Documents", () => {
    const path = userDocumentsDir();
    assertEquals(path.endsWith("/Documents"), true);
  });

  Deno.test("macOS: userDownloadsDir returns ~/Downloads", () => {
    const path = userDownloadsDir();
    assertEquals(path.endsWith("/Downloads"), true);
  });

  Deno.test("macOS: userPicturesDir returns ~/Pictures", () => {
    const path = userPicturesDir();
    assertEquals(path.endsWith("/Pictures"), true);
  });

  Deno.test("macOS: userVideosDir returns ~/Movies", () => {
    const path = userVideosDir();
    assertEquals(path.endsWith("/Movies"), true);
  });

  Deno.test("macOS: userMusicDir returns ~/Music", () => {
    const path = userMusicDir();
    assertEquals(path.endsWith("/Music"), true);
  });

  Deno.test("macOS: userDesktopDir returns ~/Desktop", () => {
    const path = userDesktopDir();
    assertEquals(path.endsWith("/Desktop"), true);
  });

  Deno.test("macOS: userRuntimeDir uses ~/Library/Caches/TemporaryItems", () => {
    const path = userRuntimeDir({ appName: "TestApp" });
    assertEquals(path.endsWith("/Library/Caches/TemporaryItems/TestApp"), true);
  });

  Deno.test("macOS: siteRuntimeDir uses same as userRuntimeDir", () => {
    const path = siteRuntimeDir({ appName: "TestApp" });
    assertEquals(path.endsWith("/Library/Caches/TemporaryItems/TestApp"), true);
  });

  Deno.test("macOS: userStateDir same as userDataDir", () => {
    const statePath = userStateDir({ appName: "TestApp" });
    const dataPath = userDataDir({ appName: "TestApp" });
    assertEquals(statePath, dataPath);
  });
}
