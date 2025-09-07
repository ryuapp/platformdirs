import { assertEquals } from "@std/assert";
import { platform } from "node:os";
import {
  siteCacheDir,
  siteDataDir,
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

// Only run tests on Windows
if (platform() === "win32") {
  Deno.test("Windows: userDataDir returns AppData Local path", () => {
    const path = userDataDir();
    assertEquals(path.endsWith("\\AppData\\Local"), true);
  });

  Deno.test("Windows: userDataDir with roaming=true uses Roaming", () => {
    const roamingPath = userDataDir({ roaming: true });
    assertEquals(roamingPath.endsWith("\\AppData\\Roaming"), true);
  });

  Deno.test("Windows: userDataDir with roaming=false uses Local", () => {
    const localPath = userDataDir({ roaming: false });
    assertEquals(localPath.endsWith("\\AppData\\Local"), true);
  });

  Deno.test("Windows: userDataDir with appName and appAuthor", () => {
    const path = userDataDir({ appName: "TestApp", appAuthor: "TestCompany" });
    assertEquals(path.endsWith("\\AppData\\Local\\TestCompany\\TestApp"), true);
  });

  Deno.test("Windows: userConfigDir same as userDataDir by default", () => {
    const dataPath = userDataDir({ appName: "TestApp" });
    const configPath = userConfigDir({ appName: "TestApp" });
    assertEquals(dataPath, configPath);
  });

  Deno.test("Windows: userCacheDir includes cache subfolder", () => {
    const path = userCacheDir({ appName: "TestApp" });
    assertEquals(path.endsWith("\\AppData\\Local\\TestApp\\Cache"), true);
  });

  Deno.test("Windows: userLogDir includes logs subfolder", () => {
    const path = userLogDir({ appName: "TestApp" });
    assertEquals(path.endsWith("\\AppData\\Local\\TestApp\\Logs"), true);
  });

  Deno.test("Windows: siteDataDir uses ProgramData", () => {
    const path = siteDataDir({ appName: "TestApp" });
    assertEquals(path.endsWith("\\ProgramData\\TestApp"), true);
  });

  Deno.test("Windows: siteCacheDir uses ProgramData with cache", () => {
    const path = siteCacheDir({ appName: "TestApp" });
    assertEquals(path.endsWith("\\ProgramData\\TestApp\\Cache"), true);
  });

  Deno.test("Windows: version parameter creates subfolder", () => {
    const path = userDataDir({ appName: "TestApp", version: "1.0.0" });
    assertEquals(path.endsWith("\\AppData\\Local\\TestApp\\1.0.0"), true);
  });

  Deno.test("Windows: LOCALAPPDATA environment variable respected", () => {
    const path = userDataDir({ appName: "TestApp" });
    assertEquals(path.endsWith("\\AppData\\Local\\TestApp"), true);
  });

  Deno.test("Windows: APPDATA environment variable respected for roaming", () => {
    const path = userDataDir({ appName: "TestApp", roaming: true });
    assertEquals(path.endsWith("\\AppData\\Roaming\\TestApp"), true);
  });

  Deno.test("Windows: PROGRAMDATA environment variable respected for site dirs", () => {
    const path = siteDataDir({ appName: "TestApp" });
    assertEquals(path.endsWith("\\ProgramData\\TestApp"), true);
  });

  Deno.test("Windows: userDocumentsDir returns Documents folder", () => {
    const path = userDocumentsDir();
    assertEquals(path.endsWith("\\Documents"), true);
  });

  Deno.test("Windows: userDownloadsDir returns Downloads folder", () => {
    const path = userDownloadsDir();
    assertEquals(path.endsWith("\\Downloads"), true);
  });

  Deno.test("Windows: userPicturesDir returns Pictures folder", () => {
    const path = userPicturesDir();
    assertEquals(path.endsWith("\\Pictures"), true);
  });

  Deno.test("Windows: userVideosDir returns Videos folder", () => {
    const path = userVideosDir();
    assertEquals(path.endsWith("\\Videos"), true);
  });

  Deno.test("Windows: userMusicDir returns Music folder", () => {
    const path = userMusicDir();
    assertEquals(path.endsWith("\\Music"), true);
  });

  Deno.test("Windows: userDesktopDir returns Desktop folder", () => {
    const path = userDesktopDir();
    assertEquals(path.endsWith("\\Desktop"), true);
  });

  Deno.test("Windows: userRuntimeDir uses AppData Local Temp", () => {
    const path = userRuntimeDir({ appName: "TestApp" });
    assertEquals(path.endsWith("\\AppData\\Local\\Temp\\TestApp"), true);
  });

  Deno.test("Windows: userStateDir same as userDataDir", () => {
    const statePath = userStateDir({ appName: "TestApp" });
    const dataPath = userDataDir({ appName: "TestApp" });
    assertEquals(statePath, dataPath);
  });
}
