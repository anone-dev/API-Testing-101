#!/usr/bin/env node
/**
 * Mobile Test Runner
 * Usage: node run.js <os> <env> <mode> [suite]
 *   os    : android | ios
 *   env   : local | sit | uat
 *   mode  : headful | headless
 *   suite : all | auth | books | orders | smoke | regression  (default: all)
 */

const { execSync } = require("child_process");

const [os, env, mode, suite = "all"] = process.argv.slice(2);

if (!os || !env || !mode) {
  console.error("Usage: node run.js <android|ios> <local|sit|uat> <headful|headless> [suite]");
  process.exit(1);
}

// Map os+env → variablefile
const varfileMap = {
  "android:local": "fixtures/testdata.local.android.yaml",
  "android:sit":   "fixtures/testdata.sit.android.yaml",
  "ios:local":     "fixtures/testdata.local.ios.yaml",
  "ios:sit":       "fixtures/testdata.sit.ios.yaml",
};

const varfile = varfileMap[`${os}:${env}`];
if (!varfile) {
  console.error(`Unsupported combination: os=${os}, env=${env}`);
  process.exit(1);
}

// Map suite → test path
const suiteMap = {
  all:        "tests-mobile/",
  auth:       "tests-mobile/auth/",
  books:      "tests-mobile/books/",
  orders:     "tests-mobile/orders/",
  smoke:      "tests-mobile/tagged_tests/smoke.robot",
  regression: "tests-mobile/tagged_tests/regression.robot",
};

const testPath = suiteMap[suite];
if (!testPath) {
  console.error(`Unknown suite: ${suite}. Valid: ${Object.keys(suiteMap).join(", ")}`);
  process.exit(1);
}

// headless: set env var so caps yaml can pick up HEADLESS=true
// Android emulator headless = -no-window flag (handled in caps or conftest)
const env_vars = mode === "headless" ? "HEADLESS=true " : "";

const cmd = `${env_vars}robot --variablefile ${varfile} --outputdir results/${os}-${env} ${testPath}`;

console.log(`▶ Running: ${cmd}\n`);
try {
  execSync(cmd, { stdio: "inherit", shell: true });
} catch (e) {
  process.exit(e.status ?? 1);
}
