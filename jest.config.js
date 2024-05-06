// import type { Config } from "jest";
/** @type {import('jest').Config} */
const config = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

export default config;
