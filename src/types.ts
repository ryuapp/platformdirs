/**
 * Base directory options
 */
export interface DirectoryOptions {
  /** Name of the application */
  appName?: string;
  /** Author/company name of the application */
  appAuthor?: string;
  /** Version of the application */
  version?: string;
  /** Whether to create the directory if it doesn't exist */
  ensureExists?: boolean;
}

/**
 * Options for user directories with platform-specific features
 */
export interface UserDirectoryOptions extends DirectoryOptions {
  /** Whether to use roaming profile on Windows */
  roaming?: boolean;
}

/**
 * Options for directories with multipath support
 */
export interface MultipathDirectoryOptions extends DirectoryOptions {
  /** Whether to return all possible paths instead of just the first one */
  multipath?: boolean;
}
