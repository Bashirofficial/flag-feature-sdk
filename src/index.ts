// src/index.ts
/**
 * Feature Flags SDK - Main Client
 * Official JavaScript/TypeScript SDK
 */

export interface FeatureFlagConfig {
  apiKey: string;
  baseUrl?: string;
  defaultTimeout?: number;
}

export class FeatureFlagClient {
  private apiKey: string;
  private baseUrl: string;
  private defaultTimeout: number;

  constructor(config: FeatureFlagConfig) {
    if (!config.apiKey) {
      throw new Error("API key is required");
    }

    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl as string;
    this.defaultTimeout = config.defaultTimeout || 5000; // 5 seconds
  }

  /**
   * Get a single flag value by key
   */
  async getFlag(key: string): Promise<any> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        this.defaultTimeout,
      );

      const response = await fetch(`${this.baseUrl}/flags/${key}`, {
        headers: {
          "x-api-key": this.apiKey,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      const value = result?.data?.value;
      return value;
    } catch (error) {
      console.error(`Error fetching flag ${key}:`, error);
      throw error;
    }
  }

  /**
   * Check if a boolean flag is enabled
   */
  async isFlagEnabled(
    key: string,
    defaultValue: boolean = false,
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/flags/${key}/enabled`, {
        headers: { "x-api-key": this.apiKey },
      });
      const result = await response.json();
      return result?.data?.enabled ?? defaultValue;
    } catch {
      return defaultValue;
    }
  }

  /**
   * Get a string flag
   */
  async getString(key: string, defaultValue: string = ""): Promise<string> {
    try {
      const value = await this.getFlag(key);
      return typeof value === "string" ? value : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  /**
   * Get a number flag
   */
  async getNumber(key: string, defaultValue: number = 0): Promise<number> {
    try {
      const value = await this.getFlag(key);
      return typeof value === "number" ? value : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  /**
   * Get a JSON flag
   */
  async getJSON<T = any>(key: string, defaultValue: T): Promise<T> {
    try {
      const value = await this.getFlag(key);
      return value !== null && value !== undefined ? value : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  /**
   * Get all flags
   */
  async getAllFlags(): Promise<Record<string, any>> {
    try {
      const response = await fetch(`${this.baseUrl}/flags`, {
        headers: {
          "x-api-key": this.apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const result = await response.json();
      return result?.data?.flags ?? {};
    } catch (error) {
      console.error("Error fetching all flags:", error);
      return {};
    }
  }

  /**
   * Get flag in bulk
   */

  async getBulkFlags(keys: string[]): Promise<Record<string, any>> {
    try {
      const response = await fetch(`${this.baseUrl}/flags/bulk`, {
        method: "POST",
        headers: {
          "x-api-key": this.apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keys }),
      });
      const result = await response.json();
      return result?.data?.flags ?? {};
    } catch (error) {
      console.error("Error fetching flags in bulk:", error);
      return {};
    }
  }
}
