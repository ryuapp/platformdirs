import { assertEquals } from "@std/assert";
import { platform } from "node:os";
import { appendAppNameAndVersion, expandUser } from "./path.ts";

Deno.test("expandUser: handles home directory shortcut", () => {
  const path = expandUser("~/Documents");
  if (platform() === "win32") {
    assertEquals(path.endsWith("\\Documents"), true);
  } else {
    assertEquals(path.endsWith("/Documents"), true);
  }
  assertEquals(path.includes("~"), false);
});

Deno.test("expandUser: handles root home directory", () => {
  const path = expandUser("~");
  assertEquals(path.includes("~"), false);
  assertEquals(path.length > 1, true);
});

Deno.test("expandUser: leaves absolute paths unchanged", () => {
  const absolutePath = "/absolute/path";
  const result = expandUser(absolutePath);
  assertEquals(result, absolutePath);
});

Deno.test("expandUser: leaves relative paths unchanged", () => {
  const relativePath = "relative/path";
  const result = expandUser(relativePath);
  assertEquals(result, relativePath);
});

Deno.test("expandUser: handles paths with ~ in middle (not expanded)", () => {
  const path = "/some/path/~/file";
  const result = expandUser(path);
  assertEquals(result, path);
});

Deno.test("expandUser: handles mixed path separators", () => {
  const path = expandUser("~/Documents\\file.txt");
  if (platform() === "win32") {
    assertEquals(path.endsWith("\\Documents\\file.txt"), true);
  } else {
    assertEquals(path.endsWith("/Documents\\file.txt"), true);
  }
  assertEquals(path.includes("~"), false);
});

// appendAppNameAndVersion tests

Deno.test("appendAppNameAndVersion: with no options", () => {
  const basePath = platform() === "win32" ? "\\base\\path" : "/base/path";
  const result = appendAppNameAndVersion(basePath, {});
  assertEquals(result, basePath);
});

Deno.test("appendAppNameAndVersion: with appName only", () => {
  const basePath = platform() === "win32" ? "\\base\\path" : "/base/path";
  const result = appendAppNameAndVersion(basePath, { appName: "MyApp" });
  if (platform() === "win32") {
    assertEquals(result, "\\base\\path\\MyApp");
  } else {
    assertEquals(result, "/base/path/MyApp");
  }
});

Deno.test("appendAppNameAndVersion: with appName and version", () => {
  const basePath = platform() === "win32" ? "\\base\\path" : "/base/path";
  const result = appendAppNameAndVersion(basePath, {
    appName: "MyApp",
    version: "1.0.0",
  });
  if (platform() === "win32") {
    assertEquals(result, "\\base\\path\\MyApp\\1.0.0");
  } else {
    assertEquals(result, "/base/path/MyApp/1.0.0");
  }
});

Deno.test("appendAppNameAndVersion: with opinionValue", () => {
  const basePath = platform() === "win32" ? "\\base\\path" : "/base/path";
  const result = appendAppNameAndVersion(basePath, {
    appName: "MyApp",
    opinionValue: "Cache",
  });
  if (platform() === "win32") {
    assertEquals(result, "\\base\\path\\MyApp\\Cache");
  } else {
    assertEquals(result, "/base/path/MyApp/Cache");
  }
});

Deno.test("appendAppNameAndVersion: with appName, opinionValue, and version", () => {
  const basePath = platform() === "win32" ? "\\base\\path" : "/base/path";
  const result = appendAppNameAndVersion(basePath, {
    appName: "MyApp",
    opinionValue: "Cache",
    version: "1.0.0",
  });
  if (platform() === "win32") {
    assertEquals(result, "\\base\\path\\MyApp\\Cache\\1.0.0");
  } else {
    assertEquals(result, "/base/path/MyApp/Cache/1.0.0");
  }
});

Deno.test("appendAppNameAndVersion: with appAuthor", () => {
  const basePath = platform() === "win32" ? "\\base\\path" : "/base/path";
  const result = appendAppNameAndVersion(basePath, {
    appName: "MyApp",
    appAuthor: "MyCompany",
  });

  if (platform() === "win32") {
    // On Windows, appAuthor comes before appName
    assertEquals(result, "\\base\\path\\MyCompany\\MyApp");
  } else {
    // On non-Windows platforms, appAuthor should be ignored
    assertEquals(result, "/base/path/MyApp");
  }
});

Deno.test("appendAppNameAndVersion: with appAuthor and version", () => {
  const basePath = platform() === "win32" ? "\\base\\path" : "/base/path";
  const result = appendAppNameAndVersion(basePath, {
    appName: "MyApp",
    appAuthor: "MyCompany",
    version: "1.0.0",
  });

  if (platform() === "win32") {
    // On Windows, appAuthor comes before appName, then version
    assertEquals(result, "\\base\\path\\MyCompany\\MyApp\\1.0.0");
  } else {
    // On non-Windows platforms, appAuthor is ignored
    assertEquals(result, "/base/path/MyApp/1.0.0");
  }
});
