# @ryu/platformdirs

A TypeScript library for determining appropriate platform-specific directories for application data, config, cache, logs, and more. This is a TypeScript fork of Python's [platformdirs](https://github.com/platformdirs/platformdirs) library. However, they are not fully compatible.

## Features

- Cross-platform support (Windows, macOS, Linux/Unix)
- Zero dependencies for core functionality
- Follows platform conventions and standards:
  - Windows: Uses `AppData` directories
  - macOS: Uses `Library` directories
  - Linux/Unix: Follows XDG Base Directory Specification

## Installation

```sh
deno add jsr:@ryu/platformdirs  # for Deno
vlt  add jsr:@ryu/platformdirs  # for vlt
npm  jsr add @ryu/platformdirs  # for npm
pnpm add jsr:@ryu/platformdirs  # for pnpm
yarn add jsr:@ryu/platformdirs  # for Yarn
```

## Usage

### Basic Examples

```typescript
import { userCacheDir, userConfigDir, userDataDir } from "@ryu/platformdirs";

// Get user data directory
const dataDir = userDataDir({ appName: "MyApp" });
console.log(dataDir);
// Windows: C:\Users\Username\AppData\Local\MyApp
// macOS:   /Users/Username/Library/Application Support/MyApp
// Linux:   /home/username/.local/share/MyApp

// Get user config directory
const configDir = userConfigDir({ appName: "MyApp" });
console.log(configDir);
// Windows: C:\Users\Username\AppData\Local\MyApp
// macOS:   /Users/Username/Library/Preferences/MyApp
// Linux:   /home/username/.config/MyApp

// Get user cache directory
const cacheDir = userCacheDir({ appName: "MyApp" });
console.log(cacheDir);
// Windows: C:\Users\Username\AppData\Local\cache\MyApp
// macOS:   /Users/Username/Library/Caches/MyApp
// Linux:   /home/username/.cache/MyApp
```

### Advanced Options

```typescript
import { siteDataDir, userDataDir } from "@ryu/platformdirs";

// With app author (Windows only)
const dataDir = userDataDir({
  appName: "MyApp",
  appAuthor: "MyCompany",
});
// Windows: C:\Users\Username\AppData\Local\MyCompany\MyApp
// macOS:   /Users/Username/Library/Application Support/MyApp
// Linux:   /home/username/.local/share/MyApp

// With version
const versionedDir = userDataDir({
  appName: "MyApp",
  version: "1.0.0",
});

// Create directory if it doesn't exist
const dataDir = userDataDir({
  appName: "MyApp",
  ensureExists: true,
});

// Use roaming profile on Windows
const roamingDir = userDataDir({
  appName: "MyApp",
  roaming: true,
});
// Windows: C:\Users\Username\AppData\Roaming\MyApp
// macOS:   /Users/Username/Library/Application Support/MyApp
// Linux:   /home/username/.local/share/MyApp

// Site-wide directories (system-wide installation)
const siteDir = siteDataDir({ appName: "MyApp" });
// Windows: C:\ProgramData\MyApp
// macOS:   /Library/Application Support/MyApp
// Linux:   /usr/local/share/MyApp
```

## API Reference

### Application Directories

- `userDataDir(options?: UserDirectoryOptions)` - User-specific data files
- `userConfigDir(options?: DirectoryOptions)` - User-specific configuration
- `userCacheDir(options?: DirectoryOptions)` - User-specific cache files
- `userLogDir(options?: DirectoryOptions)` - User-specific log files
- `userRuntimeDir(options?: DirectoryOptions)` - User-specific runtime files
- `siteDataDir(options?: MultipathDirectoryOptions)` - Site-wide data files
- `siteConfigDir(options?: MultipathDirectoryOptions)` - Site-wide configuration
- `siteCacheDir(options?: DirectoryOptions)` - Site-wide cache files
- `siteRuntimeDir(options?: DirectoryOptions)` - Site-wide runtime files

### User Directories

- `userDocumentsDir()` - User's documents directory
- `userDownloadsDir()` - User's downloads directory
- `userPicturesDir()` - User's pictures directory
- `userVideosDir()` - User's videos directory
- `userMusicDir()` - User's music directory
- `userDesktopDir()` - User's desktop directory

### Options

```ts
interface DirectoryOptions {
  /** Name of the application */
  appName?: string;
  /** Author/company name of the application (Windows only) */
  appAuthor?: string;
  /** Version of the application */
  version?: string;
  /** Whether to create the directory if it doesn't exist */
  ensureExists?: boolean;
}

interface UserDirectoryOptions extends DirectoryOptions {
  /** Whether to use roaming profile (Windows only) */
  roaming?: boolean;
}

interface MultipathDirectoryOptions extends DirectoryOptions {
  /** Whether to return all possible paths instead of just the first one */
  multipath?: boolean;
}
```
