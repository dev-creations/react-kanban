module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/index.ts"],
  coverageDirectory: "coverage",
  testMatch: ["<rootDir>/src/**/*.spec.{ts,tsx}"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testRunner: "jest-circus/runner",
  moduleNameMapper: {
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "\\.s?css$": "identity-obj-proxy",
  },
};
