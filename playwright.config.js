import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

const hasBuiltApp = fs.existsSync("./.next/BUILD_ID");
const msPlaywrightDir = path.join(os.homedir(), "AppData", "Local", "ms-playwright");
const edgeExe = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const useMsEdgeChannel =
  process.platform === "win32" &&
  !fs.existsSync(msPlaywrightDir) &&
  fs.existsSync(edgeExe);

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:8081",
    trace: "on-first-retry",
  },
  webServer: {
    command: hasBuiltApp
      ? "npm run start -- --hostname 127.0.0.1 --port 8081"
      : "npm run dev -- --hostname 127.0.0.1 --port 8081",
    url: "http://127.0.0.1:8081",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...(useMsEdgeChannel ? { channel: "msedge" } : {}),
      },
    },
  ],
});
