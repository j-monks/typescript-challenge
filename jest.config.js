const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },

  rootDir: ".",

  testMatch: ["<rootDir>/src/**/*.test.ts"],

  transform: {
    ...tsjPreset.transform,
  },
};
