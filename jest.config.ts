import type { Config } from "jest";

const config: Config = {
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },

  preset: "ts-jest",
  verbose: true,
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", "src"],
  setupFiles: ["<rootDir>/setupTests.ts"],

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "@src/(.*)": "<rootDir>/src/$1",
    "@redux/(.*)": "<rootDir>/src/redux/$1",
  },
};

export default config;
