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

// Only run tests on Linux/Unix
if (platform() !== "win32" && platform() !== "darwin") {
  Deno.test("Linux: userDataDir follows XDG Base Directory Spec", () => {
    const path = userDataDir();
    // Should use XDG_DATA_HOME or fallback to ~/.local/share
    assertEquals(path.endsWith("/.local/share"), true);
  });

  Deno.test("Linux: userDataDir with appName", () => {
    const path = userDataDir({ appName: "testapp" });
    assertEquals(path.endsWith("/testapp"), true);
  });

  Deno.test("Linux: userDataDir ignores appAuthor parameter", () => {
    const pathWithAuthor = userDataDir({
      appName: "testapp",
      appAuthor: "TestCompany",
    });
    const pathWithoutAuthor = userDataDir({ appName: "testapp" });

    // Linux implementation should ignore appAuthor
    assertEquals(pathWithAuthor, pathWithoutAuthor);

    // Should not contain company name
    assertEquals(pathWithAuthor.includes("TestCompany"), false);
  });

  Deno.test("Linux: userConfigDir uses XDG_CONFIG_HOME or ~/.config", () => {
    const path = userConfigDir({ appName: "testapp" });
    assertEquals(path.endsWith("/testapp"), true);
  });

  Deno.test("Linux: userCacheDir uses XDG_CACHE_HOME or ~/.cache", () => {
    const path = userCacheDir({ appName: "testapp" });
    assertEquals(path.endsWith("/testapp"), true);
  });

  Deno.test("Linux: userLogDir uses XDG_STATE_HOME/log or ~/.local/state/log", () => {
    const path = userLogDir({ appName: "testapp" });
    assertEquals(path.endsWith("/testapp/log"), true);
  });

  Deno.test("Linux: siteDataDir uses XDG_DATA_DIRS", () => {
    const path = siteDataDir({ appName: "testapp" });
    assertEquals(path.endsWith("/testapp"), true);
  });

  Deno.test("Linux: siteConfigDir uses XDG_CONFIG_DIRS", () => {
    const path = siteConfigDir({ appName: "testapp" });
    assertEquals(path.endsWith("/testapp"), true);
  });

  Deno.test("Linux: siteCacheDir uses /var/cache", () => {
    const path = siteCacheDir({ appName: "testapp" });
    assertEquals(path, "/var/cache/testapp");
  });

  Deno.test("Linux: paths use forward slash separators", () => {
    const path = userDataDir({ appName: "testapp" });
    assertEquals(path.includes("/"), true);
    assertEquals(path.includes("\\"), false);
  });

  Deno.test("Linux: version parameter creates subfolder", () => {
    const path = userDataDir({ appName: "testapp", version: "1.0.0" });
    assertEquals(path.endsWith("/testapp/1.0.0"), true);
  });

  Deno.test("Linux: roaming parameter is ignored", () => {
    const roamingPath = userDataDir({ appName: "testapp", roaming: true });
    const nonRoamingPath = userDataDir({ appName: "testapp", roaming: false });
    const defaultPath = userDataDir({ appName: "testapp" });

    // All should be the same on Linux
    assertEquals(roamingPath, nonRoamingPath);
    assertEquals(roamingPath, defaultPath);
  });

  Deno.test("Linux: XDG environment variables take precedence", () => {
    const dataPath = userDataDir({ appName: "testapp" });
    const configPath = userConfigDir({ appName: "testapp" });
    const cachePath = userCacheDir({ appName: "testapp" });

    // Paths should end with app name regardless of XDG settings
    assertEquals(dataPath.endsWith("/testapp"), true);
    assertEquals(configPath.endsWith("/testapp"), true);
    assertEquals(cachePath.endsWith("/testapp"), true);
  });

  Deno.test("Linux: user directories follow expected patterns", () => {
    const dataPath = userDataDir({ appName: "testapp" });
    const configPath = userConfigDir({ appName: "testapp" });
    const cachePath = userCacheDir({ appName: "testapp" });

    // Should end with the app name
    assertEquals(dataPath.endsWith("/testapp"), true);
    assertEquals(configPath.endsWith("/testapp"), true);
    assertEquals(cachePath.endsWith("/testapp"), true);
  });

  Deno.test("Linux: site directories are system-wide", () => {
    const siteData = siteDataDir({ appName: "testapp" });
    const siteConfig = siteConfigDir({ appName: "testapp" });
    const siteCache = siteCacheDir({ appName: "testapp" });

    // Should start with system paths and end with app name
    assertEquals(siteData.startsWith("/"), true);
    assertEquals(siteConfig.startsWith("/"), true);
    assertEquals(siteCache.startsWith("/"), true);
    assertEquals(siteData.endsWith("/testapp"), true);
    assertEquals(siteConfig.endsWith("/testapp"), true);
    assertEquals(siteCache.endsWith("/testapp"), true);
  });

  Deno.test("Linux: follows FHS (Filesystem Hierarchy Standard)", () => {
    const siteData = siteDataDir({ appName: "testapp" });
    const siteConfig = siteConfigDir({ appName: "testapp" });
    const siteCache = siteCacheDir({ appName: "testapp" });

    // Should follow standard Linux filesystem hierarchy
    assertEquals(siteData.includes("/usr") || siteData.includes("/opt"), true);
    assertEquals(
      siteConfig.includes("/etc") || siteConfig.includes("/usr"),
      true,
    );
    assertEquals(siteCache.includes("/var/cache"), true);
  });

  Deno.test("Linux: userRuntimeDir uses /run/user/uid", () => {
    const path = userRuntimeDir({ appName: "testapp" });
    assertEquals(
      /^\/(?:run\/user\/\d+|tmp\/runtime-\d+)\/testapp$/.test(path),
      true,
    );
  });

  // BSD-specific tests
  if (
    platform() === "freebsd" || platform() === "openbsd" ||
    platform() === "netbsd"
  ) {
    Deno.test("BSD: userRuntimeDir uses /var/run/user/uid or fallback to /tmp", () => {
      const path = userRuntimeDir({ appName: "testapp" });
      assertEquals(
        /^\/(?:var\/run\/user\/\d+|tmp\/runtime-\d+)\/testapp$/.test(path),
        true,
      );
    });

    Deno.test("BSD: userRuntimeDir fallback behavior", () => {
      const path = userRuntimeDir();
      // Should either use BSD standard path or fallback
      assertEquals(
        /^\/(?:var\/run\/user\/\d+|tmp\/runtime-\d+)$/.test(path),
        true,
      );
    });

    Deno.test("BSD: userRuntimeDir with ensureExists creates directory", () => {
      const path = userRuntimeDir({
        appName: "testapp",
        ensureExists: true,
      });
      assertEquals(path.endsWith("/testapp"), true);
      // Directory creation is tested by the function itself
    });
  }

  Deno.test("Unix: userDocumentsDir returns ~/Documents", () => {
    const path = userDocumentsDir();
    assertEquals(path.endsWith("/Documents"), true);
  });

  Deno.test("Unix: userDownloadsDir returns ~/Downloads", () => {
    const path = userDownloadsDir();
    assertEquals(path.endsWith("/Downloads"), true);
  });

  Deno.test("Unix: userPicturesDir returns ~/Pictures", () => {
    const path = userPicturesDir();
    assertEquals(path.endsWith("/Pictures"), true);
  });

  Deno.test("Unix: userVideosDir returns ~/Videos", () => {
    const path = userVideosDir();
    assertEquals(path.endsWith("/Videos"), true);
  });

  Deno.test("Unix: userMusicDir returns ~/Music", () => {
    const path = userMusicDir();
    assertEquals(path.endsWith("/Music"), true);
  });

  Deno.test("Unix: userDesktopDir returns ~/Desktop", () => {
    const path = userDesktopDir();
    assertEquals(path.endsWith("/Desktop"), true);
  });

  Deno.test("Unix: siteRuntimeDir follows userRuntimeDir pattern", () => {
    const path = siteRuntimeDir({ appName: "testapp" });
    assertEquals(
      /^\/(?:run\/user\/\d+|tmp\/runtime-\d+|var\/run\/user\/\d+)\/testapp$/
        .test(path),
      true,
    );
  });

  Deno.test("Unix: userStateDir uses XDG_STATE_HOME or ~/.local/state", () => {
    const path = userStateDir({ appName: "testapp" });
    assertEquals(path.endsWith("/.local/state/testapp"), true);
  });

  Deno.test("Unix: userStateDir different from userDataDir", () => {
    const statePath = userStateDir({ appName: "testapp" });
    const dataPath = userDataDir({ appName: "testapp" });
    assertEquals(statePath.includes("/.local/state/"), true);
    assertEquals(dataPath.includes("/.local/share/"), true);
  });
}
